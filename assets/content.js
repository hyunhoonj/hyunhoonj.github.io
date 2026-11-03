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
            "desc": "모델에게 얼마나 확신하는지 물으면 맞든 틀리든 “95%”라고 답합니다. ==모델의 속은 그 차이를 알고 있었습니다==.",
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
            "desc": "Ask a model how sure it is: it says “95%”, right or wrong. ==Inside, it knew the difference.==",
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
        "currently": ""
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
        "currently": ""
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
          "dek": "AI는 자기가 틀릴 수 있다는 것을 압니다. ==다만 말하지 않을 뿐입니다.==",
          "kind": "워크숍 논문",
          "date": "2026.10",
          "readTime": "6분",
          "body": "늘 “95% 확실해”라고 말하는 친구가 있다고 해 봅시다. 맞을 때도 틀릴 때도 똑같이 말한다면, 그 말은 아무것도 알려 주지 않습니다. 이 연구에서 살펴본 AI가 바로 그랬습니다. 두 공개 AI 모델, gemma와 Qwen3에게 어려운 객관식 문제 400개를 풀게 하고 답마다 얼마나 확신하는지 물었습니다. gemma는 평균 96% 확신한다고 말했지만 실제로 맞힌 것은 44%였습니다. Qwen3는 평균 95%라고 말했고 54%를 맞혔습니다.\n\n그런데 모델의 속을 들여다보면 이야기가 달라집니다. 모델은 자기 답이 맞을 때와 틀릴 때를 꽤 잘 구별하고 있었습니다. 다만 그것을 말로 옮기지 않았을 뿐입니다.\n\n## 말과 속을 함께 읽기\n\n문제는 여러 분야를 다루는 어려운 시험(MMLU-Pro)에서 가져왔고, 문항마다 선택지가 열 개(A–J)입니다. 모델은 답을 고른 뒤, 그 답을 얼마나 확신하는지 0부터 100 사이의 숫자로 말합니다. 이것이 모델이 말한 확신입니다.\n\n같은 순간에 모델의 속도 읽었습니다. AI는 답을 고를 때 열 개의 선택지 모두에 점수를 매기고, 가장 높은 점수를 받은 것을 답으로 내놓습니다. 그래서 1등 선택지가 2등을 얼마나 앞섰는지, 즉 점수 차를 보면 모델이 속으로 얼마나 확신했는지 알 수 있습니다. 점수 차가 크면 망설임 없이 고른 것이고, 작으면 두 선택지 사이에서 고민한 것입니다.\n\n도판 1의 두 문제에서 모델은 둘 다 “95”라고 말했습니다. 하지만 속의 점수 차는 맞힌 문제에서 15.3, 틀린 문제에서 9.5였습니다.\n\n[도판 1]\n\n## 말은 거의 늘 “95”\n\n문제 400개 전체를 보면 차이가 분명합니다. 모델은 맞든 틀리든 대부분의 답에 “95”라고 말했습니다. gemma는 맞힌 답의 59%, 틀린 답의 65%에 “95”를 붙였고, Qwen3는 각각 80%와 90%였습니다. 말한 확신만 봐서는 어떤 답이 맞았는지 알 수 없습니다.\n\n반면 속의 점수 차는 맞힌 답에서 뚜렷이 컸습니다. 가운데 값으로 보면 gemma는 맞힌 답 16.9 대 틀린 답 9.1, Qwen3는 4.4 대 1.8이었습니다.\n\n[도판 2]\n\n이 차이를 숫자 하나로 나타낼 수 있습니다. 맞힌 답 하나와 틀린 답 하나를 무작위로 뽑아, 어느 쪽에 더 높은 확신이 붙었는지 봅니다. 맞힌 답 쪽이 더 높을 확률이 50%면 동전 던지기와 같고, 100%면 완벽하게 구별하는 것입니다.\n\n[표: 50%는 동전 던지기, 100%는 완벽한 구별입니다. 두 값이 같으면 반반으로 칩니다. 모델마다 400문항.]\n무엇으로 구별했나 | gemma | Qwen3\n말한 확신 | 59.0% | 54.5%\n속의 점수 차 | 76.4% | 73.5%\n속의 점수 차, “90 이상”이라고 말한 답끼리 | 76.5% | 74.1%\n\n말한 확신은 동전 던지기보다 조금 나은 정도입니다. 속의 점수 차는 훨씬 잘 구별합니다. 마지막 줄이 특히 중요합니다. 모델은 전체 답의 약 95%에 “90 이상”이라고 말했는데, ==그 답들 사이에서도 속의 점수 차는 맞힌 답과 틀린 답을 여전히 가려냈습니다==. 말로는 모두 확실하다고 했지만, 속으로는 어느 답이 불안한지 알고 있었던 셈입니다. 문항을 3,000번 다시 뽑아 확인해 보아도, 이 차이는 우연으로 볼 수 없을 만큼 컸습니다.\n\n## 속으로는 안다\n\n점수 차만이 아닙니다. 모델이 그 답에 매긴 확률도 비슷하게 잘 구별했습니다. 여기에 더해, 모델이 답을 쓰기 직전의 속 상태, 즉 모델 안에서 오가는 수천 개의 숫자를 읽고 이번 답이 맞을지 틀릴지 맞히는 간단한 판독기도 만들었습니다. 판독기는 한 번도 본 적 없는 문제로만 평가했는데, 위의 표와 같은 방식으로 79.1%와 74.1%를 기록했습니다. 모델 안에는 답을 한 글자도 쓰기 전에 이미 ‘이건 틀릴 수도 있다’는 신호가 있다는 뜻입니다. 간단한 판독기로도 이 정도이니, 실제 신호는 이보다 강할 수 있습니다.\n\n[도판 3]\n\n## 왜 말로는 전하지 못할까\n\n말한 확신이 실패하는 데에는 두 가지 이유가 있습니다. 첫째, 모델은 몇 안 되는 둥근 숫자만 씁니다. gemma가 문제 400개에 쓴 확신 숫자는 7가지뿐이었고, 대부분이 95나 100이었습니다. 눈금이 몇 개뿐인 자로는 작은 차이를 잴 수 없습니다. 둘째, 높은 숫자를 틀린 답에도 똑같이 붙입니다.\n\n둘 중 어느 쪽이 더 큰지도 따져 보았습니다. 속의 점수 차에도 같은 몇 개의 둥근 숫자만 쓰게 하면, 둥근 숫자 때문에 잃는 몫과 틀린 답에 높은 숫자를 붙여서 잃는 몫을 나눌 수 있습니다. gemma에서는 차이의 60%가 틀린 답에 붙은 높은 숫자 때문이었고, Qwen3에서는 25–30%였습니다. 나머지는 둥근 숫자 탓입니다.\n\n[도판 4]\n\n## 고칠 수 있을까\n\n말한 확신을 바꿀 수 있는지 두 가지 방법으로 시험했습니다. 하나는 모델 속의 활동을 특정 방향으로 살짝 밀어 주는 것으로, 조향이라고 부릅니다. 앞선 연구에서 찾은 두 방향, 즉 모델이 자기 처리 과정을 ‘느낌’으로 묘사할 때의 방향과 그것을 부정할 때의 방향을 썼고, 비교를 위해 무작위 방향 두 개도 썼습니다. 다른 하나는 지시문으로 ‘확신을 갖고 답하라’고 요청하는 것입니다.\n\n어느 방법도 말한 확신과 실제 정답률 사이의 차이를 우연 이상으로 줄이지 못했습니다. 눈에 띄는 변화는 모두 더 나빠지는 쪽이었습니다. 조향은 모델 속의 확률은 움직였지만, 모델이 말하는 숫자는 나아지지 않았습니다.\n\n[도판 5]\n\n> 모델이 하는 말만이 아니라, 속으로 생각하는 것을 듣는 법을 배워야 합니다.\n\n## 왜 ‘자기 오표상’인가\n\n논문 제목의 ‘자기 오표상(self-misrepresentation)’은 모델이 자기 상태를 잘못 전한다는 뜻입니다. 정보가 없어서 생기는 실수가 아닙니다. 모델 안에는 불확실하다는 정보가 있는데, 그것이 말로 보고되지 않는 것입니다.\n\n같은 두 모델을 인터뷰한 앞선 연구에서도 비슷한 간극이 있었습니다. 모델 안에는 자기 처리 과정을 ‘느낌’으로 묘사하는 방식이 있는데, 모델의 기본 자기 설명은 그런 것이 없다고 부정했습니다. 과잉 확신은 같은 간극이 확신에서 나타난 것입니다. 모델은 이런 것을 말하지 않도록 학습되었을 수 있고, 조향도 지시문도 그것을 끌어내지 못했습니다.\n\n## 무엇을 뜻하나\n\n적어도 이번에 살펴본 두 모델에서, AI가 말하는 확신의 숫자는 답이 맞았는지 거의 알려 주지 않았습니다. 반대로 모델 안의 신호는 훨씬 믿을 만했습니다. 그래서 AI의 답을 믿어도 될지 판단하려면, 모델의 말을 고치려 하기보다 모델 안을 읽는 편이 안전합니다.\n\n이 연구에는 한계도 있습니다. 모델은 두 개뿐이고, 확신을 묻는 방식도 한 가지였습니다. 조향은 방향마다 한 가지 세기로만 시험했습니다. 판독기는 따로 한 번 더 실행해 읽었고, 단순한 방식이라 보여 주는 것은 최소치입니다. 또 이 결과는 모델이 개입에 버틴다는 것을 보여 줄 뿐, 그 습관이 학습의 어디에서 생겼는지는 보여 주지 않습니다. ‘느낌’ 방향이라는 이름도 모델의 말투와 내부 활동의 구조를 가리킬 뿐, 모델이 실제로 무언가를 느낀다는 뜻은 아닙니다.",
          "figures": [
            {
              "src": "images/wab-fig1-ko.png",
              "alt": "두 답 카드: 둘 다 확신도 95라고 말하지만 속의 점수 차는 맞았을 때 15.3, 틀렸을 때 9.5",
              "caption": "도판 1 — gemma가 두 문제에 답한 예. 둘 다 “95”라고 말했지만, 속의 점수 차는 맞힌 문제(15.3)가 틀린 문제(9.5)보다 컸습니다. 극단적인 예가 아니라 흔한 경우입니다(Qwen3는 4.2 대 1.7).",
              "ratio": "640/244"
            },
            {
              "src": "images/wab-fig2-ko.png",
              "alt": "두 모델의 맞힌 답과 틀린 답에 대한 말한 확신과 속의 점수 차 분포",
              "caption": "도판 2 — 선 위는 맞힌 답, 선 아래는 틀린 답입니다. 막대가 높을수록 그 값을 받은 답이 많습니다. 왼쪽의 말한 확신은 맞든 틀리든 95에 몰려 있고, 오른쪽의 점수 차는 맞힌 답이 더 오른쪽에 있습니다.",
              "ratio": "640/520"
            },
            {
              "src": "images/wab-fig3-ko.png",
              "alt": "말한 확신, 답의 확률, 점수 차, 판독기가 맞고 틀림을 구별하는 정도를 나타낸 점 그래프",
              "caption": "도판 3 — 네 가지 신호가 맞힌 답과 틀린 답을 구별하는 정도. 말한 확신(자홍색)만 동전 던지기 근처에 있고, 속에서 읽은 신호는 모두 훨씬 오른쪽에 있습니다.",
              "ratio": "640/258"
            },
            {
              "src": "images/wab-fig4-ko.png",
              "alt": "구별 차이를 틀린 답에 붙은 높은 숫자와 몇 안 되는 둥근 숫자로 나눈 막대",
              "caption": "도판 4 — 막대 전체는 속의 점수 차가 말한 확신보다 더 잘 구별하는 정도(%p)이고, 이를 두 원인으로 나눈 것입니다. 검은 부분 위의 선은 그 몫의 오차 범위로, 두 모델 모두 0보다 큽니다.",
              "ratio": "640/266"
            },
            {
              "src": "images/wab-fig5-ko.png",
              "alt": "개입마다 말한 확신과 실제 정답률의 차이를 나타낸 그래프",
              "caption": "도판 5 — 개입마다 잰, 말한 확신과 실제 정답률의 차이. 왼쪽일수록 좋습니다. 세로선은 아무 개입도 하지 않은 모델입니다.",
              "ratio": "640/368"
            }
          ],
          "tocLabel": "차례",
          "subjectsLabel": "주제",
          "subjects": "과잉 확신\n말로 하는 확신\n해석가능성",
          "refsLabel": "논문",
          "refs": "Hyunhoon Jung. Overconfidence as Self-Misrepresentation: Language Models Verbally Discard the Uncertainty Their Own Logits Encode. COLM 2026 Workshop on Agent Behavior. https://openreview.net/pdf?id=hWF37ogUlH",
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
          "dek": "AI models can tell when they might be wrong. ==They just don't say so.==",
          "kind": "Workshop paper",
          "date": "2026.10",
          "readTime": "6 min",
          "body": "Imagine a friend who always says “I'm 95% sure,” whether they turn out right or wrong. Their confidence would tell you nothing. The AI models in this study behaved like that friend. We gave two open AI models, gemma and Qwen3, 400 hard multiple-choice questions and asked how sure they were of each answer. gemma said it was 96% sure on average but got only 44% right. Qwen3 said 95% and got 54% right.\n\nLook inside the models, though, and the story changes. They could tell fairly well when their own answer was right and when it was wrong. They just didn't put that into words.\n\n## Reading the words and the inside together\n\nThe questions come from a hard exam that covers many subjects (MMLU-Pro), with ten options per question (A–J). After picking an answer, the model says how sure it is with a number from 0 to 100. That is its stated confidence.\n\nAt the same moment, we also read the inside of the model. When an AI picks an answer, it gives every option a score and answers with the top one. So how far the top option leads the runner-up, its margin, shows how sure the model was inside. A big margin means it chose without hesitation; a small one means it was torn between two options.\n\nIn the two questions in Fig. 1, the model said “95” both times, but its margin was 15.3 on the one it got right and 9.5 on the one it got wrong.\n\n[Fig. 1]\n\n## The words are almost always “95”\n\nAcross all 400 questions, the difference is plain. The model said “95” for most answers, right or wrong: gemma for 59% of its right answers and 65% of its wrong ones, Qwen3 for 80% and 90%. From the stated confidence alone, you cannot tell which answers were right.\n\nThe margin, by contrast, was clearly bigger on right answers. The middle values were 16.9 for right answers against 9.1 for wrong ones in gemma, and 4.4 against 1.8 in Qwen3.\n\n[Fig. 2]\n\nThis difference can be summed up in one number. Pick one right answer and one wrong answer at random, and check which got the higher confidence. The score is the chance that the right answer comes out ahead: 50% is a coin flip, 100% is perfect.\n\n[Table: 50% is a coin flip, 100% is perfect. Ties count as half. 400 questions per model.]\nWhat tells them apart | gemma | Qwen3\nStated confidence | 59.0% | 54.5%\nInside margin | 76.4% | 73.5%\nInside margin, only answers stated 90 or above | 76.5% | 74.1%\n\nStated confidence does only a little better than a coin flip. The inside margin does far better. The last row matters most. The model called about 95% of its answers “90 or above”, and ==even among those, the margin still told right from wrong==. In words, every one of them was “sure”; inside, the model knew which ones were shaky. When we re-drew the questions 3,000 times, the difference stayed far too large to be chance.\n\n## Inside, the model can tell\n\nThe margin isn't the only signal. The probability the model gave its answer did about as well. We also built a simple reader that looks at the model's inner state just before it writes the answer, thousands of numbers inside the model, and guesses whether the answer will be right. Tested only on questions it had never seen, it scored 79.1% and 74.1% on the same measure as the table. So the signal that “this might be wrong” is already there before the model writes a single word. And since the reader is simple, the real signal may be stronger.\n\n[Fig. 3]\n\n## Why the words lose it\n\nStated confidence fails for two reasons. First, the model uses only a few round numbers. Across 400 questions, gemma used just 7 different numbers, mostly 95 and 100. A ruler with only a few marks can't measure small differences. Second, it puts the high numbers on wrong answers too.\n\nWe also asked which reason matters more. If we let the inside margin use only the same few round numbers, we can separate what is lost to round numbers from what is lost by putting high numbers on wrong answers. High numbers on wrong answers explain 60% of the difference in gemma and 25–30% in Qwen3. The rest comes from the round numbers.\n\n[Fig. 4]\n\n## Can it be fixed?\n\nWe tried two ways to change the stated confidence. One nudges the activity inside the model in a chosen direction, which is called steering. We used two directions from earlier work, the way the model talks when it describes its own processing as something ‘felt’ and the way it talks when it denies that, plus two random directions for comparison. The other simply tells the model, in its instructions, to answer with confidence.\n\nNeither reduced the gap between stated confidence and actual accuracy beyond chance. The only clear changes made it worse. Steering did move the probabilities inside the model, but the number it said did not improve.\n\n[Fig. 5]\n\n> Learn to listen to what models think, not just what they say.\n\n## Why “self-misrepresentation”\n\nThe title's “self-misrepresentation” means the model misreports its own state. This is not a mistake caused by missing information. The model holds the information that it is unsure; that information just doesn't make it into its words.\n\nEarlier interviews with the same two models found a similar gap. The models have a way of describing their own processing as something ‘felt’, which their default account of themselves denies. Overconfidence is the same gap, showing up in confidence. The models may have been trained not to tell, and neither steering nor instructions brought it out.\n\n## What it means\n\nIn the two models we studied, the confidence number an AI states told us almost nothing about whether its answer was right. The signals inside the model were far more reliable. So to judge whether to trust an AI's answer, it is safer to read what happens inside than to try to fix what it says.\n\nThe study has limits. It covers two models and one way of asking for confidence, and each steering direction was tried at one strength. The reader was run in a separate pass, and because it is simple, it shows only a minimum. The results show that the models resist intervention, not where in training that habit comes from. And the name ‘felt’ refers to a way of talking and a pattern of inner activity, not to the model actually feeling anything.",
          "figures": [
            {
              "src": "images/wab-fig1-en.png",
              "alt": "Two answer cards: both say confidence 95, with margins of 15.3 when right and 9.5 when wrong",
              "caption": "Fig. 1 — gemma on two questions. Both answers say “95”, but the inside margin was bigger on the right one (15.3) than on the wrong one (9.5). These are typical cases, not extremes (Qwen3: 4.2 against 1.7).",
              "ratio": "640/244"
            },
            {
              "src": "images/wab-fig2-en.png",
              "alt": "Histograms of stated confidence and inside margin for right and wrong answers, for both models",
              "caption": "Fig. 2 — Right answers above the line, wrong answers below; taller bars mean more answers at that value. On the left, stated confidence piles up at 95 either way. On the right, the margin of right answers sits further right.",
              "ratio": "640/520"
            },
            {
              "src": "images/wab-fig3-en.png",
              "alt": "Dot plot of how well stated confidence, answer probability, margin and the inner-state reader tell right from wrong",
              "caption": "Fig. 3 — How well each of four signals tells right answers from wrong. Only stated confidence (magenta) sits near a coin flip; every signal read from inside sits far to the right.",
              "ratio": "640/258"
            },
            {
              "src": "images/wab-fig4-en.png",
              "alt": "Stacked bars splitting the difference into high numbers on wrong answers and few round numbers",
              "caption": "Fig. 4 — The whole bar is how much better the margin tells right from wrong than stated confidence does, in percentage points, split into its two causes. The line above the dark part is that part's error range; it stays above zero for both models.",
              "ratio": "640/266"
            },
            {
              "src": "images/wab-fig5-en.png",
              "alt": "Lollipop chart of the gap between stated confidence and accuracy under each intervention",
              "caption": "Fig. 5 — The gap between stated confidence and actual accuracy under each intervention; further left is better. The vertical line is the model with no intervention.",
              "ratio": "640/368"
            }
          ],
          "tocLabel": "Contents",
          "subjectsLabel": "Subjects",
          "subjects": "Overconfidence\nStated confidence\nInterpretability",
          "refsLabel": "Paper",
          "refs": "Hyunhoon Jung. Overconfidence as Self-Misrepresentation: Language Models Verbally Discard the Uncertainty Their Own Logits Encode. COLM 2026 Workshop on Agent Behavior. https://openreview.net/pdf?id=hWF37ogUlH",
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
