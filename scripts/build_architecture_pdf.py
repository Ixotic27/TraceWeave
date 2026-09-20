"""Build the two-page architecture handout; reportlab is a document-only dependency."""
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Flowable

ROOT=Path(__file__).resolve().parents[1]
DEST=ROOT/'output/pdf/TraceWeave-Architecture.pdf'
INK=colors.HexColor('#163c38'); GREEN=colors.HexColor('#16766a'); MUTE=colors.HexColor('#52645f'); PALE=colors.HexColor('#edf4ef')
styles={
 'kicker':ParagraphStyle('kicker',fontName='Helvetica-Bold',fontSize=9,leading=12,textColor=GREEN,spaceAfter=9),
 'title':ParagraphStyle('title',fontName='Helvetica-Bold',fontSize=28,leading=32,textColor=INK,spaceAfter=10),
 'intro':ParagraphStyle('intro',fontName='Helvetica',fontSize=11.5,leading=16,textColor=MUTE,spaceAfter=15),
 'h':ParagraphStyle('h',fontName='Helvetica-Bold',fontSize=12,leading=16,textColor=INK,spaceBefore=12,spaceAfter=6),
 'body':ParagraphStyle('body',fontName='Helvetica',fontSize=9.5,leading=13.8,textColor=INK,spaceAfter=7),
 'small':ParagraphStyle('small',fontName='Helvetica',fontSize=8,leading=11,textColor=MUTE,spaceAfter=4),
}
def p(text,kind='body'):return Paragraph(text.replace('→',' / '),styles[kind])

class Pipeline(Flowable):
    def __init__(self):Flowable.__init__(self);self.width=499;self.height=77
    def draw(self):
        canvas=self.canv
        for i,(title,detail) in enumerate([('Retain','Bytes + hash'),('Parse','Device profile'),('Review','Mapping contract'),('Validate','Fields + lineage'),('Export','NDJSON / cloud')]):
            x=i*102
            canvas.setFillColor(PALE);canvas.roundRect(x,17,91,52,7,fill=1,stroke=0)
            canvas.setFillColor(INK);canvas.setFont('Helvetica-Bold',10);canvas.drawCentredString(x+45.5,48,title)
            canvas.setFont('Helvetica',7.5);canvas.drawCentredString(x+45.5,31,detail)
            if i<4:
                canvas.setStrokeColor(GREEN);canvas.line(x+93,43,x+100,43);canvas.line(x+97,46,x+100,43);canvas.line(x+97,40,x+100,43)
        canvas.setFillColor(MUTE);canvas.setFont('Helvetica',8);canvas.drawString(0,2,'Unknown or invalid records stay local with their originals and an actionable reason.')

def grid(rows,widths):
    t=Table([[p(a),p(b)] for a,b in rows],colWidths=widths,hAlign='LEFT')
    t.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('BACKGROUND',(0,0),(0,-1),PALE),('LINEBELOW',(0,0),(-1,-1),.4,colors.HexColor('#d6e1da')),('LEFTPADDING',(0,0),(-1,-1),10),('RIGHTPADDING',(0,0),(-1,-1),10),('TOPPADDING',(0,0),(-1,-1),8),('BOTTOMPADDING',(0,0),(-1,-1),5)]))
    return t

def footer(c,doc):
    c.setStrokeColor(colors.HexColor('#d6e1da'));c.line(48,39,A4[0]-48,39)
    c.setFillColor(MUTE);c.setFont('Helvetica',8);c.drawString(48,26,'TRACEWEAVE  /  Architecture  /  20 September 2026')
    c.drawRightString(A4[0]-48,26,f'{doc.page} / 2')

