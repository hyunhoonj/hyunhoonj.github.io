/* The whole site, in one file. Both languages, all four pages.
 *
 * The studio (studio.html) edits this shape and hands back a replacement copy
 * of this file; `node build.js` turns it into the eight static pages. Nothing
 * else reads content from anywhere.
 *
 * Two bits of markup run through the text fields:
 *   ==text==   a highlight band
 *   [도판 1]   in a body, drops figures[0] in at that point (Fig. 1 also works)
 *   > text     in a body, a pull-quote line
 * A blank line starts a new paragraph. Lists (toc, refs, items, links) are one
 * entry per line; links are `name | url`.
 *
 * Figure layouts, per work block:
 *   two   two 4:3          tall  two 4:5
 *   wide  two 4:3 + a 16:8 full  one 16:8      none  no figures
 * A figure with no `src` renders as the empty plate the design shows.
 */
(function (root, factory) {
  var content = factory();
  if (typeof module === 'object' && module.exports) module.exports = content;
  else root.SITE_CONTENT = content;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  return {
    common: {
      ko: {
        title: 'Hyunhoon Jung / 정현훈',
        name: 'Hyunhoon Jung / 정현훈',
        navInfo: '소개',
        navContact: '연락',
        langSwitch: 'English',
        copyright: '© 2026',
        links: 'Github | https://github.com/hyunhoon\nGoogle Scholar | https://scholar.google.com/\nhyunhoon@email.com | mailto:hyunhoon@email.com',
        drafts: '거절의 문장들\n신뢰의 보정 노트'
      },
      en: {
        title: 'Hyunhoon Jung',
        name: 'Hyunhoon Jung / 정현훈',
        navInfo: 'Information',
        navContact: 'Contact',
        langSwitch: '한국어',
        copyright: '© 2026',
        links: 'Github | https://github.com/hyunhoon\nGoogle Scholar | https://scholar.google.com/\nhyunhoon@email.com | mailto:hyunhoon@email.com',
        drafts: 'Sentences of refusal\nNotes on calibration'
      }
    },

    home: {
      ko: {
        statement: '==사람과 AI가 서로를 이해하는 방식을 연구하고, 그 결과를 인터페이스로 옮기는 일을 합니다.==',
        blocks: [
          {
            id: 'silence-in-conversational-interfaces',
            slug: 'silence-in-conversational-interfaces',
            title: '대화형 인터페이스의 침묵',
            kind: '에세이',
            year: '2026',
            desc: '대기 상태는 대체로 설계되지 않는다. 스피너 하나, 점 세 개, 혹은 아무것도 없음. 그러나 사용자는 그 몇 초 동안 모델에 대한 이론을 만든다. 이 글은 ==계산의 침묵, 검색의 침묵, 거절의 침묵==을 구분하고, 각각이 인터페이스에서 어떻게 다르게 말해야 하는지를 다룬다. 열두 명을 대상으로 한 현장 연구가 함께 실려 있다.',
            layout: 'wide',
            figures: [
              { src: 'images/fig-waiting-state.png', alt: '대기 상태를 측정한 도판', caption: '대기 상태 인터페이스' },
              { src: '', alt: '', caption: '세 가지 침묵의 분류' },
              { src: '', alt: '', caption: '현장 연구 기록, 서울 2026' }
            ]
          },
          {
            id: 'repair-strategies',
            slug: '',
            title: 'Repair Strategies in Human–AI Dialogue',
            kind: '연구',
            year: 'CHI 2026',
            desc: '대화가 어긋난 뒤 사람들이 그것을 되돌리는 방법을 관찰했다. 사용자는 질문을 다시 쓰거나, 모델의 말을 인용하거나, 대화를 버리고 새로 시작한다. 세 가지 복구 전략의 성공률과 비용을 측정하고, 인터페이스가 어떤 복구를 더 쉽게 만들 수 있는지 제안한다.',
            layout: 'tall',
            figures: [
              { src: '', alt: '', caption: '복구 전략 분류표' },
              { src: '', alt: '', caption: 'CHI 2026 발표' }
            ]
          },
          {
            id: 'llms-as-reading-tools',
            slug: '',
            title: '읽기 도구로서의 언어 모델',
            kind: '에세이',
            year: '2025',
            desc: '우리는 모델에게 쓰는 법보다 읽는 법을 먼저 배우고 있는지도 모른다. 요약이 원문을 대신하기 시작할 때 무엇이 사라지는지, 그리고 읽기를 돕는 도구가 읽기를 대체하지 않으려면 어떤 형태여야 하는지에 대하여.',
            layout: 'full',
            figures: [
              { src: '', alt: '', caption: '읽기 도구 프로토타입' }
            ]
          }
        ]
      },
      en: {
        statement: '==Researcher based in Seoul, studying how people and AI understand each other, and turning that into interfaces.==',
        blocks: [
          {
            id: 'silence-in-conversational-interfaces',
            slug: 'silence-in-conversational-interfaces',
            title: 'The Silence in Conversational Interfaces',
            kind: 'Essay',
            year: '2026',
            desc: 'The waiting state is rarely designed — a spinner, three dots, or nothing at all. Yet in those seconds a user builds a theory of the model. The essay separates ==the silence of computation, of retrieval, and of refusal==, and asks how each should speak differently in an interface. It is accompanied by a field study with twelve participants.',
            layout: 'wide',
            figures: [
              { src: 'images/fig-waiting-state.png', alt: 'A figure measuring the waiting state', caption: 'Waiting-state interface' },
              { src: '', alt: '', caption: 'Three kinds of silence' },
              { src: '', alt: '', caption: 'Field study notes, Seoul 2026' }
            ]
          },
          {
            id: 'repair-strategies',
            slug: '',
            title: 'Repair Strategies in Human–AI Dialogue',
            kind: 'Research',
            year: 'CHI 2026',
            desc: 'A study of how people repair a conversation once it has gone wrong: they rewrite the question, quote the model back to itself, or abandon the thread and start over. We measure the success and cost of each strategy, and propose which repairs an interface should make cheaper.',
            layout: 'tall',
            figures: [
              { src: '', alt: '', caption: 'Repair taxonomy' },
              { src: '', alt: '', caption: 'CHI 2026 talk' }
            ]
          },
          {
            id: 'llms-as-reading-tools',
            slug: '',
            title: 'LLMs as Reading Tools',
            kind: 'Essay',
            year: '2025',
            desc: 'Perhaps we are learning to read with models before we learn to write with them. On what disappears when a summary begins to stand in for the source, and what shape a reading tool must take if it is not to replace reading.',
            layout: 'full',
            figures: [
              { src: '', alt: '', caption: 'Reading-tool prototype' }
            ]
          }
        ]
      }
    },

    info: {
      ko: {
        statement: '정현훈은 서울에 기반을 둔 연구자이자 디자이너로, 사람과 AI 시스템 사이에서 일어나는 상호작용을 연구한다. 인터페이스가 모델의 불확실성을 어떻게 드러내야 하는지, 그리고 대화가 어긋난 뒤 어떤 방식으로 복구되는지를 주로 다룬다. 연구는 CHI와 CSCW에 발표되었고, 개인 지면에는 논문에 담기지 않는 생각을 쓴다. 작업의 기준은 하나다 — 사용자가 시스템을 정확하게 이해하도록, 적어도 틀리게 오해하지 않도록 만드는 것.',
        groups: [
          { label: '경력', items: '연구원, AI 인터랙션 랩 (’24—현재)\n프로덕트 디자이너, [회사명] (’22—’24)\nUX 리서처, [회사명] (’20—’22)' },
          { label: '학력', items: '박사, 인간–컴퓨터 상호작용 (’18—’22)\n학사, 산업디자인 (’14—’18)' },
          { label: '발표', items: 'CHI 2026, 요코하마\nCSCW 2025, 온라인\nHCI Korea 2025, 강원' },
          { label: '관심 주제', items: '불확실성의 표현\n대화의 복구\n신뢰의 보정\n읽기 도구\n인터페이스 글쓰기' }
        ]
      },
      en: {
        statement: 'Hyunhoon Jung is a Seoul-based researcher and designer studying the interaction between people and AI systems. His work concerns how an interface should disclose a model’s uncertainty, and how a conversation is repaired once it has gone wrong. His research has appeared at CHI and CSCW; his personal page holds the thinking that does not fit into a paper. One standard runs through the work — that a person should understand the system accurately, or at least not misunderstand it.',
        groups: [
          { label: 'Experience', items: 'Researcher, AI Interaction Lab (’24—Now)\nProduct Designer, [Company] (’22—’24)\nUX Researcher, [Company] (’20—’22)' },
          { label: 'Education', items: 'Ph.D., Human–Computer Interaction (’18—’22)\nB.S., Industrial Design (’14—’18)' },
          { label: 'Talks', items: 'CHI 2026, Yokohama\nCSCW 2025, Online\nHCI Korea 2025, Gangwon' },
          { label: 'Subjects', items: 'Disclosing uncertainty\nConversational repair\nTrust calibration\nReading tools\nInterface writing' }
        ]
      }
    },

    contact: {
      ko: {
        statement: '읽은 글에 대한 이야기, 함께 해볼 만한 연구, 혹은 제가 틀렸다는 지적 — ==무엇이든 받습니다.==',
        emailLabel: '메일',
        email: 'hyunhoon@email.com',
        reply: '보통 이틀. 답이 없으면 한 번 더 보내주세요.',
        channelsLabel: '그 밖에',
        channels: [
          { name: 'Github', note: '프로토타입과 분석 코드', href: 'https://github.com/hyunhoon' },
          { name: 'Google Scholar', note: '발표된 논문 전체', href: 'https://scholar.google.com/' }
        ],
        formOn: true,
        formLabels: { name: '이름', email: '메일', message: '내용', send: '보내기' },
        formNote: '내용은 메일로만 전달되고 저장되지 않습니다.',
        currentlyLabel: '요즘',
        currently: '서울. 대기 상태와 복구에 관한 연구를 이어가고 있고, 2026년 하반기에는 ==짧은 강연과 워크숍 초청을 받고 있습니다.=='
      },
      en: {
        statement: 'A note about something you read here, research worth doing together, or a correction — ==all of it is welcome.==',
        emailLabel: 'Email',
        email: 'hyunhoon@email.com',
        reply: 'Usually two days. If none comes, send it again.',
        channelsLabel: 'Elsewhere',
        channels: [
          { name: 'Github', note: 'prototypes and analysis code', href: 'https://github.com/hyunhoon' },
          { name: 'Google Scholar', note: 'the published record', href: 'https://scholar.google.com/' }
        ],
        formOn: true,
        formLabels: { name: 'Name', email: 'Email', message: 'Message', send: 'Send' },
        formNote: 'Sent as email only; nothing is stored.',
        currentlyLabel: 'Currently',
        currently: 'In Seoul, continuing the work on waiting and repair. ==Open to short talks and workshops through late 2026.=='
      }
    },

    post: {
      ko: {
        slug: 'silence-in-conversational-interfaces',
        title: '대화형 인터페이스의 침묵',
        dek: '모델이 답을 만들기까지의 몇 초. 그 시간은 대체로 설계되지 않은 채 남아 있고, 사용자는 그 빈자리에서 ==시스템에 대한 이론==을 만든다.',
        kind: '에세이',
        date: '2026.03',
        readTime: '12분',
        body: '스피너 하나, 점 세 개, 혹은 아무것도 없음. 대기 상태를 설계하는 사람은 드물다. 그것이 기능이 아니라 지연이라고 생각하기 때문이다. 그러나 관찰해 보면 사용자는 그 몇 초 동안 가만히 있지 않는다. 커서를 움직이고, 방금 쓴 질문을 다시 읽고, 이 시스템이 지금 무엇을 하고 있는지 추측한다. 추측은 곧 이론이 되고, 이론은 다음 질문의 형태를 바꾼다.\n\n문제는 침묵이 한 종류가 아니라는 데 있다. 계산하는 침묵과 찾는 침묵, 그리고 답하지 않기로 결정한 침묵은 사용자에게 전혀 다른 사건인데, 인터페이스는 이 셋을 같은 애니메이션으로 말한다.\n\n[도판 1]\n\n> “==기다림을 없앨 수 없다면, 최소한 무엇을 기다리는지는 말해야 한다.==”\n\n열두 명과 함께한 현장 연구에서, 지연의 이유를 한 줄로 밝힌 화면은 같은 길이의 기다림을 더 짧게 느끼게 했다. 흥미로운 것은 체감 시간이 아니라 다음 행동이었다. 이유를 아는 사용자는 질문을 다시 쓰지 않고 기다렸다.',
        figures: [
          { src: 'images/fig-waiting-state.png', alt: '대기 상태를 측정한 도판', caption: '도판 1 — 응답 지연 구간의 화면 기록' },
          { src: '', alt: '', caption: '도판 2 — 세 가지 침묵의 분류' }
        ],
        tocLabel: '차례',
        toc: '설계되지 않은 몇 초\n세 가지 침묵\n현장 기록',
        subjectsLabel: '주제',
        subjects: '불확실성의 표현\n대기 상태',
        refsLabel: '참고',
        refs: '[저자], [논문 제목], CHI 2024\n[저자], [논문 제목], CSCW 2023',
        nextLabel: '다음 글',
        next: { title: '읽기 도구로서의 언어 모델', kind: '에세이', year: '2025', id: 'llms-as-reading-tools' }
      },
      en: {
        slug: 'silence-in-conversational-interfaces',
        title: 'The Silence in Conversational Interfaces',
        dek: 'The few seconds before an answer arrives are rarely designed, and in that empty space a user builds ==a theory of the system==.',
        kind: 'Essay',
        date: '2026.03',
        readTime: '12 min',
        body: 'A spinner, three dots, or nothing at all. Few people design the waiting state, because it reads as delay rather than function. But watch closely and the user is not idle in those seconds: they move the cursor, reread the question they just wrote, and guess at what the system is doing. The guess becomes a theory, and the theory changes the shape of the next question.\n\nThe trouble is that silence is not one thing. The silence of computing, of searching, and of having decided not to answer are entirely different events for a user — and the interface says all three with the same animation.\n\n[Fig. 1]\n\n> “==If the wait cannot be removed, the interface should at least name what is being waited for.==”\n\nIn a field study with twelve participants, a screen that named the reason for the delay in one line made an identical wait feel shorter. The more interesting result was not perceived time but the next action: users who knew the reason waited instead of rewriting the question.',
        figures: [
          { src: 'images/fig-waiting-state.png', alt: 'A figure measuring the waiting state', caption: 'Fig. 1 — Screen record of the latency window' },
          { src: '', alt: '', caption: 'Fig. 2 — Three kinds of silence' }
        ],
        tocLabel: 'Contents',
        toc: 'The undesigned seconds\nThree kinds of silence\nField notes',
        subjectsLabel: 'Subjects',
        subjects: 'Disclosing uncertainty\nWaiting states',
        refsLabel: 'References',
        refs: '[Author], [Paper title], CHI 2024\n[Author], [Paper title], CSCW 2023',
        nextLabel: 'Next',
        next: { title: 'LLMs as Reading Tools', kind: 'Essay', year: '2025', id: 'llms-as-reading-tools' }
      }
    }
  };
});
