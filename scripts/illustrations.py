"""Build the native, editable product illustrations used by the homepage in Dub aesthetic."""
from pathlib import Path
import re, html

ROOT = Path(__file__).resolve().parents[1]

# Dub Style Reference Palette:
# Canvas White #ffffff, Ash #e5e5e5, Charcoal #171717, Fog #737373, Electric Blue #2563eb, Soft Blue #eff6ff
P = '#171717'  # Charcoal
E = '#2563eb'  # Electric Blue
V = '#2563eb'  # Electric Blue (Voltage highlight)
M = '#eff6ff'  # Soft Blue tint
G = '#737373'  # Fog
B = '#e5e5e5'  # Ash (Hairline 1px border)
W = '#ffffff'  # Canvas White

def rect(x, y, w, h, fill=W, stroke=B, r=8, extra=''):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}" {extra}/>'

def text(x, y, s, size=14, fill=P, weight=400, extra=''):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{fill}" font-weight="{weight}" {extra}>{html.escape(s)}</text>'

def path(d, c=B, width=1.5, extra=''):
    return f'<path d="{d}" fill="none" stroke="{c}" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round" {extra}/>'

def circle(x, y, r, fill):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}"/>'

def icon(name, x, y, c=E, scale=1):
    paths = {
        'phone': 'M 7 3 H 3 V 6 C 3 14 10 21 18 21 H 21 V 17 L 16 15 L 14 17 C 10 15 8 13 7 10 L 9 8 Z',
        'document': 'M 5 2 H 14 L 20 8 V 22 H 5 Z M 14 2 V 8 H 20 M 9 12 H 16 M 9 16 H 16',
        'calendar': 'M 3 6 H 21 V 22 H 3 Z M 3 11 H 21 M 7 3 V 8 M 17 3 V 8 M 7 15 H 10 M 14 15 H 17 M 7 18 H 10',
        'check': 'M 5 12 L 10 17 L 20 6',
        'message': 'M 3 3 H 21 V 17 H 9 L 3 22 Z M 7 8 H 17 M 7 12 H 14',
        'source': 'M 10 7 L 13 4 A 5 5 0 0 1 20 11 L 16 15 M 14 17 L 11 20 A 5 5 0 0 1 4 13 L 8 9 M 8 16 L 16 8',
        'back': 'M 8 4 L 3 9 L 8 14 M 3 9 H 15 A 6 6 0 0 1 15 21 H 10',
        'spark': 'M 12 2 L 15 9 L 22 12 L 15 15 L 12 22 L 9 15 L 2 12 L 9 9 Z'
    }
    return f'<g transform="translate({x} {y}) scale({scale})">{path(paths[name], c)}</g>'

def wave(x, y, n=35, gap=5, color=V, amp=1):
    heights = [8, 13, 22, 12, 32, 46, 29, 16, 8, 19, 34, 51, 27, 12, 23, 40, 58, 39, 21, 12, 25, 43, 30, 15, 8, 18, 27, 13, 34, 46, 26, 17, 9, 20, 11]
    return ''.join(rect(x + i * gap, y - heights[i % 35] * amp / 2, 2.5, heights[i % 35] * amp, color, 'none', 1.25) for i in range(n))

def mark(x, y, w, h, prefix, color=V):
    s = (ROOT / 'assets/dhvaniq_min.svg').read_text()
    ids = re.findall(r'\bid="([^"]+)"', s)
    for old in ids:
        s = s.replace(f'"{old}"', f'"{prefix}-{old}"').replace(f'#{old}', f'#{prefix}-{old}')
    s = re.sub(r'fill="#[0-9a-fA-F]{6}"', f'fill="{color}"', s)
    s = re.sub(r'<svg\b[^>]*>', f'<svg x="{x}" y="{y}" width="{w}" height="{h}" viewBox="0 0 230.87999 173.249993">', s, count=1)
    return s

def pill(x, y, label):
    return rect(x, y, 22 + len(label) * 6.1, 22, M, '#bfdbfe', 9999) + text(x + 11, y + 15, label, 10, E, 500)