def main():
    DEST.parent.mkdir(parents=True,exist_ok=True)
    story=[p('LOCAL FIRST  /  REVIEWABLE AI  /  LOSSLESS ORIGINALS','kicker'),p('TraceWeave','title'),p('Make heterogeneous perimeter logs consistent, without losing the evidence behind each interpretation.','intro'),Pipeline(),
      p('One correction, a traceable result','h'),p('Device firmware and vendor formats change. A log that parses can still be misunderstood. TraceWeave retains the original bytes and treats normalized fields as versioned interpretations. A reviewer confirms a new source structure once; matching records are replayed and future uploads reuse that contract.'),
      p('Processing and review','h'),grid([
       ('<b>Ingest + preserve</b>','Upload, paste or POST to the local API. Store source, receipt time, raw BLOB and SHA-256 in SQLite before interpretation. Reject oversized requests before acceptance.'),
       ('<b>Parse + propose</b>','Bounded JSON, KV, Syslog/KV, CEF, LEEF 1.0, flat XML and one-row CSV. Initial FortiGate, pfSense filterlog and Suricata EVE profiles define event semantics. A local learned proposer assists unfamiliar generic fields.'),
       ('<b>Review + validate</b>','Fingerprint source structure and event class. New/changed structures require approval. Validate IPs, ports, protocol, action and timezone; passive connections and alerts do not receive invented verdicts.'),
       ('<b>Replay + explain</b>','Append result revisions with source selectors, original values, transform versions and mapping versions. Review corrections replay matching records; rollback restores an earlier contract.'),
      ],[125,374]),
      p('Interaction and storage','h'),p('<b>Add logs → Review fields → Export.</b> The workspace starts empty. Plain-language statuses, source summaries, filters, pagination and expandable originals expose what needs attention. Counts refresh from the local database; no simulated records are served.'),
      p('<b>Local tables:</b> events, contracts, results and audit. Optional cloud settings and receipts add a stable workspace UUID and acknowledged revision IDs. SHA-256 checks local byte consistency; it does not authenticate devices or provide tamper-proof custody.'),
      PageBreak(),p('IMPLEMENTATION  /  EVIDENCE  /  LIMITS','kicker'),p('Small enough to run locally.','title'),p('GPU-trained assistance plus deterministic validation, with optional cloud export under the user\'s control.','intro'),
      p('GPU model: suggestions with an explicit review gate','h'),p('A 16,448-parameter classifier was trained on the <b>AMD Radeon RX 6500M using DirectML</b>. GPU matrix/backpropagation checks and gradient-device assertions passed; the trainer has no CPU fallback. Character and word features plus value shapes predict seven field meanings or an ignore class.'),
      p('The authored dataset contains <b>169 training / 40 validation / 60 test examples</b>, with disjoint normalized field names. Validation selected abstention thresholds. The held-out run produced <b>39 correct suggestions, 2 incorrect suggestions and 19 abstentions</b>. These are synthetic field-name results, not production-vendor accuracy. Uncalibrated scores are never treated as proof of meaning.'),
      p('Known vendor rules and aliases take priority. Invalid values and ambiguous matches are excluded. Saved JSON weights use a small portable local inference routine; PyTorch and a GPU are needed for training, not ordinary use. There are no cloud AI calls.'),
      p('Optional Supabase connection','h'),p('A dedicated Free project in Mumbai is linked via CLI. The server exports only explicitly selected, reviewed latest revisions, including originals and lineage. At most 100 records / 1.5 MB are sent per batch. Composite workspace/event/revision keys and local receipts make retries idempotent. Earlier cloud revisions remain; this is not a full workspace backup.'),
      p('Secrets remain in ignored server configuration. RLS is enabled; public and authenticated access is revoked. The server role has SELECT and INSERT only. TLS remains verified and redirects are refused. Real checks confirmed byte retention, retry deduplication and denied public access; disposable verification rows were removed.'),
      p('Verified today; boundaries for deployment','h'),grid([
       ('<b>Verified</b>','54 automated checks; isolated browser AI review/export flow; real Supabase round trip and access controls. Evidence: docs/VERIFICATION.md, docs/MODEL_CARD.md and docs/evidence/.'),
       ('<b>Runtime</b>','Python 3.11+ standard library, SQLite and local HTML/CSS/JavaScript. Loopback-only, single user. Air-gapped operation works with cloud export disabled. Native Windows launcher tested; Docker recipe not built.'),
       ('<b>Still required</b>','Independent vendor-label evaluation, broader grammar coverage, pinned OCSF export, durable live collectors and measured scale/recovery. Current schema is traceweave.network/0.1. Same-shaped semantic drift can require domain review.'),
      ],[125,374]),
      Spacer(1,8),p('Scale path: durable collectors → partitioned queue → immutable raw storage → stateless parsing workers → contract registry → columnar/SIEM output. One billion events/day averages about 11,574 events/second; the laptop implementation does not establish this capacity.','small'),
      p('Source code: github.com/Ixotic27/TraceWeave  |  Setup: README.md  |  Cloud setup: docs/SUPABASE.md','small')]
    doc=SimpleDocTemplate(str(DEST),pagesize=A4,rightMargin=48,leftMargin=48,topMargin=43,bottomMargin=53,title='TraceWeave - Architecture',author='TraceWeave')
    doc.build(story,onFirstPage=footer,onLaterPages=footer)
    print(DEST)

if __name__=='__main__':main()
