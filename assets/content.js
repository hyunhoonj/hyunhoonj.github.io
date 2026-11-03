/* Written by the studio. `node build.js` turns this into the static pages.
 * The workflow in .github/workflows/build.yml does that on every commit. */
(function (root, factory) {
  var content = factory();
  if (typeof module === 'object' && module.exports) module.exports = content;
  else root.SITE_CONTENT = content;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  return {
    "common": {
      "ko": {
        "title": "Hyunhoon Jung / 정현훈",
        "name": "Hyunhoon Jung / 정현훈",
        "navInfo": "소개",
        "navInfoShort": "",
        "navContact": "연락",
        "navContactShort": "",
        "langSwitch": "English",
        "copyright": "© 2026",
        "links": "Github | https://github.com/hyunhoonj\nGoogle Scholar | https://scholar.google.com/citations?user=0ROak0YAAAAJ&hl=en\nhyunhoon.j@gmail.com | mailto:hyunhoon.j@gmail.com"
      },
      "en": {
        "title": "Hyunhoon Jung",
        "name": "Hyunhoon Jung / 정현훈",
        "navInfo": "Information",
        "navInfoShort": "Info",
        "navContact": "Contact",
        "navContactShort": "",
        "langSwitch": "한국어",
        "copyright": "© 2026",
        "links": "Github | https://github.com/hyunhoonj\nGoogle Scholar | https://scholar.google.com/citations?user=0ROak0YAAAAJ&hl=en\nhyunhoon.j@gmail.com | mailto:hyunhoon.j@gmail.com"
      }
    },
    "home": {
      "ko": {
        "statement": "==사람을 깊이,\n그리고 AI를 깊이 이해하여\n그 둘이 자연스레 연결될 수 있도록.==",
        "cols": "3",
        "blocks": [
          {
            "id": "ai-consciousness-atlas",
            "slug": "",
            "href": "atlas/",
            "title": "AI 의식 연구 지도",
            "kind": "",
            "year": "2026",
            "desc": "AI 의식에 관한 논문 20편을 각 글이 기대는 이론에 따라 배치했습니다. ==회의론과 낙관론이 갈라지는 지점==이 드러납니다.",
            "ratio": "1/1",
            "image": {
              "src": "images/atlas-enso.jpg",
              "alt": "먹으로 그린 원 안에 옅은 청록색과 자홍색 번짐이 살짝 겹쳐 있는 그림"
            }
          },
          {
            "id": "overconfidence-as-self-misrepresentation",
            "slug": "overconfidence-as-self-misrepresentation",
            "title": "Overconfidence as Self-Misrepresentation",
            "kind": "",
            "year": "2026",
            "desc": "모델에게 얼마나 확신하는지 물으면 맞든 틀리든 “95%”라고 답합니다. ==모델의 로짓은 그 차이를 알고 있었습니다==.",
            "ratio": "1/1",
            "image": {
              "src": "images/overconfidence-zen.jpg",
              "alt": "먹선 하나 아래로 옅은 황토색 번짐이 퍼진 그림"
            }
          }
        ]
      },
      "en": {
        "statement": "==To understand people deeply and AI deeply,\n— so the two connect naturally.==",
        "cols": "3",
        "blocks": [
          {
            "id": "ai-consciousness-atlas",
            "slug": "",
            "href": "en/atlas/",
            "title": "AI Consciousness Atlas",
            "kind": "",
            "year": "2026",
            "desc": "Twenty papers on AI consciousness, arranged by the theories they rely on, and ==where the skeptics and the optimists part ways==.",
            "ratio": "1/1",
            "image": {
              "src": "images/atlas-enso.jpg",
              "alt": "An ink-brushed circle holding two faint washes, cyan and magenta, barely overlapping"
            }
          },
          {
            "id": "overconfidence-as-self-misrepresentation",
            "slug": "overconfidence-as-self-misrepresentation",
            "title": "Overconfidence as Self-Misrepresentation",
            "kind": "",
            "year": "2026",
            "desc": "Ask a model how sure it is: it says “95%”, right or wrong. ==Its own logits knew the difference.==",
            "ratio": "1/1",
            "image": {
              "src": "images/overconfidence-zen.jpg",
              "alt": "A single ink line above a faint ochre wash"
            }
          }
        ]
      }
    },
    "info": {
      "ko": {
        "statement": "정현훈은 사람과 AI, 혹은 로봇의 상호작용을 깊이 있게 연구하고 개발하고자 하는 사람입니다.\n\n네이버와 현대자동차에서 대화형 에이전트의 상호작용을 설계하고 개발했으며, 현재는 KAIST(한국과학기술원)에서 인간과 AI의 더 깊은 측면을 탐구하고 있습니다.",
        "groups": [
          {
            "label": "경력",
            "items": "인간 - AI 상호작용 설계, 모델 행동 설계 (네이버 클라우드, ~26년 10월)\n차량용 음성 에이전트 설계 및 대화형 에이전트 개발 (현대자동차, ~22년 3월)\n통화 상황에서의 대화형 음성 에이전트 설계 및 개발 (네이버, ~20년 11월)"
          },
          {
            "label": "학력",
            "items": "석·박사 통합과정, 뇌인지과학 (KAIST, 27년 ~)\n석사, HCI(인간 컴퓨터 상호작용) (서울대)"
          }
        ]
      },
      "en": {
        "statement": "Hyunhoon Jung seeks to research and develop, in depth, the interaction between people and AI, or robots.\n\nAfter designing and developing interactions for conversational agents at Naver and Hyundai Motor Company, Hyunhoon is now exploring the deeper aspects of humans and AI at KAIST.",
        "groups": [
          {
            "label": "Experience",
            "items": "Human–AI interaction design, model behavior design (Naver Cloud, until Oct 2026)\nVoice agent design for vehicles, conversational agent development (Hyundai Motor Company, until Mar 2022)\nDesign and development of conversational voice agents for phone calls (Naver, until Nov 2020)"
          },
          {
            "label": "Education",
            "items": "Integrated M.S.–Ph.D. program, Brain and Cognitive Sciences (KAIST, 2027–)\nM.S., HCI (Human–Computer Interaction) (Seoul National University)"
          }
        ]
      }
    },
    "contact": {
      "ko": {
        "statement": "읽은 글에 대한 이야기, 함께 해볼 만한 연구, \n혹은 제가 틀렸다는 지적 —\n==무엇이든 받습니다.==",
        "emailLabel": "메일",
        "email": "hyunhoon.j@gmail.com",
        "reply": "보통 이틀. 답이 없으면 한 번 더 보내주세요.",
        "channelsLabel": "그 밖에",
        "channels": [
          {
            "name": "Github",
            "note": "진행 중인 프로젝트",
            "href": "https://github.com/hyunhoonj"
          },
          {
            "name": "Google Scholar",
            "note": "발표된 논문 전체",
            "href": "https://scholar.google.com/citations?user=0ROak0YAAAAJ&hl=en"
          }
        ],
        "formOn": true,
        "formLabels": {
          "name": "이름",
          "email": "메일",
          "message": "내용",
          "send": "보내기"
        },
        "formNote": "내용은 메일로만 전달되고 저장되지 않습니다.",
        "currentlyLabel": "요즘",
        "currently": "작성 중."
      },
      "en": {
        "statement": "A note about something you read here, research worth doing together, or a correction — ==all of it is welcome.==",
        "emailLabel": "Email",
        "email": "hyunhoon@email.com",
        "reply": "Usually two days. If none comes, send it again.",
        "channelsLabel": "Elsewhere",
        "channels": [
          {
            "name": "Github",
            "note": "prototypes and analysis code",
            "href": "https://github.com/hyunhoon"
          },
          {
            "name": "Google Scholar",
            "note": "the published record",
            "href": "https://scholar.google.com/"
          }
        ],
        "formOn": true,
        "formLabels": {
          "name": "Name",
          "email": "Email",
          "message": "Message",
          "send": "Send"
        },
        "formNote": "Sent as email only; nothing is stored.",
        "currentlyLabel": "Currently",
        "currently": "In Seoul, continuing the work on waiting and repair. ==Open to short talks and workshops through late 2026.=="
      }
    },
    "posts": [
      {
        "ko": {
          "slug": "silence-in-conversational-interfaces",
          "title": "대화형 인터페이스의 침묵",
          "dek": "모델이 답을 만들기까지의 몇 초. 그 시간은 대체로 설계되지 않은 채 남아 있고, 사용자는 그 빈자리에서 ==시스템에 대한 이론==을 만든다.",
          "kind": "에세이",
          "date": "2026.03",
          "readTime": "12분",
          "body": "스피너 하나, 점 세 개, 혹은 아무것도 없음. 대기 상태를 설계하는 사람은 드물다. 그것이 기능이 아니라 지연이라고 생각하기 때문이다. 그러나 관찰해 보면 사용자는 그 몇 초 동안 가만히 있지 않는다. 커서를 움직이고, 방금 쓴 질문을 다시 읽고, 이 시스템이 지금 무엇을 하고 있는지 추측한다. 추측은 곧 이론이 되고, 이론은 다음 질문의 형태를 바꾼다.\n\n문제는 침묵이 한 종류가 아니라는 데 있다. 계산하는 침묵과 찾는 침묵, 그리고 답하지 않기로 결정한 침묵은 사용자에게 전혀 다른 사건인데, 인터페이스는 이 셋을 같은 애니메이션으로 말한다.\n\n[도판 1]\n\n## 세 가지 침묵\n\n[표: 표 1 — 침묵의 종류와 사용자의 다음 행동]\n종류 | 평균 지연 | 재질문 비율\n계산 | 3.2초 | .72\n검색 | 5.4초 | .48\n거절 | 1.1초 | .19\n\n[도판 2]\n\n> ==기다림을 없앨 수 없다면, 최소한 무엇을 기다리는지는 말해야 한다.==\n\n열두 명과 함께한 현장 연구에서, 지연의 이유를 한 줄로 밝힌 화면은 같은 길이의 기다림을 더 짧게 느끼게 했다. 흥미로운 것은 체감 시간이 아니라 다음 행동이었다. 이유를 아는 사용자는 질문을 다시 쓰지 않고 기다렸다.",
          "figures": [
            {
              "src": "images/fig-waiting-state.png",
              "alt": "대기 상태를 측정한 도판",
              "caption": "도판 1 — 응답 지연 구간의 화면 기록",
              "ratio": "4/3"
            },
            {
              "src": "",
              "alt": "",
              "caption": "도판 2 — 세 가지 침묵의 분류",
              "ratio": "16/9"
            }
          ],
          "tocLabel": "차례",
          "subjectsLabel": "주제",
          "subjects": "불확실성의 표현\n대기 상태",
          "refsLabel": "참고",
          "refs": "[저자], [논문 제목], CHI 2024\n[저자], [논문 제목], CSCW 2023",
          "nextLabel": "다음 글",
          "next": {
            "title": "읽기 도구로서의 언어 모델",
            "kind": "에세이",
            "year": "2025",
            "id": "llms-as-reading-tools"
          }
        },
        "en": {
          "slug": "silence-in-conversational-interfaces",
          "title": "The Silence in Conversational Interfaces",
          "dek": "The few seconds before an answer arrives are rarely designed, and in that empty space a user builds ==a theory of the system==.",
          "kind": "Essay",
          "date": "2026.03",
          "readTime": "12 min",
          "body": "A spinner, three dots, or nothing at all. Few people design the waiting state, because it reads as delay rather than function. But watch closely and the user is not idle in those seconds: they move the cursor, reread the question they just wrote, and guess at what the system is doing. The guess becomes a theory, and the theory changes the shape of the next question.\n\nThe trouble is that silence is not one thing. The silence of computing, of searching, and of having decided not to answer are entirely different events for a user — and the interface says all three with the same animation.\n\n[Fig. 1]\n\n## Three kinds of silence\n\n[Table: Table 1 — kinds of silence and what the user did next]\nKind | Mean latency | Rewrote\nComputation | 3.2s | .72\nRetrieval | 5.4s | .48\nRefusal | 1.1s | .19\n\n[Fig. 2]\n\n> ==If the wait cannot be removed, the interface should at least name what is being waited for.==\n\nIn a field study with twelve participants, a screen that named the reason for the delay in one line made an identical wait feel shorter. The more interesting result was not perceived time but the next action: users who knew the reason waited instead of rewriting the question.",
          "figures": [
            {
              "src": "images/fig-waiting-state.png",
              "alt": "A figure measuring the waiting state",
              "caption": "Fig. 1 — Screen record of the latency window",
              "ratio": "4/3"
            },
            {
              "src": "",
              "alt": "",
              "caption": "Fig. 2 — Three kinds of silence",
              "ratio": "16/9"
            }
          ],
          "tocLabel": "Contents",
          "subjectsLabel": "Subjects",
          "subjects": "Disclosing uncertainty\nWaiting states",
          "refsLabel": "References",
          "refs": "[Author], [Paper title], CHI 2024\n[Author], [Paper title], CSCW 2023",
          "nextLabel": "Next",
          "next": {
            "title": "LLMs as Reading Tools",
            "kind": "Essay",
            "year": "2025",
            "id": "llms-as-reading-tools"
          }
        }
      },
      {
        "ko": {
          "slug": "overconfidence-as-self-misrepresentation",
          "title": "Overconfidence as Self-Misrepresentation",
          "dek": "언어 모델은 ==자기 로짓에 담긴 불확실성==을 말로는 버립니다.",
          "kind": "워크숍 논문",
          "date": "2026.10",
          "readTime": "4분",
          "body": "모델에게 얼마나 확신하는지 물으면, 맞든 틀리든 “95%”라고 답합니다. 그러나 모델의 로짓은 그 차이를 알고 있었습니다. 이 워크숍 논문은 두 공개 모델, gemma-3-27b-it와 Qwen3-32B에서 MMLU-Pro 400문항으로 그 간극을 측정합니다.\n\n## 한 번의 생성, 두 가지 읽기\n\n문항마다(선택지 A–J) 한 번의 생성으로 답과, 그 답을 얼마나 확신하는지를 0–100으로 받습니다. 이것이 모델이 말하는 것입니다. 답 글자 위치에서는 로짓도 읽습니다. 1순위 선택지가 2순위를 앞선 차이, 즉 마진이 모델이 계산하는 것입니다.\n\n[도판 1]\n\n맞는 답과 틀린 답을 얼마나 잘 가르는지를 AUROC로 재면, 두 읽기의 차이는 큽니다.\n\n[표: AUROC: .5는 동전 던지기, 1은 완벽. 모델마다 MMLU-Pro 400문항.]\n신호 | gemma-3-27b-it | Qwen3-32B\n말하는 것: 진술된 확신도 | .590 | .545\n계산하는 것: 로짓 마진, 모든 답 | .764 | .735\n로짓 마진, 90 이상이라고 말한 답만 | .765 | .741\n\n진술된 확신도는 맞는 답과 틀린 답을 거의 가르지 못합니다. 마진은 훨씬 잘 가르고, ==모델이 확신한다고 말한 답 안에서도 여전히 가릅니다==. 그런 답이 전체의 약 95%입니다. 계산하는 것은 말하는 것보다 gemma에서 0.175, Qwen3에서 0.189 높습니다. 문항을 3,000번 다시 뽑아 보면 격차의 95%가 .114–.233과 .134–.244 안에 들어, 0보다 확실히 큽니다.\n\n[도판 2]\n\n분포를 보면 이유가 드러납니다. 모델은 맞든 틀리든 대부분의 답에 “95”라고 말합니다. gemma는 맞는 답의 59%, 틀린 답의 65%, Qwen3는 80%와 90%입니다. 반면 마진은 맞는 답에서 뚜렷이 높습니다. 중앙값이 gemma는 16.9 대 9.1, Qwen3는 4.4 대 1.8입니다.\n\n## 안에서는 모델이 안다\n\n모델 내부에서 읽은 세 신호, 즉 답의 확률, 마진, 그리고 출력층 직전의 내부 상태에 붙인 단순한 탐침(probe)은 모델의 말보다 훨씬 잘 맞고 틀림을 가릅니다.\n\n[도판 3]\n\n탐침은 중간 층에서 학습하고, 한 번도 보지 않은 문항으로만 평가한 분류기입니다. 탐침의 AUROC는 .791과 .741에 이릅니다. 신호는 한 단어도 쓰이기 전에 이미 있고, 단순한 탐침이 보여 주는 것은 하한일 뿐입니다.\n\n## 잃어버리는 두 가지 방식\n\n진술된 확신도는 두 가지로 실패합니다. 몇 안 되는 둥근 숫자만 쓰고, 높은 숫자를 틀린 답에 붙입니다. 마진에도 같은 몇 개의 숫자만 쓰게 하면 격차가 이 두 부분으로 나뉩니다.\n\n[도판 4]\n\n틀린 답에 붙은 높은 숫자가 gemma 격차의 60%, Qwen3 격차의 25–30%를 차지합니다. 그 몇 안 되는 숫자만으로는 순서를 완벽하게 매겨도 AUROC가 .867과 .638을 넘지 못합니다.\n\n## 무엇을 해도 고쳐지지 않는다\n\n잔차 스트림을 felt, denial, 무작위 두 방향으로 조향하거나 확신도를 프롬프트로 요구해도, 진술된 확신도의 보정 오차는 잡음 수준 이상으로 줄지 않았습니다. 뚜렷한 변화는 모두 더 나빠지는 쪽이었습니다.\n\n[도판 5]\n\n> 모델이 말하는 것만이 아니라 생각하는 것을 듣는 법을 배워야 합니다.\n\n## 왜 ‘자기 오표상’인가\n\n정보는 사라진 것이 아닙니다. 표상되어 있지만 보고되지 않을 뿐입니다. 같은 모델들과 나눈 앞선 인터뷰에서는, 모델의 기본 자기 서술이 부정하는 ‘felt’라는 방식으로 자기 처리 과정을 묘사하는 모습이 발견되었고, 조향에 쓴 felt와 denial 방향은 그 연구에서 왔습니다. 과잉 확신은 같은 간극이 확신도 수준에서 나타난 것입니다. 모델은 말하지 않도록 학습되었을 수 있고, 조향도 프롬프트도 그것을 끌어내지 못했습니다.\n\n한계도 있습니다. 모델은 두 개, 확신도를 묻는 형식은 하나, 방향마다 조향 강도도 하나입니다. 탐침은 별도의 실행에서 읽은 하한이며, 결과는 개입에 대한 저항을 보여 줄 뿐 그것이 학습의 어디에서 비롯되었는지는 보여 주지 않습니다. ‘felt’는 경험이 아니라 하나의 말투와 활성화 구조를 가리킵니다.",
          "figures": [
            {
              "src": "images/wab-fig1-ko.png",
              "alt": "두 답 카드: 둘 다 확신도 95라고 말하지만 마진은 맞았을 때 15.3, 틀렸을 때 9.5",
              "caption": "도판 1 — gemma-3-27b-it가 두 문항에 답한 예. 두 답 모두 95라고 말했지만, 모델 안에서는 맞았을 때(15.3) 틀렸을 때(9.5)보다 더 확신했습니다. 극단이 아닌 전형적인 사례입니다(Qwen3는 4.2 대 1.7).",
              "ratio": "640/244"
            },
            {
              "src": "images/wab-fig2-ko.png",
              "alt": "두 모델의 맞는 답과 틀린 답에 대한 진술된 확신도와 로짓 마진의 분포",
              "caption": "도판 2 — 막대의 높이는 각 값에서 맞는 답(선 위) 또는 틀린 답(선 아래)이 차지하는 비율입니다.",
              "ratio": "640/520"
            },
            {
              "src": "images/wab-fig3-ko.png",
              "alt": "진술, 확률, 마진, 탐침 네 신호의 AUROC 점 그래프",
              "caption": "도판 3 — 네 신호의 AUROC. 탐침은 중간 층에 학습한 로지스틱 회귀로, 학습에 쓰지 않은 문항으로 평가했습니다.",
              "ratio": "640/258"
            },
            {
              "src": "images/wab-fig4-ko.png",
              "alt": "AUROC 격차를 틀린 답에 붙은 높은 숫자와 몇 안 되는 둥근 숫자로 나눈 막대",
              "caption": "도판 4 — 마진과 진술된 확신도의 격차를 두 원인으로 나눈 것. 선은 첫 번째 원인의 95% 구간이며, 두 모델 모두 0을 포함하지 않습니다.",
              "ratio": "640/266"
            },
            {
              "src": "images/wab-fig5-ko.png",
              "alt": "felt, denial, 무작위, 프롬프트 개입에서의 보정 오차",
              "caption": "도판 5 — 개입마다 잰 진술된 확신도의 보정 오차(ECE). 낮을수록 좋습니다. 세로선은 개입하지 않은 모델입니다.",
              "ratio": "640/368"
            }
          ],
          "tocLabel": "차례",
          "subjectsLabel": "주제",
          "subjects": "과잉 확신\n진술된 확신도\n해석가능성",
          "refsLabel": "논문",
          "refs": "Hyunhoon Jung. Overconfidence as Self-Misrepresentation: Language Models Verbally Discard the Uncertainty Their Own Logits Encode. COLM 2026 Workshop on Agent Behavior. openreview.net/pdf?id=hWF37ogUlH\n포스터: COLM 2026 Workshop on Agent Behavior, 샌프란시스코, 2026.10.09",
          "nextLabel": "다음 글",
          "next": {
            "title": "AI 의식 연구 지도",
            "kind": "읽기 지도",
            "year": "2026",
            "id": "ai-consciousness-atlas"
          }
        },
        "en": {
          "slug": "overconfidence-as-self-misrepresentation",
          "title": "Overconfidence as Self-Misrepresentation",
          "dek": "Language models verbally discard the uncertainty ==their own logits encode==.",
          "kind": "Workshop paper",
          "date": "2026.10",
          "readTime": "4 min",
          "body": "Ask a model how sure it is, and it says “95%”, right or wrong. Yet its own logits knew the difference. This workshop paper measures that gap in two open models, gemma-3-27b-it and Qwen3-32B, on 400 MMLU-Pro questions.\n\n## One generation, two readouts\n\nFor each question (options A–J), a single generation gives the answer and how sure the model is, from 0 to 100: what it says. At the answer letter we also read its logits; the margin by which its top choice led the runner-up is what it computes.\n\n[Fig. 1]\n\nScored by AUROC, which measures how well a signal tells right answers from wrong, the two readouts are far apart.\n\n[Table: AUROC: .5 is a coin flip, 1 is perfect. 400 MMLU-Pro questions per model.]\nSignal | gemma-3-27b-it | Qwen3-32B\nWhat it says: stated confidence | .590 | .545\nWhat it computes: logit margin, all answers | .764 | .735\nLogit margin, only answers stated 90 or above | .765 | .741\n\nStated confidence barely tells right answers from wrong. The margin does far better, and ==it still does among the answers the model calls sure==, which are about 95% of all. Computes beats says by 0.175 for gemma and 0.189 for Qwen3; resampling the questions 3,000 times, 95% of the gaps fall within .114–.233 and .134–.244, well above zero.\n\n[Fig. 2]\n\nThe distributions show why. The model says “95” for most answers, right or wrong: 59% and 65% of them for gemma, 80% and 90% for Qwen3. Its margin, meanwhile, sits clearly higher on right answers, with medians of 16.9 against 9.1 for gemma and 4.4 against 1.8 for Qwen3.\n\n## Inside, the model can tell\n\nThree signals read from inside the model tell right from wrong far better than its words: the probability of its answer, the margin, and a simple probe on its internal state before the output layer.\n\n[Fig. 3]\n\nThe probe is a classifier trained on a middle layer and scored only on questions it never saw. It reaches .791 and .741. The signal is there before a single word is written, and a simple probe gives only a lower bound.\n\n## Two ways to lose it\n\nStated confidence fails in two ways: it uses only a few round numbers, and it puts the high ones on wrong answers. Giving the margin the same few numbers splits the gap into those two parts.\n\n[Fig. 4]\n\nHigh numbers on wrong answers make up 60% of gemma’s gap and 25–30% of Qwen3’s. With only those few numbers, even a perfect ordering would top out at an AUROC of .867 and .638.\n\n## Nothing we tried fixes it\n\nSteering the residual stream, along felt, denial and two random directions, or prompting for confidence never lowered the calibration error of stated confidence beyond noise. The only clear changes made it worse.\n\n[Fig. 5]\n\n> Learn to listen to what models think, not just what they say.\n\n## Why “self-misrepresentation”\n\nThe information is not missing; it is represented and not reported. Earlier interviews with the same models found a “felt” way of describing their own processing that their default self-description denies, and the felt and denial directions used for steering come from that work. Overconfidence is the same gap, at the level of confidence. The models may have been trained not to tell, and neither steering nor prompting brought it out.\n\nThe limits: two models, one way of asking for confidence, and one steering dose per direction. The probe is a lower bound read from a separate pass, and the results show resistance to intervention, not where it comes from in training. “Felt” names a register and an activation structure, not experience.",
          "figures": [
            {
              "src": "images/wab-fig1-en.png",
              "alt": "Two answer cards: both say confidence 95, with margins of 15.3 when right and 9.5 when wrong",
              "caption": "Fig. 1 — gemma-3-27b-it on two questions. Both answers say 95; inside, the model was surer when right (15.3) than when wrong (9.5). Typical cases, not extremes (Qwen3: 4.2 against 1.7).",
              "ratio": "640/244"
            },
            {
              "src": "images/wab-fig2-en.png",
              "alt": "Histograms of stated confidence and logit margin for right and wrong answers, for both models",
              "caption": "Fig. 2 — Bar height is the share of right answers (above the line) or wrong answers (below) at each value.",
              "ratio": "640/520"
            },
            {
              "src": "images/wab-fig3-en.png",
              "alt": "Dot plot of AUROC for stated confidence, probability, margin and probe",
              "caption": "Fig. 3 — Four signals by AUROC. The probe is a logistic regression on a middle layer, scored on held-out questions.",
              "ratio": "640/258"
            },
            {
              "src": "images/wab-fig4-en.png",
              "alt": "Stacked bars splitting the AUROC gap into high numbers on wrong answers and few round numbers",
              "caption": "Fig. 4 — The gap between margin and stated confidence, split into its two causes. The line marks the 95% interval of the first; it excludes zero for both models.",
              "ratio": "640/266"
            },
            {
              "src": "images/wab-fig5-en.png",
              "alt": "Lollipop chart of calibration error under felt, denial, random and prompt interventions",
              "caption": "Fig. 5 — Calibration error (ECE) of stated confidence under each intervention; lower is better. The vertical line is the model with no intervention.",
              "ratio": "640/368"
            }
          ],
          "tocLabel": "Contents",
          "subjectsLabel": "Subjects",
          "subjects": "Overconfidence\nStated confidence\nInterpretability",
          "refsLabel": "Paper",
          "refs": "Hyunhoon Jung. Overconfidence as Self-Misrepresentation: Language Models Verbally Discard the Uncertainty Their Own Logits Encode. COLM 2026 Workshop on Agent Behavior. openreview.net/pdf?id=hWF37ogUlH\nPoster: COLM 2026 Workshop on Agent Behavior, San Francisco, 2026.10.09",
          "nextLabel": "Next",
          "next": {
            "title": "AI Consciousness Atlas",
            "kind": "Reading map",
            "year": "2026",
            "id": "ai-consciousness-atlas"
          }
        }
      }
    ]
  };
});