def svg(name, content, w, h):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 {w} {h}" fill="none" class="product-svg" aria-hidden="true"><defs><filter id="{name}-shadow" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#000000" flood-opacity=".04"/></filter></defs><g font-family="Inter, -apple-system, sans-serif">{content}</g></svg>'''

def panel(x, y, w, h, name):
    return rect(x, y, w, h, W, B, 12, f'filter="url(#{name}-shadow)"')

# 1. Voice Composition
c = panel(15, 13, 630, 268, 'voice') + rect(15, 13, 630, 42, '#fbfbfb', B, 12) + mark(32, 25, 19, 15, 'voice-mark', E) + text(63, 40, 'Conversations', 12, G) + text(166, 40, '/  Business assistant', 12, P, 500)
c += circle(44, 86, 13, M) + icon('spark', 36, 78, E, .65) + text(65, 83, 'Assistant', 11, G, 500) + rect(65, 95, 284, 42, '#f5f5f5', B, 8) + text(79, 121, 'Hello. How can I help you today?', 13, P)
c += text(588, 155, 'Caller', 11, G, 500, 'text-anchor="end"') + rect(305, 165, 284, 42, '#0a0a0a', 'none', 8) + text(320, 191, 'I’d like to book a consultation.', 13, W)
c += circle(44, 234, 13, M) + icon('spark', 36, 226, E, .65) + rect(65, 218, 340, 42, M, '#bfdbfe', 8) + text(79, 244, 'Of course. What day works best for you?', 13, P)
c += wave(441, 238, 33, 4, V, .42)
(ROOT / 'assets/voice.svg').write_text(svg('voice', c, 660, 296))

# 2. Knowledge: documents, indexing, and grounded answer
c = panel(15, 13, 330, 162, 'knowledge') + text(33, 39, 'Grounding documents', 12, P, 500) + path('M 15 53 H 345', B, 1)
for i, (title, kind) in enumerate([('Services & pricing', 'PDF'), ('Business hours', 'Text'), ('Booking policy', 'DOC')]):
    y = 64 + i * 35
    c += icon('document', 32, y, E, .6) + text(56, y + 11, title, 11, P, 500) + text(56, y + 24, kind, 9, G) + icon('check', 307, y + 3, '#16a34a', .65)
c += path('M 178 176 V 194', E) + circle(178, 194, 3, V) + panel(30, 205, 300, 78, 'knowledge') + icon('spark', 46, 220, E, .65) + text(71, 233, 'Answers with context', 12, P, 500) + text(48, 254, '“We’re open Monday to Friday.”', 11, G) + icon('source', 49, 263, E, .5) + text(67, 274, 'Source: Business hours', 9, E)
(ROOT / 'assets/knowledge.svg').write_text(svg('knowledge', c, 360, 296))

# 3. Actions: a request becomes a scheduled next step
c = rect(24, 13, 270, 42, '#0a0a0a', 'none', 8) + text(40, 39, '“Can I arrange a consultation?”', 12, W) + path('M 160 55 V 81 H 85 V 104 M 160 81 H 257 V 173', E)
c += panel(16, 104, 198, 170, 'actions') + rect(16, 104, 198, 37, '#fbfbfb', B, 8) + icon('calendar', 30, 114, E, .65) + text(56, 127, 'Appointment request', 10, P, 500) + text(32, 165, 'Consultation', 15, P, 500) + text(32, 187, 'Preferred appointment', 10, G) + rect(31, 204, 167, 28, M, '#bfdbfe', 9999) + text(43, 223, 'Morning · 11:30', 11, E, 500) + text(32, 253, 'Awaiting confirmation', 10, G)
c += panel(232, 175, 112, 97, 'actions') + icon('message', 247, 189, E, .65) + text(247, 226, 'Message', 12, P, 500) + text(247, 246, 'Captured', 10, E)
(ROOT / 'assets/actions.svg').write_text(svg('actions', c, 360, 296))

# 4. Versions: version history
c = panel(25, 13, 310, 271, 'versions') + text(44, 39, 'Version history', 12, P, 500) + path('M 25 54 H 335', B, 1)
c += rect(39, 67, 282, 47, '#fbfbfb', B, 8) + circle(55, 89, 4, G) + text(70, 86, 'Working draft', 12, P, 500) + text(70, 102, 'Your latest changes', 10, G)
c += path('M 55 124 V 253', B) + rect(39, 124, 282, 58, M, '#bfdbfe', 8) + circle(55, 143, 5, E) + text(70, 147, 'v3', 13, P, 500) + pill(222, 134, 'Published') + text(70, 166, 'Active assistant version', 10, G)
c += circle(55, 206, 4, G) + text(70, 210, 'v2', 12, P, 500) + text(101, 210, 'Previous version', 10, G) + icon('back', 287, 195, E, .65)
c += circle(55, 253, 4, G) + text(70, 257, 'v1', 12, P, 500) + text(101, 257, 'Earlier version', 10, G)
(ROOT / 'assets/versions.svg').write_text(svg('versions', c, 360, 296))

print('Rebuilt SVG illustrations with Dub style palette.')
