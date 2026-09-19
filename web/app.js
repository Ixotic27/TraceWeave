let state = {events: [], counts: {}, contracts: [], audit: []};
let filter = 'all';
let selected = null;
const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const labels = {normalized:'Normalized', drift:'Schema drift', needs_mapping:'New source', quarantined:'Quarantined'};

function notify(message, error = false) {
  $('#notice').textContent = message;
  $('#notice').className = error ? 'notice error' : 'notice';
  $('#notice').hidden = false;
}
let isStaticMode = false;
let mockState = null;

function initStaticEngine() {
  isStaticMode = true;
  const ind = $('#live-indicator');
  const mode = $('#status-mode');
  const desc = $('#status-desc');
  if (ind) ind.style.background = '#0ea5e9';
  if (mode) mode.textContent = 'Interactive Web Demo';
  if (desc) desc.innerHTML = 'Client simulation active.<br>Full interactive pipeline ready.';
  if (!mockState && window.TRACEWEAVE_DEMO) {
    mockState = JSON.parse(JSON.stringify(window.TRACEWEAVE_DEMO.samples));
  }
}

async function api(path, payload) {
  if (!isStaticMode) {
    try {
      const response = await fetch(path, payload ? {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload)} : {});
      if (response.ok) {
        return await response.json();
      }
      if (response.status !== 404 && response.status !== 405) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || 'Request failed');
      }
      if (window.TRACEWEAVE_DEMO) {
        initStaticEngine();
      }
    } catch (err) {
      if (window.TRACEWEAVE_DEMO) {
        initStaticEngine();
      } else {
        throw err;
      }
    }
  }

  if (isStaticMode || window.TRACEWEAVE_DEMO) {
    initStaticEngine();
    const demo = window.TRACEWEAVE_DEMO;
    if (path === '/api/state') {
      return mockState || demo.samples;
    }
    if (path === '/api/demo') {
      const mode = payload.mode;
      if (mode === 'samples') {
        mockState = JSON.parse(JSON.stringify(demo.samples));
        return { ingested: 8 };
      }
      if (mode === 'drift') {
        mockState = JSON.parse(JSON.stringify(demo.drift));
        return { ingested: 2 };
      }
      if (mode === 'adversarial') {
        mockState = JSON.parse(JSON.stringify(demo.adversarial));
        return { ingested: 4 };
      }
    }
    if (path === '/api/approve') {
      mockState = JSON.parse(JSON.stringify(demo.drift_approved));
      return { version: 2, replayed: 2, normalized: 10 };
    }
    if (path === '/api/rollback') {
      mockState = JSON.parse(JSON.stringify(demo.drift));
      return { version: 1, replayed: 2 };
    }
    if (path === '/api/verify') {
      const count = mockState ? mockState.events.length : 8;
      return { verified: count, records: count, failed: [] };
    }
    if (path.startsWith('/api/history')) {
      const row = selected || (mockState ? mockState.events[0] : null);
      return [{
        revision: row ? row.revision : 1,
        status: row ? row.status : 'normalized',
        contract_version: row ? row.contract_version : 1,
        canonical: row ? row.canonical : {},
        errors: row ? row.errors : []
      }];
    }
    if (path === '/api/benchmark') {
      return demo.benchmark;
    }
    if (path === '/api/ingest') {
      return { ingested: 1 };
    }
  }
  throw new Error('Endpoint not available');
}
async function refresh() {
  state = await api('/api/state');
  $('#total').textContent = state.events.length;
  $('#nav-count').textContent = state.events.length;
  $('#event-count').textContent = `${state.events.length} events`;
  $('#normalized').textContent = state.counts.normalized;
  $('#review').textContent = state.counts.needs_mapping + state.counts.drift;
  $('#quarantined').textContent = state.counts.quarantined;
  $('#bytes').textContent = `${state.raw_bytes.toLocaleString()} bytes of original evidence`;
  renderEvents(); renderContracts(); renderAudit();
}
function renderEvents() {
  const query = $('#search').value.toLowerCase();
  const rows = state.events.filter(row => (filter === 'all' || (filter === 'review' ? ['drift','needs_mapping'].includes(row.status) : row.status === filter)) && JSON.stringify(row).toLowerCase().includes(query));
  $('#events-body').innerHTML = rows.map(row => `<tr data-event="${row.id}"><td><button class="event-button" data-inspect="${row.id}" aria-label="Inspect event ${row.id} from ${escapeHtml(row.source)}"><strong>${escapeHtml(row.source)}</strong><small>EVT-${String(row.id).padStart(4,'0')} · revision ${row.revision}</small></button></td><td><span class="format-pill">${escapeHtml(row.format)}</span></td><td class="connection">${escapeHtml(row.canonical.src_ip || 'unresolved')}<span>→</span>${escapeHtml(row.canonical.dst_ip || 'unresolved')}</td><td><span class="action-pill action-${row.canonical.action === 'allow' ? 'allow' : 'deny'}">${escapeHtml(row.canonical.action || '—')}</span></td><td><span class="status ${row.status}">${labels[row.status]}</span></td><td class="evidence-link">${row.raw_sha256.slice(0,9)}… ↗</td></tr>`).join('');
  $('#empty').hidden = rows.length > 0;
  if (!rows.length && state.events.length) $('#empty').innerHTML = '<h3>No matching events.</h3><p>Change the search or status filter to see more records.</p>';
  $('#footer-count').textContent = `${rows.length} of ${state.events.length} events`;
}
function renderContracts() {
  $('#contract-list').innerHTML = state.contracts.length ? state.contracts.map(c => `<article class="card"><h3>${escapeHtml(c.source)} <span class="status ${c.active ? 'normalized' : ''}">${c.active ? 'Active' : 'Historical'} · v${c.version}</span></h3><p>Structure fingerprint: <code>${c.fingerprint}</code></p><pre>${escapeHtml(JSON.stringify(JSON.parse(c.mapping),null,2))}</pre></article>`).join('') : '<article class="card"><p>Load a demonstration or import logs to create your first source contract.</p></article>';
}
function renderAudit() {
  $('#audit-list').innerHTML = state.audit.length ? state.audit.map(a => `<article class="card"><h3>${escapeHtml(a.action.replaceAll('_',' '))}</h3><p>${escapeHtml(a.at)}</p><pre>${escapeHtml(JSON.stringify(JSON.parse(a.details),null,2))}</pre></article>`).join('') : '<article class="card"><p>Mapping decisions will appear here.</p></article>';
}
function inspect(id) {
  const row = state.events.find(r => r.id === id);
  if (!row) return;
  selected = row;
  $('#detail-source').textContent = `${row.source} / ${row.format}`;
  $('#detail-title').textContent = `Event ${String(id).padStart(4,'0')} · ${labels[row.status]}`;
  const active = state.contracts.find(c => c.source === row.source && c.fingerprint === row.fingerprint && c.active);
  const mapping = active ? JSON.parse(active.mapping) : row.suggested_mapping;
  const errors = row.errors.length ? `<div class="detail-errors">${row.errors.map(escapeHtml).join('<br>')}</div>` : '';
  $('#detail-content').innerHTML = `${errors}<h3>Original record</h3><pre>${escapeHtml(row.raw_text)}</pre><div class="raw-hash">SHA-256 · ${row.raw_sha256}</div><div class="detail-actions"><button class="button" id="download-raw">↓ Download original bytes</button><button class="button" id="show-history">◷ View ${row.revision} revision${row.revision === 1 ? '' : 's'}</button></div><h3>${row.status === 'normalized' ? 'Normalized fields' : 'Candidate fields · withheld from export'}</h3><pre>${escapeHtml(JSON.stringify(row.canonical,null,2))}</pre><h3>Field lineage</h3>${Object.entries(row.lineage).map(([target,l]) => `<div class="lineage-item"><strong>${escapeHtml(target)}</strong> ← <code>${escapeHtml(l.selector)}</code> · original <code>${escapeHtml(JSON.stringify(l.original_value))}</code><br><code>${escapeHtml(l.transform)} · contract ${l.contract_version ?? 'unapproved'}</code></div>`).join('') || '<p>No interpreted fields. The raw bytes remain available.</p>'}${Object.keys(row.fields).length ? `<h3>Review field mapping</h3><p class="review-help">Confirm field meaning using the device specification. A valid IP address alone does not establish traffic direction. ${Object.hasOwn(row.fields,'origin') ? 'In this synthetic demo, the firmware renamed src to origin. Map origin to src_ip to repair the affected events.' : ''}</p><div id="mapping-fields">${Object.entries(row.fields).map(([key,value],index) => `<div class="mapping-row"><code>${escapeHtml(key)}<small>${escapeHtml(JSON.stringify(value))}</small></code><select data-field-index="${index}" aria-label="Map ${escapeHtml(key)}"><option value="">Keep as unmapped</option>${state.targets.map(t => `<option value="${t}" ${mapping[key] === t ? 'selected' : ''}>${t}</option>`).join('')}</select></div>`).join('')}</div><p>Required for this demo contract: src_ip, dst_ip, action. Invalid records remain quarantined after replay.</p><div class="detail-actions"><button class="button dark" id="approve">Approve mapping and replay</button>${active && state.contracts.filter(c => c.source === row.source && c.fingerprint === row.fingerprint && c.version < active.version).length ? '<button class="button" id="rollback">Roll back mapping</button>' : ''}</div>` : ''}<h3>Unmapped attributes</h3><pre>${escapeHtml(JSON.stringify(row.unmapped,null,2))}</pre><div id="history-panel"></div>`;
  if (!$('#detail-dialog').open) $('#detail-dialog').showModal();
}
function download(bytes, name) {
  const url = URL.createObjectURL(new Blob([bytes], {type:'application/octet-stream'}));
  const a = document.createElement('a'); a.href=url; a.download=name; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
document.addEventListener('click', async event => {
  const target = event.target.closest('button, [data-event], a[href*="/api/export"]');
  if (!target) return;
  if (target.matches('a[href*="/api/export"]') && isStaticMode) {
    event.preventDefault();
    const rows = (state.events || []).filter(r => r.status === 'normalized');
    const ndjson = rows.map(r => JSON.stringify(r)).join('\n') + (rows.length ? '\n' : '');
    download(new TextEncoder().encode(ndjson), 'traceweave-normalized.ndjson');
    return;
  }
  try {
    if (target.classList.contains('close-dialog')) { target.closest('dialog').close(); return; }
    if (target.dataset.view) {
      document.querySelectorAll('.view').forEach(v => v.hidden = v.id !== `${target.dataset.view}-view`);
      document.querySelectorAll('.nav').forEach(n => n.classList.toggle('active', n === target));
      $('#view-label').textContent = {pipeline:'Event pipeline',contracts:'Source contracts',audit:'Decision history',benchmark:'Evaluation'}[target.dataset.view];
      if (target.dataset.view === 'benchmark') $('#benchmark-data').textContent = JSON.stringify(await api('/api/benchmark'),null,2);
      return;
    }
    if (target.dataset.filter) { filter=target.dataset.filter; document.querySelectorAll('[data-filter]').forEach(b => b.classList.toggle('selected',b === target)); renderEvents(); return; }
    if (target.dataset.inspect || target.dataset.event) { inspect(Number(target.dataset.inspect || target.dataset.event)); return; }
    if (target.id === 'import-open') { $('#import-dialog').showModal(); return; }
    if (target.dataset.demo) {
      target.disabled=true;
      const result = await api('/api/demo',{mode:target.dataset.demo}); await refresh();
      notify(`${result.ingested} synthetic events retained. ${target.dataset.demo === 'drift' ? 'Open a Schema drift event to review origin → src_ip and replay.' : target.dataset.demo === 'adversarial' ? 'Invalid records are retained and excluded from validated export.' : 'Known synthetic mappings were reviewed in the fixture setup. Uploaded logs always require review.'}`);
    }
    if (target.id === 'refresh') await refresh();
    if (target.id === 'verify') { const r=await api('/api/verify'); notify(`${r.verified}/${r.records} records match their original SHA-256. ${r.failed.length ? 'Failed event IDs: '+r.failed.join(', ') : 'No byte-integrity mismatches detected.'} This verifies local bytes, not source authenticity.`,r.failed.length > 0); }
    if (target.id === 'download-raw') download(Uint8Array.from(atob(selected.raw_base64),c=>c.charCodeAt(0)),`event-${selected.id}-original.log`);
    if (target.id === 'show-history') { const rows=await api(`/api/history?id=${selected.id}`); $('#history-panel').innerHTML=`<h3>Immutable-by-application result history</h3><pre>${escapeHtml(JSON.stringify(rows.map(r=>({revision:r.revision,status:r.status,contract:r.contract_version,canonical:r.canonical,errors:r.errors})),null,2))}</pre>`; }
    if (target.id === 'approve') {
      const mapping={}; const keys=Object.keys(selected.fields);
      document.querySelectorAll('[data-field-index]').forEach(el=>{ if(el.value) mapping[keys[Number(el.dataset.fieldIndex)]]=el.value; });
      const r=await api('/api/approve',{source:selected.source,fingerprint:selected.fingerprint,mapping});
      await refresh(); $('#detail-dialog').close(); notify(`Contract v${r.version} approved. Replayed ${r.replayed} original records; ${r.normalized} validated for export.`);
    }
    if (target.id === 'rollback') { const r=await api('/api/rollback',{source:selected.source,fingerprint:selected.fingerprint}); await refresh(); $('#detail-dialog').close(); notify(`Rolled back to contract v${r.version}. Replayed ${r.replayed} records.`); }
  } catch(error) {
    if ($('#detail-dialog').open) {
      const errorBox=document.createElement('div'); errorBox.className='detail-errors'; errorBox.textContent=error.message; $('#detail-content').prepend(errorBox); $('#detail-dialog').scrollTop=0;
    } else notify(error.message,true);
  } finally { target.disabled=false; }
});
$('#search').addEventListener('input',renderEvents);
$('#import-form').addEventListener('submit',async event=>{
  event.preventDefault(); const button=event.submitter; button.disabled=true;
  try {
    const data={source:$('#source-name').value,single_record:$('#single-record').checked};
    const file=$('#log-file').files[0];
    if (file) {
      if (file.size > 2000000) throw new Error('File exceeds 2 MB');
      const bytes=new Uint8Array(await file.arrayBuffer()); let binary='';
      for(let i=0;i<bytes.length;i+=8192) binary+=String.fromCharCode(...bytes.subarray(i,i+8192));
      data.base64=btoa(binary);
    } else data.text=$('#log-input').value;
    const result=await api('/api/ingest',data); await refresh(); $('#import-dialog').close(); notify(`${result.ingested} records retained. Select an event to review the source mapping.`);
  } catch(error) { $('#import-dialog').close(); notify(error.message,true); }
  finally { button.disabled=false; }
});
refresh().catch(error=>notify(error.message,true));
