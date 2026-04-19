/**
 * STORY 2: The Vanished Girl (Mystery)
 * Variables: trust, evidence[], suspectsCleared, alibisBroken, revelation, clues
 * Named characters: sheriffName (The Sheriff), witnessName (The Key Witness)
 * Endings:
 *   success → Case solved, girl found alive
 *   death   → Detective killed by the real kidnapper
 *   failure → Wrong person arrested, girl never found
 *   secret  → The girl staged her own disappearance to escape an abuser protected by the town
 */

const nodes = [
  // ── ARRIVAL ──────────────────────────────────────────────────────────────────
  {
    id: 'm_start',
    en: () =>
      `The case file is thin. Missing person — child, female, age seven, name: Lily Harrow. Disappeared three days ago from the coastal town of Greyvale. No body found. No ransom note.\n\nLocal police are stumped. The state detective bureau sends you.\n\nYou arrive by ferry. Greyvale is picture-postcard beautiful and deeply wrong. The streets are too quiet. The fishermen don't make eye contact. The hotel clerk hands you your key without speaking.\n\nAt your room window you look out at the grey Atlantic and pull out the case file again. Three suspects. One key witness. And a seven-year-old girl who walked to school and didn't arrive.`,
    ar: () =>
      `ملف القضية رفيع. مفقود — طفلة، أنثى، عمر سبع سنوات، الاسم: ليلى هارو. اختفت منذ ثلاثة أيام من المدينة الساحلية غرايفيل. لم يُعثر على جثة. لا مذكرة فدية.\n\nالشرطة المحلية في حيرة. مكتب المحققين الحكومي يرسلك.\n\nتصل بالعبارة. غرايفيل جميلة كالبطاقة البريدية ومضطربة بعمق. الشوارع هادئة أكثر مما يجب. الصيادون لا يُقيمون تواصلًا بالعين. موظف الفندق يناولك مفتاحك دون كلام.\n\nمن نافذة غرفتك تنظر إلى المحيط الأطلسي الرمادي وتسحب ملف القضية مجددًا. ثلاثة مشتبه بهم. شاهد رئيسي واحد. وفتاة ذات سبع سنوات مشت إلى المدرسة ولم تصل.`,
    choices: [
      {
        id: 'm_s_sheriff',
        en: () => 'Go directly to the sheriff\'s office',
        ar: () => 'اذهب مباشرة إلى مكتب الشريف',
        next: 'm_sheriff_meet',
        effects: { trust: 0 },
      },
      {
        id: 'm_s_school',
        en: () => 'Visit the school — where Lily was last seen heading',
        ar: () => 'زر المدرسة — حيث شُوهدت ليلى آخر مرة متجهة إليها',
        next: 'm_school_visit',
        effects: {},
      },
      {
        id: 'm_s_parents',
        en: () => 'Interview the parents first',
        ar: () => 'استجوب الوالدين أولًا',
        next: 'm_parents_interview',
        effects: {},
      },
      {
        id: 'm_s_crime_scene',
        en: () => 'Walk the route Lily took — find the last known location',
        ar: () => 'سر في الطريق الذي سلكته ليلى — اجد آخر موقع معروف',
        next: 'm_route_walk',
        effects: {},
      },
    ],
  },

  // Sheriff meeting
  {
    id: 'm_sheriff_meet',
    requiresName: 'sheriffName',
    en: (v) =>
      `Sheriff ${v.names?.sheriffName ?? 'Boyd'} is a thick-necked man with an easy smile. Too easy. He shakes your hand too firmly and compliments your reputation before you've said a word.\n\n"We've got a lead," he says. "Drifter. Passed through town the day before she vanished. Name's Kelvin Marsh."\n\nHe slides a photo across the desk. A man in his forties, wiry, tan. Arrested twice before — drunk and disorderly, trespassing.\n\n"Every instinct says it's him," the sheriff says. "Just need to build the case."\n\nSomething about the way he says 'build the case' sits wrong with you.`,
    ar: (v) =>
      `الشريف ${v.names?.sheriffName ?? 'بويد'} رجل سميك الرقبة بابتسامة سهلة. سهلة أكثر مما ينبغي. يصافحك بقوة زائدة ويثني على سمعتك قبل أن تنطق بكلمة.\n\n"لدينا خيط،" يقول. "متشرد. مرّ بالمدينة في اليوم السابق لاختفائها. اسمه كيلفين مارش."\n\nيدحرج صورة عبر المكتب. رجل في الأربعينيات، نحيل، مدبوغ الجلد. اعتُقل مرتين من قبل — سكر وإخلال بالنظام، تعدٍّ على ملكية الغير.\n\n"كل غريزة تشير إليه،" يقول الشريف. "نحتاج فقط لبناء القضية."\n\nشيء في طريقة قوله 'بناء القضية' يبدو خاطئًا.`,
    choices: [
      {
        id: 'm_sh_agree',
        en: () => 'Tell him you\'ll look into Kelvin Marsh',
        ar: () => 'أخبره أنك ستبحث في أمر كيلفين مارش',
        next: 'm_kelvin_lead',
        effects: { trust: 1 },
      },
      {
        id: 'm_sh_push',
        en: () => 'Ask him about all three suspects — not just the drifter',
        ar: () => 'اسأله عن المشتبه بهم الثلاثة — وليس المتشرد فقط',
        next: 'm_suspects_overview',
        effects: { trust: -1 },
      },
      {
        id: 'm_sh_files',
        en: () => 'Request all the evidence files and statements so far',
        ar: () => 'اطلب جميع ملفات الأدلة والإفادات حتى الآن',
        next: 'm_evidence_review',
        effects: { trust: 0 },
      },
      {
        id: 'm_sh_parents',
        en: () => 'Ignore his lead — go interview the parents first',
        ar: () => 'تجاهل خيطه — اذهب لاستجواب الوالدين أولًا',
        next: 'm_parents_interview',
        effects: { trust: -1 },
      },
    ],
  },

  // School visit
  {
    id: 'm_school_visit',
    en: () =>
      `The school principal, Mrs. Vane, is a methodical woman who gives you four minutes and her complete attention.\n\n"Lily was different that morning. She sat by the window in her homeroom — she usually sits in the front. The teacher noted it but didn't think much of it.\n\n"She also left her backpack at school. Found it in her locker. It has her lunch, her books, her pencil case. She walked OUT of school before classes — sometime in the gap between drop-off and first bell. We have no camera coverage of the side gate she would have used."\n\nIn the backpack you find a hidden pocket. Inside: a folded note.`,
    ar: () =>
      `مديرة المدرسة، السيدة فاين، امرأة منهجية تمنحك أربع دقائق وانتباهها الكامل.\n\n"ليلى كانت مختلفة في ذلك الصباح. جلست عند النافذة في فصلها — عادة تجلس في المقدمة. لاحظ المعلم ذلك لكنه لم يُفكر كثيرًا.\n\n"تركت أيضًا حقيبتها في المدرسة. وُجدت في خزانتها. فيها غداؤها، كتبها، مقلمتها. مشت إلى خارج المدرسة قبل الدراسة — في وقت ما في الفجوة بين الإيصال وأول جرس. ليس لدينا تغطية كاميرا للبوابة الجانبية التي كانت ستستخدمها."\n\nفي الحقيبة تجد جيبًا مخفيًا. بداخله: ملاحظة مطوية.`,
    choices: [
      {
        id: 'm_sv_note',
        en: () => 'Read the note immediately',
        ar: () => 'اقرأ الملاحظة فورًا',
        next: 'm_lily_note',
        effects: { clues: 1 },
      },
      {
        id: 'm_sv_teachers',
        en: () => 'Interview the homeroom teacher',
        ar: () => 'استجوب معلم الفصل',
        next: 'm_teacher_interview',
        effects: {},
      },
      {
        id: 'm_sv_side_gate',
        en: () => 'Go examine the side gate she used',
        ar: () => 'اذهب لفحص البوابة الجانبية التي استخدمتها',
        next: 'm_side_gate',
        effects: { clues: 1 },
      },
      {
        id: 'm_sv_classmates',
        en: () => 'Talk to Lily\'s classmates',
        ar: () => 'تحدث مع زملاء ليلى في الفصل',
        next: 'm_classmates',
        effects: {},
      },
    ],
  },

  // Lily's note
  {
    id: 'm_lily_note',
    en: () =>
      `The note is in a child's handwriting — careful, deliberate:\n\n"If I don't come back. I did it on purpose. I went to the lighthouse. The fishing man said he would take me somewhere safe. He is a good man. Not like uncle. Please don't tell uncle you found this. Please don't tell Sheriff. The sheriff knows uncle.\n\nI took the ferry money from the jar on mama's shelf."\n\nYour hands are steady. Your mind is not.\n\nShe left on purpose. She knew someone — "the fishing man." She was afraid of someone she calls "uncle." And she explicitly warned against telling the sheriff.`,
    ar: () =>
      `الملاحظة بخط طفل — دقيق، متعمد:\n\n"إذا لم أعد. فعلت ذلك عن قصد. ذهبت إلى المنارة. الرجل الصياد قال سيأخذني إلى مكان آمن. هو رجل طيب. ليس مثل العم. رجاءً لا تخبروا العم أنكم وجدتم هذا. رجاءً لا تخبروا الشريف. الشريف يعرف العم.\n\nأخذت أموال العبارة من البرطمان على رف ماما."`,
    choices: [
      {
        id: 'm_ln_lighthouse',
        en: () => 'Go to the lighthouse immediately',
        ar: () => 'اذهب إلى المنارة فورًا',
        next: 'm_lighthouse',
        effects: { clues: 2, knowsNote: true },
      },
      {
        id: 'm_ln_fishingman',
        en: () => 'Find the "fishing man" — ask who is known for taking ferries',
        ar: () => 'اجد "الرجل الصياد" — اسأل من المعروف أنه يأخذ عبارات',
        next: 'm_dock_inquiry',
        effects: { clues: 1, knowsNote: true },
      },
      {
        id: 'm_ln_uncle',
        en: () => 'Find out who her "uncle" is — look into the family',
        ar: () => 'اكتشف من "عمها" — ابحث في العائلة',
        next: 'm_parents_interview',
        effects: { clues: 1, knowsNote: true, waryOfSheriff: true },
      },
      {
        id: 'm_ln_hide',
        en: () => 'Pocket the note and don\'t tell the sheriff — investigate alone',
        ar: () => 'ضع الملاحظة في جيبك ولا تخبر الشريف — حقق وحدك',
        next: 'm_dock_inquiry',
        effects: { clues: 1, knowsNote: true, waryOfSheriff: true, hidingEvidence: true },
      },
    ],
  },

  // Parents interview
  {
    id: 'm_parents_interview',
    en: () =>
      `The Harrow house smells of cigarettes and synthetic lemon cleaner.\n\nMrs. Harrow — pale, sleepless — answers your questions with one-word answers until you mention "uncle." She goes still.\n\n"Which uncle?"\n\n"Who do you call uncle, Mrs. Harrow?"\n\nLong pause. "My brother-in-law. Derek Vance. He watches Lily sometimes after school."\n\n"Does Lily like him?"\n\nLonger pause. "She used to."\n\nMr. Harrow arrives and cuts the conversation short. He's larger than his wife, louder, and his handshake leaves your hand aching. "My wife is exhausted. Whatever you need, go through the sheriff."`,
    ar: () =>
      `رائحة بيت هارو: سجائر ومعطر ليمون صناعي.\n\nالسيدة هارو — شاحبة، بلا نوم — تجيب على أسئلتك بإجابات أحادية الكلمة حتى تذكر "العم." تتجمد.\n\n"أي عم؟"\n\n"من تسمونه عمًا، سيدة هارو؟"\n\nتوقف طويل. "أخو زوجي. ديريك فانس. يراقب ليلى أحيانًا بعد المدرسة."\n\n"هل تحب ليلى وجوده؟"\n\nتوقف أطول. "كانت تحبه."\n\nيصل السيد هارو ويقطع المحادثة. أضخم من زوجته، أعلى صوتًا، ومصافحته تترك يدك موجعة. "زوجتي منهكة. مهما تحتاجه، تعامل مع الشريف."`,
    choices: [
      {
        id: 'm_pi_derek',
        en: () => 'Find Derek Vance immediately',
        ar: () => 'اجد ديريك فانس فورًا',
        next: 'm_derek_vance',
        effects: { clues: 2, suspectsExamined: 1 },
      },
      {
        id: 'm_pi_note_ask',
        en: () => 'Show them Lily\'s note — get their reaction',
        ar: () => 'أرهم ملاحظة ليلى — احصل على ردة فعلهم',
        next: 'm_note_shown_parents',
        condition: (v) => v.knowsNote,
        lockedEn: 'You need to find Lily\'s note first',
        lockedAr: 'تحتاج إيجاد ملاحظة ليلى أولًا',
      },
      {
        id: 'm_pi_mr_harrow',
        en: () => 'The father is hiding something — push him harder',
        ar: () => 'الأب يخفي شيئًا — اضغط عليه أكثر',
        next: 'm_father_pressure',
        effects: { trust: -1 },
      },
      {
        id: 'm_pi_lighthouse',
        en: () => 'Go to the lighthouse without sharing what you know',
        ar: () => 'اذهب إلى المنارة دون مشاركة ما تعرفه',
        next: 'm_lighthouse',
        effects: {},
      },
    ],
  },

  // Suspects overview
  {
    id: 'm_suspects_overview',
    en: () =>
      `The sheriff reluctantly gives you all three suspects:\n\n1. **Kelvin Marsh** — drifter, passing through. No confirmed alibi for the morning Lily disappeared.\n\n2. **Warren Hollis** — Lily's teacher for after-school art class. Married, no record. "Overly attached to students" per a complaint filed last year — complaint was dismissed.\n\n3. **Derek Vance** — Lily's uncle by marriage. Local fishing boat captain. "Good man," the sheriff says quickly. Too quickly.\n\nThe sheriff's reluctance to discuss Derek Vance is noticeable.`,
    ar: () =>
      `الشريف يعطيك المشتبه بهم الثلاثة على مضض:\n\n1. **كيلفين مارش** — متشرد، عابر. لا إثبات حضور مؤكد لصباح اختفاء ليلى.\n\n2. **وارن هوليس** — معلم ليلى في فصل الفن بعد المدرسة. متزوج، لا سجل جنائي. "مرتبط بشكل مفرط بالطلاب" وفقًا لشكوى مقدمة العام الماضي — الشكوى ورُفضت.\n\n3. **ديريك فانس** — عم ليلى بالزواج. قبطان قارب صيد محلي. "رجل طيب،" يقول الشريف بسرعة. بسرعة أكبر مما ينبغي.\n\nتردد الشريف في الحديث عن ديريك فانس ملحوظ.`,
    choices: [
      {
        id: 'm_so_derek',
        en: () => 'Start with Derek Vance — the sheriff clearly doesn\'t want you near him',
        ar: () => 'ابدأ بديريك فانس — من الواضح أن الشريف لا يريدك بالقرب منه',
        next: 'm_derek_vance',
        effects: { clues: 1, waryOfSheriff: true },
      },
      {
        id: 'm_so_warren',
        en: () => 'Warren Hollis — the art teacher with the dismissed complaint',
        ar: () => 'وارن هوليس — معلم الفن ذو الشكوى المرفوضة',
        next: 'm_warren_hollis',
        effects: {},
      },
      {
        id: 'm_so_kelvin',
        en: () => 'Kelvin Marsh — follow the sheriff\'s instinct first',
        ar: () => 'كيلفين مارش — اتبع غريزة الشريف أولًا',
        next: 'm_kelvin_lead',
        effects: { trust: 1 },
      },
      {
        id: 'm_so_school',
        en: () => 'Skip suspects for now — go to the crime scene',
        ar: () => 'تجاوز المشتبه بهم الآن — اذهب إلى مسرح الجريمة',
        next: 'm_school_visit',
        effects: {},
      },
    ],
  },

  // Evidence review
  {
    id: 'm_evidence_review',
    en: () =>
      `The files include:\n\n— Three witness statements: the school crossing guard (saw Lily at 8:10, walking alone toward school), a shopkeeper (saw her near the harbor, 8:45 — much later than expected, heading toward the docks), and a fisherman who says he saw her "get into Merry's boat."\n\n— No forensic evidence. No security footage.\n\n— A note from the first responders: "Father not cooperative. Asks repeatedly whether the drifter has been charged."\n\nWho is Merry? The files don't mention anyone by that name.`,
    ar: () =>
      `الملفات تشمل:\n\n— ثلاث إفادات شهود: حارس عبور المدرسة (رأى ليلى عند 8:10، تمشي وحدها نحو المدرسة)، صاحب متجر (رآها بالقرب من الميناء، 8:45 — متأخرة بكثير عما هو متوقع، متجهة نحو الأرصفة)، وصياد يقول رآها "تدخل قارب ميري."\n\n— لا أدلة جنائية. لا كاميرات مراقبة.\n\n— ملاحظة من المستجيبين الأوائل: "الأب غير متعاون. يسأل مرارًا إذا كان المتشرد قد اعتُقل."\n\nمن ميري؟ الملفات لا تذكر أي شخص بهذا الاسم.`,
    choices: [
      {
        id: 'm_er_merry',
        en: () => 'Find Merry — ask at the docks',
        ar: () => 'اجد ميري — اسأل في الأرصفة',
        next: 'm_dock_inquiry',
        effects: { clues: 1 },
      },
      {
        id: 'm_er_shopkeeper',
        en: () => 'Reinterview the shopkeeper — key timing discrepancy',
        ar: () => 'أعد استجواب صاحب المتجر — تناقض توقيت رئيسي',
        next: 'm_shopkeeper_interview',
        effects: { clues: 1 },
      },
      {
        id: 'm_er_father',
        en: () => 'The father asks repeatedly about the drifter being charged — interview him',
        ar: () => 'الأب يسأل مرارًا عن اعتقال المتشرد — استجوبه',
        next: 'm_father_pressure',
        effects: { clues: 1 },
      },
      {
        id: 'm_er_derek',
        en: () => 'Derek Vance — no mention in files but heavy sheriff silence',
        ar: () => 'ديريك فانس — لا ذكر في الملفات لكن صمت ثقيل من الشريف',
        next: 'm_derek_vance',
        effects: { waryOfSheriff: true },
      },
    ],
  },

  // Dock inquiry — find Merry / the fishing man Lily mentioned
  {
    id: 'm_dock_inquiry',
    requiresName: 'witnessName',
    en: (v) =>
      `The docks smell of salt and diesel. You ask around. Merry — formally, Marion Reed — is a seventy-year-old woman who runs a small-boat charter service. She doesn't wait for you to identify yourself.\n\n"You're the detective. Came about Lily. Good." She sits down. "She came to me herself three weeks ago. Asked if I could take her across to the mainland on short notice. I told her she'd need an adult with her.\n\n"Then she came back the morning she went missing. Alone. Said she had a way now. Said ${v.names?.witnessName ?? 'her friend'} knew a boat captain who would do it."\n\nMerry's eyes are old and tired and not at all surprised.\n\n"I've known something was wrong with that child for months."`,
    ar: (v) =>
      `رائحة الأرصفة: ملح وديزل. تسأل حولك. ميري — رسميًا، ماريون ريد — امرأة في السبعين من عمرها تدير خدمة تأجير قوارب صغيرة. لا تنتظر أن تعرّف بنفسك.\n\n"أنت المحقق. جئت بشأن ليلى. جيد." تجلس. "جاءت إليّ وحدها قبل ثلاثة أسابيع. سألت إذا كنت أستطيع نقلها للبر الرئيسي على عجل. قلت لها ستحتاج بالغًا معها.\n\n"ثم عادت في صباح اختفائها. وحدها. قالت حصلت الآن على طريقة. قالت ${v.names?.witnessName ?? 'صديقتها'} تعرف قبطان قارب سيقبل."\n\nعينا ميري قديمتان ومتعبتان وليستا مستغربتين البتة.\n\n"كنت أعلم أن شيئًا خاطئًا مع تلك الطفلة منذ أشهر."`,
    choices: [
      {
        id: 'm_di_friend',
        en: (v) => `Ask about the friend ${v.names?.witnessName ?? 'she mentioned'}`,
        ar: (v) => `اسأل عن الصديق ${v.names?.witnessName ?? 'الذي ذكرته'}`,
        next: 'm_merry_testimony',
        effects: { clues: 2 },
      },
      {
        id: 'm_di_wrong',
        en: () => '"What do you mean you knew something was wrong?"',
        ar: () => '"ماذا تعني بأنك كنت تعرفين أن شيئًا خاطئًا؟"',
        next: 'm_merry_testimony',
        effects: { clues: 2 },
      },
      {
        id: 'm_di_captain',
        en: () => 'Ask which boat captain would take a child without clearance',
        ar: () => 'اسأل أي قبطان قارب سيأخذ طفلة بدون تصريح',
        next: 'm_boat_captain',
        effects: { clues: 1 },
      },
      {
        id: 'm_di_lighthouse',
        en: () => 'Lily\'s note mentioned the lighthouse — ask Merry about it',
        ar: () => 'ملاحظة ليلى ذكرت المنارة — اسأل ميري عنها',
        next: 'm_lighthouse',
        condition: (v) => v.knowsNote,
        lockedEn: 'You don\'t have Lily\'s note yet',
        lockedAr: 'لا تملك ملاحظة ليلى بعد',
        effects: { clues: 1 },
      },
    ],
  },

  // Merry's testimony — key reveal about Derek
  {
    id: 'm_merry_testimony',
    en: () =>
      `"Derek Vance," Merry says without hesitation. "Lily's uncle. I've seen how he looks at her. I've seen her flinch when he comes near.\n\n"I told the previous constable — eighteen months ago. Nothing happened. When this new sheriff came in, I tried again. He told me Derek is 'a pillar of this community.' Those exact words."\n\nShe spits on the dock.\n\n"Derek has money. He funds the sheriff's re-election. You don't have to be a detective to work that one out.\n\n"I'm telling you because I'm old and tired and if that child is hurt, I will not be able to live with myself for having stayed quiet."`,
    ar: () =>
      `"ديريك فانس،" تقول ميري دون تردد. "عم ليلى. رأيت كيف ينظر إليها. رأيتها تنقبض حين يقترب.\n\n"أخبرت الشرطي السابق — قبل ثمانية عشر شهرًا. لم يحدث شيء. حين جاء هذا الشريف الجديد، حاولت مجددًا. أخبرني أن ديريك 'ركيزة هذا المجتمع.' تلك الكلمات بالضبط."\n\nتبصق على الرصيف.\n\n"ديريك لديه مال. يمول إعادة انتخاب الشريف. لا تحتاج أن تكون محققًا لتفهم ذلك.\n\n"أخبرك لأنني عجوز ومتعبة وإذا أُذيت تلك الطفلة، لن أستطيع العيش مع نفسي لأنني بقيت صامتة."`,
    choices: [
      {
        id: 'm_mt_derek',
        en: () => 'Find Derek Vance immediately',
        ar: () => 'اجد ديريك فانس فورًا',
        next: 'm_derek_vance',
        effects: { clues: 2, suspectsExamined: 1, derekSuspected: true },
      },
      {
        id: 'm_mt_sheriff_confront',
        en: () => 'Confront the sheriff with this information',
        ar: () => 'واجه الشريف بهذه المعلومات',
        next: 'm_sheriff_confrontation',
        effects: { clues: 1, waryOfSheriff: true, derekSuspected: true },
      },
      {
        id: 'm_mt_lighthouse',
        en: () => 'The lighthouse — if Lily ran, she ran there',
        ar: () => 'المنارة — إذا هربت ليلى، هربت إلى هناك',
        next: 'm_lighthouse',
        effects: { clues: 1, derekSuspected: true },
      },
      {
        id: 'm_mt_friend',
        en: () => 'The boat captain Lily found — who agreed to take her?',
        ar: () => 'القبطان الذي وجدته ليلى — من وافق على أخذها؟',
        next: 'm_boat_captain',
        effects: { clues: 1, derekSuspected: true },
      },
    ],
  },

  // Derek Vance interview
  {
    id: 'm_derek_vance',
    en: () =>
      `Derek Vance meets you at the dock. He's mid-fifties, trim, with the easy confidence of someone accustomed to being respected.\n\n"Happy to help," he says immediately. "Whatever it takes to find Lily safe."\n\nHis alibi: he was on his boat all morning. Crew of two — both on his payroll. You ask about his relationship with Lily.\n\nA pause. Precise length. "She's family. I love her like my own." \n\nYou ask if she seemed afraid of anything lately.\n\nAnother precise pause. "Kids that age are afraid of everything. Growing pains."\n\nHis hands are completely still throughout the conversation. People who are actually worried move their hands.`,
    ar: () =>
      `ديريك فانس يقابلك في الرصيف. في منتصف الخمسينيات، رشيق، بثقة سهلة من اعتاد أن يُحترم.\n\n"سعيد بالمساعدة،" يقول فورًا. "أيًا كان ما يلزم لإيجاد ليلى بأمان."\n\nحجته: كان على قاربه طوال الصباح. طاقم من اثنين — كلاهما على رواتبه. تسأل عن علاقته بليلى.\n\nتوقف. مدة دقيقة. "إنها عائلة. أحبها كالملك." \n\nتسأل إذا بدت خائفة من أي شيء مؤخرًا.\n\nتوقف دقيق آخر. "الأطفال في تلك السن خائفون من كل شيء. آلام النمو."\n\nيداه ثابتتان تمامًا طوال المحادثة. الناس القلقون فعلًا يحركون أيديهم.`,
    choices: [
      {
        id: 'm_dv_crew',
        en: () => 'Interview his crew separately — verify the alibi',
        ar: () => 'استجوب طاقمه منفردًا — تحقق من الحجة',
        next: 'm_crew_alibi',
        effects: { clues: 1, suspectsExamined: 1 },
      },
      {
        id: 'm_dv_push',
        en: () => 'Push harder — ask exactly what he knows about where she went',
        ar: () => 'اضغط أكثر — اسأله بالضبط ما يعرفه عن وجهتها',
        next: 'm_derek_pushed',
        effects: { trust: -1, clues: 1 },
      },
      {
        id: 'm_dv_note',
        en: () => 'Show him Lily\'s note — see how he reacts',
        ar: () => 'أرِه ملاحظة ليلى — لاحظ ردة فعله',
        next: 'm_derek_note_reaction',
        condition: (v) => v.knowsNote,
        lockedEn: 'You need Lily\'s note first',
        lockedAr: 'تحتاج ملاحظة ليلى أولًا',
        effects: { clues: 2 },
      },
      {
        id: 'm_dv_lighthouse',
        en: () => 'Leave him for now — go to the lighthouse',
        ar: () => 'اتركه الآن — اذهب إلى المنارة',
        next: 'm_lighthouse',
        effects: {},
      },
    ],
  },

  // Crew alibi — cracks it
  {
    id: 'm_crew_alibi',
    en: () =>
      `You find the two crew members separately. The first — Tom, 28 — gives you a clean statement. Then pauses and adds: "He went ashore for about an hour. Around nine. Said it was personal. We were anchored in the cove."\n\nThe second crew member, an older man named Glen, stares at his feet when you ask the same question. "He was on the boat all morning."\n\nTom's account contradicts Glen's. Derek was not on the boat for one hour — from 8:45 to roughly 9:45. Exactly the window when the shopkeeper saw Lily at the harbor.\n\nDerek's alibi is broken.`,
    ar: () =>
      `تجد عضوَي الطاقم منفردًا. الأول — توم، 28 — يعطيك إفادة واضحة. ثم يتوقف ويضيف: "ذهب إلى الشاطئ لمدة ساعة تقريبًا. حوالي التاسعة. قال إنها شخصية. كنا راسين في الخليج."\n\nعضو الطاقم الثاني، رجل أكبر سنًا اسمه غلن، يحدق في قدميه حين تطرح السؤال نفسه. "كان على القارب طوال الصباح."\n\nرواية توم تتناقض مع رواية غلن. لم يكن ديريك على القارب لساعة — من 8:45 إلى 9:45 تقريبًا. بالضبط النافذة الزمنية حين رأى صاحب المتجر ليلى في الميناء.\n\nحجة ديريك انكسرت.`,
    choices: [
      {
        id: 'm_ca_arrest',
        en: () => 'Go to the sheriff — request Derek\'s arrest based on broken alibi',
        ar: () => 'اذهب للشريف — اطلب اعتقال ديريك بناءً على الحجة المكسورة',
        next: 'm_sheriff_derek_arrest',
        effects: { clues: 2, derekSuspected: true, alibisBroken: 1 },
      },
      {
        id: 'm_ca_more_evidence',
        en: () => 'Get more before confronting derek — go to the lighthouse',
        ar: () => 'احصل على المزيد قبل مواجهة ديريك — اذهب إلى المنارة',
        next: 'm_lighthouse',
        effects: { clues: 2, derekSuspected: true, alibisBroken: 1 },
      },
      {
        id: 'm_ca_confront_derek',
        en: () => 'Confront Derek directly with the contradiction',
        ar: () => 'واجه ديريك مباشرة بالتناقض',
        next: 'm_derek_confronted',
        effects: { clues: 1, derekSuspected: true },
      },
      {
        id: 'm_ca_tom',
        en: () => 'Press Tom — does he know WHERE Derek went ashore?',
        ar: () => 'اضغط على توم — هل يعرف إلى أين ذهب ديريك إلى الشاطئ؟',
        next: 'm_tom_further',
        effects: { clues: 2 },
      },
    ],
  },

  {
    id: 'm_tom_further',
    en: () =>
      `Tom shifts uncomfortably.\n\n"North end of the cove. There's a path up to the lighthouse from there." He meets your eyes. "I don't know what he did up there. I don't want to know. But he came back without his jacket. It was a cold morning."`,
    ar: () =>
      `توم يتحرك بانزعاج.\n\n"الطرف الشمالي من الخليج. هناك طريق يصعد إلى المنارة من هناك." يلتقي بعينيك. "لا أعرف ما الذي فعله هناك. لا أريد أن أعرف. لكنه عاد بلا معطفه. كان ذلك صباحًا باردًا."`,
    choices: [
      {
        id: 'm_tf_lighthouse',
        en: () => 'Lighthouse — now',
        ar: () => 'المنارة — الآن',
        next: 'm_lighthouse',
        effects: { clues: 2, derekSuspected: true },
      },
      {
        id: 'm_tf_jacket',
        en: () => 'Find Derek\'s jacket — it\'s evidence',
        ar: () => 'اجد معطف ديريك — إنه دليل',
        next: 'm_derek_confronted',
        effects: { clues: 2, derekSuspected: true },
      },
      {
        id: 'm_tf_sheriff',
        en: () => 'Brief the sheriff — demand backup before going to the lighthouse',
        ar: () => 'أبلغ الشريف — اطلب دعمًا قبل الذهاب إلى المنارة',
        next: 'm_sheriff_confrontation',
        effects: { clues: 1, derekSuspected: true },
      },
      {
        id: 'm_tf_alone',
        en: () => 'Go to the lighthouse alone — you don\'t trust the sheriff',
        ar: () => 'اذهب إلى المنارة وحدك — لا تثق بالشريف',
        next: 'm_lighthouse',
        effects: { clues: 2, derekSuspected: true, waryOfSheriff: true },
      },
    ],
  },

  // Derek pushed / confronted
  {
    id: 'm_derek_pushed',
    en: () =>
      `Derek's composure cracks, just slightly, when you ask him directly: "If you're so concerned about Lily's safety, why didn't you join the search party on day one?"\n\nA micro-expression. Not grief. Something calculating.\n\n"I was giving the professionals room to work."\n\n"The search party is volunteers. The whole town turned out except you."\n\nHe ends the conversation. Politely. Decisively. And the moment your back is turned, he makes a phone call.`,
    ar: () =>
      `تتشقق هدوء ديريك، قليلًا فقط، حين تسأله مباشرة: "إذا كنت قلقًا جدًا على سلامة ليلى، لماذا لم تنضم لفريق البحث في اليوم الأول؟"\n\nتعبير مصغر. ليس حزنًا. شيء محسوب.\n\n"كنت أتيح للمتخصصين مجالًا للعمل."\n\n"فريق البحث متطوعون. خرجت كل المدينة إلا أنت."\n\nينهي المحادثة. بأدب. بحسم. وفي اللحظة التي يستدير فيها ظهرك، يجري مكالمة هاتفية.`,
    choices: [
      {
        id: 'm_dp_follow',
        en: () => 'Follow him discreetly — see who he calls',
        ar: () => 'تبعه بتحفظ — اعرف من يتصل به',
        next: 'm_derek_followed',
        effects: { clues: 2 },
      },
      {
        id: 'm_dp_crew',
        en: () => 'His crew — crack the alibi now',
        ar: () => 'طاقمه — اكسر الحجة الآن',
        next: 'm_crew_alibi',
        effects: { clues: 1 },
      },
      {
        id: 'm_dp_lighthouse',
        en: () => 'Go to the lighthouse before he can warn anyone',
        ar: () => 'اذهب إلى المنارة قبل أن يتمكن من تحذير أحد',
        next: 'm_lighthouse',
        effects: { fear: 2, clues: 1, derekSuspected: true },
      },
      {
        id: 'm_dp_sheriff',
        en: () => 'Report to the sheriff — get official backup',
        ar: () => 'أبلغ الشريف — احصل على دعم رسمي',
        next: 'm_sheriff_confrontation',
        effects: { clues: 0 },
      },
    ],
  },

  {
    id: 'm_derek_followed',
    en: () =>
      `Derek walks to the far end of the dock, turns his back, and makes a call.\n\nYou're too far to hear — but you can see. His posture: commanding, not pleading. He gestures with his free hand.\n\nThe call ends. Thirty seconds later, a police cruiser pulls up.\n\nSheriff ${`[sheriff]`} gets out. He and Derek shake hands. They speak for four minutes. The sheriff glances in your direction once. Derek doesn't.\n\nWhen they both leave, you realize: if you go to the lighthouse, you're going alone, and both of them will know about it if you don't move fast.`,
    ar: () =>
      `ديريك يمشي إلى الطرف البعيد من الرصيف، يدير ظهره، ويجري مكالمة.\n\nأنت بعيد جدًا للسمع — لكن يمكنك الرؤية. وضعيته: آمر، لا يتوسل. يشير بيده الحرة.\n\nتنتهي المكالمة. بعد ثلاثين ثانية، تصل سيارة شرطة.\n\nالشريف ينزل منها. يتصافح هو وديريك. يتحدثان أربع دقائق. الشريف ينظر في اتجاهك مرة واحدة. ديريك لا ينظر.\n\nحين يغادران كلاهما، تدرك: إذا ذهبت إلى المنارة، ستذهب وحدك، وكلاهما سيعرف بذلك إذا لم تتحرك بسرعة.`,
    choices: [
      {
        id: 'm_df_go_now',
        en: () => 'Go to the lighthouse immediately — before they get there',
        ar: () => 'اذهب إلى المنارة فورًا — قبل أن يصلوا إليها',
        next: 'm_lighthouse',
        effects: { clues: 2, derekSuspected: true, waryOfSheriff: true, race: true },
      },
      {
        id: 'm_df_evidence_first',
        en: () => 'Get solid proof first — the crew testimony — then move',
        ar: () => 'احصل على دليل قاطع أولًا — شهادة الطاقم — ثم تحرك',
        next: 'm_crew_alibi',
        effects: { clues: 1, derekSuspected: true, waryOfSheriff: true },
      },
      {
        id: 'm_df_state_call',
        en: () => 'Call the state bureau — escalate over the sheriff\'s head',
        ar: () => 'اتصل بالمكتب الحكومي — صعّد فوق رأس الشريف',
        next: 'm_state_escalation',
        effects: { clues: 1, waryOfSheriff: true },
      },
      {
        id: 'm_df_merry',
        en: () => 'Get Merry to take you by boat — skip the road',
        ar: () => 'اجعل ميري تأخذك بالقارب — تجاوز الطريق',
        next: 'm_lighthouse_by_boat',
        effects: { clues: 2, derekSuspected: true, safePath: true },
      },
    ],
  },

  {
    id: 'm_derek_note_reaction',
    en: () =>
      `Derek reads Lily's note. His face remains completely neutral.\n\nFifteen seconds of reading a note written by a terrified seven-year-old who was fleeing him. No reaction.\n\nThen: "She's confused. Children misinterpret things. I've never done anything to harm Lily."\n\nHe hands the note back. His hand doesn't shake. He looks you in the eye. And you know, looking back, that he's done this before. This exact conversation. With an authority figure. And won.\n\nUntil now.`,
    ar: () =>
      `ديريك يقرأ ملاحظة ليلى. وجهه يبقى محايدًا تمامًا.\n\nخمس عشرة ثانية لقراءة ملاحظة كتبتها طفلة خائفة في السابعة كانت تفر منه. لا رد فعل.\n\nثم: "إنها مشوشة. الأطفال يسيئون فهم الأشياء. لم أفعل شيئًا لإيذاء ليلى."\n\nيعيد الملاحظة. يده لا ترتجف. ينظر إليك في العين. وأنت تعرف، حين ترد النظر، أنه فعل هذا من قبل. هذه المحادثة بالضبط. مع شخصية سلطوية. وانتصر.\n\nحتى الآن.`,
    choices: [
      {
        id: 'm_dnr_crew',
        en: () => 'Get his alibi cracked — interview the crew',
        ar: () => 'اكسر حجته — استجوب الطاقم',
        next: 'm_crew_alibi',
        effects: { clues: 2, derekSuspected: true },
      },
      {
        id: 'm_dnr_lighthouse',
        en: () => 'Go to the lighthouse — find Lily before he can',
        ar: () => 'اذهب إلى المنارة — اجد ليلى قبله',
        next: 'm_lighthouse',
        effects: { clues: 1, derekSuspected: true, race: true },
      },
      {
        id: 'm_dnr_state',
        en: () => 'Call state officials — escalate now',
        ar: () => 'اتصل بمسؤولين حكوميين — صعّد الآن',
        next: 'm_state_escalation',
        effects: { clues: 1, derekSuspected: true },
      },
      {
        id: 'm_dnr_warren',
        en: () => 'Leave Derek — check the other suspects first',
        ar: () => 'اترك ديريك — تحقق من المشتبه بهم الآخرين أولًا',
        next: 'm_warren_hollis',
        effects: {},
      },
    ],
  },

  {
    id: 'm_derek_confronted',
    en: () =>
      `You confront him at the docks — alone. You lay out everything. The broken alibi. The missing hour. The jacket.\n\nDerek's face goes empty.\n\n"You've made serious accusations against a respected member of this community," he says. "The sheriff will hear about this."\n\n"I'm sure he will. You were both just talking."\n\nHis jaw tightens.\n\nThen he does something unexpected: he walks away. Directly toward his boat. He starts the engine.`,
    ar: () =>
      `تواجهه في الأرصفة — وحدك. تضع كل شيء على الطاولة. الحجة المكسورة. الساعة المفقودة. المعطف.\n\nيصبح وجه ديريك فارغًا.\n\n"لقد قدمت اتهامات خطيرة ضد عضو محترم في هذا المجتمع،" يقول. "الشريف سيسمع عن هذا."\n\n"أنا متأكد من ذلك. لقد كنتما تتحدثان للتو."\n\nفكّه يتشدد.\n\nثم يفعل شيئًا غير متوقع: يبتعد مشيًا. مباشرة نحو قاربه. يشغّل المحرك.`,
    choices: [
      {
        id: 'm_dc_stop',
        en: () => 'Try to stop him from leaving',
        ar: () => 'حاول منعه من المغادرة',
        next: 'm_derek_flees',
        effects: { fear: 2, derekSuspected: true },
      },
      {
        id: 'm_dc_let_go',
        en: () => 'Let him go — get help first',
        ar: () => 'اتركه يذهب — احصل على مساعدة أولًا',
        next: 'm_state_escalation',
        effects: { derekSuspected: true },
      },
      {
        id: 'm_dc_lighthouse',
        en: () => 'He\'s heading for the lighthouse — get there first by road',
        ar: () => 'إنه يتجه نحو المنارة — اصل إليها أولًا عبر الطريق',
        next: 'm_lighthouse',
        effects: { race: true, derekSuspected: true },
      },
      {
        id: 'm_dc_merry',
        en: () => 'Get Merry\'s boat — beat him there',
        ar: () => 'احصل على قارب ميري — تقدمه إلى هناك',
        next: 'm_lighthouse_by_boat',
        effects: { race: true, derekSuspected: true, safePath: true },
      },
    ],
  },

  {
    id: 'm_derek_flees',
    en: () =>
      `He doesn't stop. He looks back once as the boat pulls away from the dock, and his expression is not afraid.\n\nIt's relieved.\n\nHe thought you knew more than you did. He fled because you'd found enough.\n\nNow you need to find Lily before he does.`,
    ar: () =>
      `لا يتوقف. ينظر مرة واحدة خلفه وهو يبتعد بالقارب عن الرصيف، وتعبير وجهه ليس خوفًا.\n\nإنه ارتياح.\n\nاعتقد أنك تعرف أكثر مما تعرف. فرّ لأنك وجدت ما يكفي.\n\nالآن تحتاج إيجاد ليلى قبله.`,
    choices: [
      {
        id: 'm_dfl_merry',
        en: () => 'Get Merry\'s boat immediately',
        ar: () => 'احصل على قارب ميري فورًا',
        next: 'm_lighthouse_by_boat',
        effects: { race: true },
      },
      {
        id: 'm_dfl_road',
        en: () => 'The lighthouse road is faster — drive',
        ar: () => 'طريق المنارة أسرع — سق',
        next: 'm_lighthouse',
        effects: { race: true },
      },
      {
        id: 'm_dfl_state',
        en: () => 'Call state police — you need backup',
        ar: () => 'اتصل بشرطة الولاية — تحتاج دعمًا',
        next: 'm_state_escalation',
        effects: { race: false },
      },
      {
        id: 'm_dfl_sheriff',
        en: () => 'You have no choice — tell the sheriff Derek has fled',
        ar: () => 'ليس لديك خيار — أخبر الشريف أن ديريك فرّ',
        next: 'm_sheriff_confrontation',
        effects: { race: false },
      },
    ],
  },

  // Warren Hollis investigation
  {
    id: 'm_warren_hollis',
    en: () =>
      `Warren Hollis teaches art at the elementary school. He's thin, soft-spoken, nervous in the way that comes from actually being questioned by police — not the calm of guilt.\n\n"I know how it looks," he says. "The complaint last year. But that was a misunderstanding. A parent saw me comfort a student who was crying and assumed the worst."\n\nHe has photos — school photos — taken with Lily and the full class. He's clearly in them, always with other people present, never alone with her.\n\n"Lily arrived at school her last day. I saw her. She was quiet. That's all I know."`,
    ar: () =>
      `وارن هوليس يعلّم الفن في المدرسة الابتدائية. نحيل، هادئ الصوت، عصبي بالطريقة التي تأتي من الاستجواب الفعلي من الشرطة — لا برودة الذنب.\n\n"أعرف كيف يبدو الأمر،" يقول. "الشكوى العام الماضي. لكن كان ذلك سوء فهم. رأى أحد الآباء كيف أهدّئ طالبًا يبكي وافترض الأسوأ."\n\nلديه صور — صور مدرسية — التُقطت مع ليلى والفصل كاملًا. إنه في الصور بوضوح، دائمًا مع حضور أشخاص آخرين، لا يكون وحده معها أبدًا.\n\n"ليلى وصلت إلى المدرسة في آخر يوم لها. رأيتها. كانت صامتة. هذا كل ما أعرفه."`,
    choices: [
      {
        id: 'm_wh_clear',
        en: () => 'Warren appears innocent — clear him and focus on Derek',
        ar: () => 'وارن يبدو بريئًا — أبرئه وركز على ديريك',
        next: 'm_derek_vance',
        effects: { suspectsExamined: 1, warrenCleared: true },
      },
      {
        id: 'm_wh_quiet',
        en: () => '"Lily was quiet." Did she say anything to him that morning?',
        ar: () => '"ليلى كانت صامتة." هل قالت له شيئًا ذلك الصباح؟',
        next: 'm_warren_lily_convo',
        effects: { clues: 1 },
      },
      {
        id: 'm_wh_check_complaint',
        en: () => 'Look into the complaint that was dismissed — verify his story',
        ar: () => 'تحقق من الشكوى التي رُفضت — تحقق من روايته',
        next: 'm_complaint_check',
        effects: {},
      },
      {
        id: 'm_wh_kelvin',
        en: () => 'Leave Warren — check the drifter next',
        ar: () => 'اترك وارن — تحقق من المتشرد بعد ذلك',
        next: 'm_kelvin_lead',
        effects: {},
      },
    ],
  },

  {
    id: 'm_warren_lily_convo',
    en: () =>
      `Warren thinks carefully.\n\n"She came to me. At my classroom door, early — before other students arrived. She asked me something strange. She asked if I knew any teachers on the mainland who worked with children who needed help.\n\n"I didn't understand. I said yes, I had a colleague at a school two ferries over — Dr. Anna Marsh. I gave Lily the name without thinking. I thought she was asking for a class project."\n\nAnna Marsh. Dr. Anna Marsh.\n\nKelvin Marsh — the drifter the sheriff wants to blame — shares a surname with a child services contact that Lily was specifically seeking out.`,
    ar: () =>
      `وارن يفكر بعناية.\n\n"جاءت إليّ. عند باب فصلي، مبكرًا — قبل وصول الطلاب الآخرين. سألتني شيئًا غريبًا. سألت إذا كنت أعرف معلمين في البر الرئيسي يعمل مع الأطفال الذين يحتاجون مساعدة.\n\n"لم أفهم. قلت نعم، لديّ زميل في مدرسة ما وراء عبارتين — الدكتورة آنا مارش. أعطيت ليلى الاسم دون تفكير. ظننت تسأل عن مشروع فصل."\n\nآنا مارش. الدكتورة آنا مارش.\n\nكيلفين مارش — المتشرد الذي يريد الشريف إلقاء اللوم عليه — يتشارك لقبًا مع جهة اتصال لخدمات الأطفال كانت ليلى تسعى تحديدًا للوصول إليها.`,
    choices: [
      {
        id: 'm_wlc_dr_marsh',
        en: () => 'Find Dr. Anna Marsh — she may know where Lily went',
        ar: () => 'اجد الدكتورة آنا مارش — ربما تعرف أين ذهبت ليلى',
        next: 'm_dr_marsh',
        effects: { clues: 3, warrenCleared: true },
      },
      {
        id: 'm_wlc_kelvin',
        en: () => 'Kelvin Marsh — is he related to Dr. Marsh? He\'s been trying to help, not harm',
        ar: () => 'كيلفين مارش — هل هو قريب من الدكتورة مارش؟ ربما كان يحاول المساعدة لا الضرر',
        next: 'm_kelvin_reveal',
        effects: { clues: 3, warrenCleared: true },
      },
      {
        id: 'm_wlc_lighthouse',
        en: () => 'Lily\'s note says lighthouse — she was on her way somewhere specific',
        ar: () => 'ملاحظة ليلى تذكر المنارة — كانت في طريقها إلى مكان محدد',
        next: 'm_lighthouse',
        condition: (v) => v.knowsNote,
        lockedEn: 'You don\'t have Lily\'s note yet',
        lockedAr: 'لا تملك ملاحظة ليلى بعد',
        effects: { clues: 2, warrenCleared: true },
      },
      {
        id: 'm_wlc_derek',
        en: () => 'Derek is still the priority — go find him',
        ar: () => 'ديريك لا يزال الأولوية — اذهب لإيجاده',
        next: 'm_derek_vance',
        effects: { clues: 1, warrenCleared: true },
      },
    ],
  },

  // Kelvin lead and reveal
  {
    id: 'm_kelvin_lead',
    en: () =>
      `Kelvin Marsh is being held in the local station. He sits across from you with the tired calm of someone who's been wrongly questioned before.\n\nHe's cooperative. No attorney requested. No defensiveness.\n\n"I know why I'm here," he says. "I was at the harbor that morning. I helped a little girl." He holds your gaze. "I didn't hurt her. I helped her."`,
    ar: () =>
      `كيلفين مارش محتجز في المركز المحلي. يجلس أمامك بهدوء مرهق من شخص جرت استجوابه ظلمًا من قبل.\n\nهو متعاون. لم يطلب محامٍ. لا دفاعية.\n\n"أعرف لماذا أنا هنا،" يقول. "كنت في الميناء ذلك الصباح. ساعدت فتاة صغيرة." يبقي نظره في عينيك. "لم أؤذها. ساعدتها."`,
    choices: [
      {
        id: 'm_kl_believe',
        en: () => '"Tell me exactly what happened."',
        ar: () => '"أخبرني بالضبط ما حدث."',
        next: 'm_kelvin_reveal',
        effects: { clues: 2 },
      },
      {
        id: 'm_kl_dr_marsh',
        en: () => '"Are you related to Dr. Anna Marsh?"',
        ar: () => '"هل أنت قريب من الدكتورة آنا مارش؟"',
        next: 'm_kelvin_reveal',
        effects: { clues: 2 },
      },
      {
        id: 'm_kl_disbelieve',
        en: () => '"That\'s what they all say. Your alibi?"',
        ar: () => '"هذا ما يقوله الجميع. حجتك؟"',
        next: 'm_kelvin_wrong_path',
        effects: { trust: 1 },
      },
      {
        id: 'm_kl_leave',
        en: () => 'Leave Kelvin for now — find more evidence first',
        ar: () => 'اترك كيلفين الآن — اجد مزيدًا من الأدلة أولًا',
        next: 'm_suspects_overview',
        effects: {},
      },
    ],
  },

  {
    id: 'm_kelvin_reveal',
    en: () =>
      `Kelvin exhales.\n\n"Dr. Anna Marsh is my sister. She runs a children's crisis center on the mainland. She called me three weeks ago — said she'd been contacted by a child in Greyvale through an anonymous tip line. The child described her situation.\n\n"Anna couldn't come herself. She asked me to go to Greyvale and make contact. Find the child, get her details, coordinate an extraction.\n\n"I found Lily at the harbor that morning. She'd come on her own. She was ready to go. I put her on a ferry to the mainland — to Anna.\n\n"She should already be safe."`,
    ar: () =>
      `كيلفين يزفر.\n\n"الدكتورة آنا مارش أختي. تدير مركز أزمات أطفال في البر الرئيسي. اتصلت بي منذ ثلاثة أسابيع — قالت تواصل معها طفلة من غرايفيل عبر خط نجدة مجهول. الطفلة وصفت وضعها.\n\n"آنا لم تتمكن من المجيء بنفسها. طلبت مني الذهاب إلى غرايفيل وإقامة تواصل. إيجاد الطفلة، الحصول على تفاصيلها، تنسيق الإخراج.\n\n"وجدت ليلى في الميناء ذلك الصباح. جاءت بمفردها. كانت جاهزة للذهاب. أركبتها عبارة إلى البر الرئيسي — إلى آنا.\n\n"يجب أن تكون بأمان بالفعل."`,
    choices: [
      {
        id: 'm_kr_verify',
        en: () => 'Verify immediately — call Dr. Anna Marsh',
        ar: () => 'تحقق فورًا — اتصل بالدكتورة آنا مارش',
        next: 'm_lily_confirmed_safe',
        effects: { clues: 3, kelvinCleared: true },
      },
      {
        id: 'm_kr_derek',
        en: () => 'If Lily is safe, now deal with Derek — arrest him',
        ar: () => 'إذا كانت ليلى بأمان، الآن تعامل مع ديريك — اعتقله',
        next: 'm_derek_arrest',
        effects: { clues: 2, kelvinCleared: true, derekSuspected: true },
      },
      {
        id: 'm_kr_sheriff',
        en: () => 'Tell the sheriff — this requires official coordination',
        ar: () => 'أخبر الشريف — هذا يتطلب تنسيقًا رسميًا',
        next: 'm_sheriff_confrontation',
        effects: { clues: 1, kelvinCleared: true },
      },
      {
        id: 'm_kr_still_doubt',
        en: () => 'You can\'t be sure — this could be a cover story. Demand proof.',
        ar: () => 'لا يمكنك التأكد — قد تكون رواية لتغطية. اطلب دليلًا.',
        next: 'm_kelvin_proof',
        effects: {},
      },
    ],
  },

  {
    id: 'm_kelvin_wrong_path',
    en: () =>
      `You push Kelvin. His alibi crumbles under your pressure — or rather, you misinterpret inconsistencies as guilt when they're just the normal confusion of a man who's afraid of being wrongly convicted.\n\nYou recommend his formal arrest.\n\nWhile you process paperwork, Derek Vance slips out of town on his boat. The real truth about Lily is never uncovered from official channels.\n\nA week later: Lily is found. She had reached the mainland safely — through Kelvin's help. But Derek faces no investigation. He sends flowers to the police station.\n\nYou arrested the wrong man.`,
    ar: () =>
      `تضغط على كيلفين. حجته تنهار تحت ضغطك — أو بالأحرى، تفسر التناقضات كذنب في حين أنها مجرد ارتباك طبيعي من رجل خائف من الإدانة الظالمة.\n\nتوصي باعتقاله الرسمي.\n\nبينما تعالج الأوراق، يتسلل ديريك فانس من المدينة على قاربه. لا تُكشف الحقيقة الحقيقية عن ليلى من القنوات الرسمية.\n\nبعد أسبوع: تُوجد ليلى. كانت وصلت للبر الرئيسي بأمان — بمساعدة كيلفين. لكن ديريك لا يواجه أي تحقيق. يرسل الزهور إلى مركز الشرطة.\n\nاعتقلت الرجل الخطأ.`,
    isEnding: true,
    endingType: 'failure',
  },

  // Sheriff confrontation
  {
    id: 'm_sheriff_confrontation',
    en: (v) =>
      `You walk into ${v.names?.sheriffName ?? 'the sheriff'}'s office and lay everything on the desk. The crew testimony. The broken alibi. Merry's decades of observation. Lily's note.\n\n${v.names?.sheriffName ?? 'The sheriff'}'s face goes through several expressions very quickly — surprise, assessment, decision.\n\n"These are serious allegations. I'll need time to—"\n\n"There is no time. Derek Vance may be destroying evidence right now. I need you to authorize an immediate warrant."\n\nA long pause. He looks at you. Then at the note.\n\n"Derek Vance has been a supporter of this department for—"\n\n"Sheriff." You put your badge on his desk. "I'll call the state bureau in the next ten minutes. You can be on the right side of this or the wrong side."`,
    ar: (v) =>
      `تدخل مكتب ${v.names?.sheriffName ?? 'الشريف'} وتضع كل شيء على المكتب. شهادة الطاقم. الحجة المكسورة. ملاحظات ميري على مدى عقود. ملاحظة ليلى.\n\nيمر وجه ${v.names?.sheriffName ?? 'الشريف'} بعدة تعبيرات بسرعة — مفاجأة، تقييم، قرار.\n\n"هذه اتهامات خطيرة. سأحتاج وقتًا لـ—"\n\n"لا وقت. ديريك فانس ربما يدمر الأدلة الآن. أحتاج منك تفويضًا بمذكرة فورية."\n\nتوقف طويل. ينظر إليك. ثم إلى الملاحظة.\n\n"ديريك فانس كان داعمًا لهذا القسم منذ—"\n\n"شريف." تضع شارتك على مكتبه. "سأتصل بالمكتب الحكومي في العشر دقائق القادمة. يمكنك أن تكون على الجانب الصحيح من هذا أو على الجانب الخاطئ."`,
    choices: [
      {
        id: 'm_sc_issue_warrant',
        en: () => 'The sheriff issues the warrant — Derek is arrested',
        ar: () => 'الشريف يصدر المذكرة — يُعتقل ديريك',
        next: 'm_derek_arrest',
        effects: { trust: 2, derekSuspected: true },
      },
      {
        id: 'm_sc_refuses',
        en: () => 'The sheriff refuses — escalate to state',
        ar: () => 'الشريف يرفض — صعّد إلى الولاية',
        next: 'm_state_escalation',
        effects: { trust: -2, waryOfSheriff: true },
      },
      {
        id: 'm_sc_lighthouse',
        en: () => 'Don\'t wait for the warrant — go to the lighthouse yourself',
        ar: () => 'لا تنتظر المذكرة — اذهب إلى المنارة بنفسك',
        next: 'm_lighthouse',
        effects: { race: true },
      },
      {
        id: 'm_sc_merry',
        en: () => 'Take Merry by boat — bypass the sheriff entirely',
        ar: () => 'خذ ميري بالقارب — تجاوز الشريف كليًا',
        next: 'm_lighthouse_by_boat',
        effects: { safePath: true },
      },
    ],
  },

  {
    id: 'm_sheriff_derek_arrest',
    en: (v) =>
      `You present the broken alibi to ${v.names?.sheriffName ?? 'the sheriff'}. It takes three minutes to explain. It takes another five for him to process what it means.\n\nThen: "If this checks out, we need to move now."\n\nYou weren't expecting agreement. His face is pale. He's calculating something — yes, betrayal of his backer, or being caught later as complicit. He chooses the right thing. Barely.`,
    ar: (v) =>
      `تعرض الحجة المكسورة على ${v.names?.sheriffName ?? 'الشريف'}. تستغرق ثلاث دقائق للشرح. وخمس دقائق أخرى ليعالج المعنى.\n\nثم: "إذا تبيّن صحة هذا، علينا التحرك الآن."\n\nلم تكن تتوقع الموافقة. وجهه شاحب. يحسب شيئًا — نعم، خيانة داعمه، أو الإمساك به لاحقًا كمتواطئ. يختار الشيء الصحيح. بالكاد.`,
    choices: [
      {
        id: 'm_sda_arrest',
        en: () => 'Move together to arrest Derek',
        ar: () => 'تحركوا معًا لاعتقال ديريك',
        next: 'm_derek_arrest',
        effects: { trust: 1 },
      },
      {
        id: 'm_sda_lighthouse',
        en: () => 'Derek may have gone to the lighthouse — get there first',
        ar: () => 'ربما ذهب ديريك إلى المنارة — اصل إليها أولًا',
        next: 'm_lighthouse',
        effects: { race: true },
      },
      {
        id: 'm_sda_lily',
        en: () => 'Find Lily before worrying about Derek',
        ar: () => 'اجد ليلى قبل القلق بشأن ديريك',
        next: 'm_lily_confirmed_safe',
        effects: {},
      },
      {
        id: 'm_sda_merry',
        en: () => 'Take Merry\'s boat — faster than the road',
        ar: () => 'خذ قارب ميري — أسرع من الطريق',
        next: 'm_lighthouse_by_boat',
        effects: { safePath: true },
      },
    ],
  },

  {
    id: 'm_state_escalation',
    en: () =>
      `You call the state detective bureau. Your supervisor listens without interrupting.\n\n"We'll dispatch two agents by the morning ferry. In the meantime, don't let Derek Vance leave town. Is the local sheriff cooperative?"\n\nYou pause. "Partially."\n\n"Understood. Don't share more than necessary with him. Can you secure evidence and locate the missing child before morning?"\n\nYou look at your watch. Six hours until the ferry.`,
    ar: () =>
      `تتصل بمكتب المحققين الحكوميين. مشرفك يستمع دون مقاطعة.\n\n"سنرسل عميلين بعبارة الصباح. في هذه الأثناء، لا تدع ديريك فانس يغادر المدينة. هل الشريف المحلي متعاون؟"\n\nتتوقف. "جزئيًا."\n\n"مفهوم. لا تشارك أكثر مما يلزم معه. هل يمكنك تأمين الأدلة وتحديد موقع الطفلة المفقودة قبل الصباح؟"\n\nتنظر إلى ساعتك. ست ساعات حتى العبارة.`,
    choices: [
      {
        id: 'm_se_lighthouse',
        en: () => 'Go to the lighthouse now — find Lily',
        ar: () => 'اذهب إلى المنارة الآن — اجد ليلى',
        next: 'm_lighthouse',
        effects: { race: false },
      },
      {
        id: 'm_se_merry',
        en: () => 'Take Merry\'s boat — it\'s faster',
        ar: () => 'خذ قارب ميري — إنه أسرع',
        next: 'm_lighthouse_by_boat',
        effects: { safePath: true },
      },
      {
        id: 'm_se_derek',
        en: () => 'Find Derek first — keep him from destroying evidence',
        ar: () => 'اجد ديريك أولًا — ابقه من تدمير الأدلة',
        next: 'm_derek_confronted',
        effects: {},
      },
      {
        id: 'm_se_kelvin',
        en: () => 'Check on Kelvin Marsh — the state needs to know he may be innocent',
        ar: () => 'تحقق من كيلفين مارش — الولاية تحتاج معرفة أنه قد يكون بريئًا',
        next: 'm_kelvin_lead',
        effects: {},
      },
    ],
  },

  // Lighthouse scenes
  {
    id: 'm_lighthouse',
    en: () =>
      `The road to the lighthouse is single-lane, cliffside. The sea below is loud and grey. You're alone out here.\n\nThe lighthouse is unmanned — decommissioned two years ago. Its lower level has been broken into. Recent footprints in the dust. Small ones.\n\nAnd larger ones. Overlapping hers. Recent. Someone else was here.\n\nUpstairs, through the iron stairs, you find a makeshift shelter. A sleeping bag. Empty food wrappers. A backpack — pink, with sticker constellations. Lily's.\n\nShe was here. Maybe recently. Where is she now?`,
    ar: () =>
      `الطريق إلى المنارة في خط واحد، جانب المنحدر. البحر في الأسفل صاخب ورمادي. أنت وحدك هنا.\n\nالمنارة بلا موظفين — أُغلقت قبل عامين. مستواها السفلي اقتُحم. آثار أقدام حديثة في الغبار. أقدام صغيرة.\n\nوأقدام أكبر. تتداخل مع أقدامها. حديثة. كان شخص آخر هنا.\n\nفي الأعلى، عبر الدرج الحديدي، تجد ملجأً مؤقتًا. كيس نوم. أغلفة طعام فارغة. حقيبة ظهر — وردية، مع ملصقات كوكبية. حقيبة ليلى.\n\nكانت هنا. ربما مؤخرًا. أين هي الآن؟`,
    choices: [
      {
        id: 'm_lh_search',
        en: () => 'Search the lighthouse and surrounding area for her',
        ar: () => 'فتش المنارة والمنطقة المحيطة للبحث عنها',
        next: 'm_lighthouse_search',
        effects: { clues: 2 },
      },
      {
        id: 'm_lh_large_prints',
        en: () => 'The large overlapping footprints — who else was here?',
        ar: () => 'الأقدام الكبيرة المتداخلة — من آخر كان هنا؟',
        next: 'm_lighthouse_threat',
        effects: { clues: 2, race: true },
      },
      {
        id: 'm_lh_backpack',
        en: () => 'Search the backpack — she may have left more clues',
        ar: () => 'فتش الحقيبة — ربما تركت ليلى المزيد من الخيوط',
        next: 'm_lily_backpack',
        effects: { clues: 1 },
      },
      {
        id: 'm_lh_call',
        en: () => 'Call Merry — she may know another place Lily would have gone',
        ar: () => 'اتصل بميري — ربما تعرف مكانًا آخر كانت ستذهب إليه ليلى',
        next: 'm_lily_location_merry',
        effects: {},
      },
    ],
  },

  {
    id: 'm_lighthouse_by_boat',
    en: () =>
      `Merry's boat cuts through the grey water. The lighthouse grows from the clifftop as you approach.\n\nYou arrive by the seaward entrance — a rusty ladder bolted to the rock. You climb.\n\nThe lighthouse is empty. But recently occupied. A sleeping bag, food wrappers, sticker constellations on a pink backpack.\n\n"She was here," Merry says. "But the large prints — those are men's shoes. Someone found her."`,
    ar: () =>
      `قارب ميري يقطع الماء الرمادي. المنارة تكبر فوق قمة المنحدر حين تقترب.\n\nتصل من مدخل جانب البحر — سلم صدئ ثابت في الصخرة. تتسلق.\n\nالمنارة فارغة. لكن مسكونة حديثًا. كيس نوم، أغلفة طعام، ملصقات كوكبية على حقيبة وردية.\n\n"كانت هنا،" تقول ميري. "لكن الأقدام الكبيرة — تلك حذاء رجل. شخص ما وجدها."`,
    choices: [
      {
        id: 'm_lbb_search',
        en: () => 'Search the whole area — she can\'t be far',
        ar: () => 'فتش المنطقة كاملة — لا يمكن أن تكون بعيدة',
        next: 'm_lighthouse_search',
        effects: { clues: 2, safePath: true },
      },
      {
        id: 'm_lbb_backpack',
        en: () => 'Check the backpack thoroughly',
        ar: () => 'تحقق من الحقيبة بدقة',
        next: 'm_lily_backpack',
        effects: { clues: 2, safePath: true },
      },
      {
        id: 'm_lbb_derek',
        en: () => 'Derek\'s boat — is it here?',
        ar: () => 'قارب ديريك — هل هو هنا؟',
        next: 'm_lighthouse_threat',
        effects: { clues: 2, race: true, safePath: true },
      },
      {
        id: 'm_lbb_kelvin',
        en: () => 'Could the "man\'s prints" be Kelvin Marsh — who helped her?',
        ar: () => 'هل يمكن أن تكون "الأقدام الكبيرة" لكيلفين مارش — الذي ساعدها؟',
        next: 'm_kelvin_lead',
        effects: { clues: 1 },
      },
    ],
  },

  {
    id: 'm_lighthouse_search',
    en: (v) =>
      `You search methodically. Around the lighthouse. Down toward the cliff path.\n\nYou find her in a cave at the cliff base — a natural shelter, dry, with a clear line of sight to the sea. She's sitting wrapped in a thermal blanket, a ferry ticket in her hand.\n\nShe's not hurt. She's calm. When she sees you, she assesses you the way only children and very old people can — completely, in a second.\n\n"Are you the detective?" she asks.\n\n${v.knowsNote ? '"I found your note," you say. She nods slowly.' : '"I am," you say.'}\n\nShe's been waiting. She was never lost. She was hiding.`,
    ar: (v) =>
      `تفتش بشكل منهجي. حول المنارة. نزولًا نحو درب المنحدر.\n\nتجدها في كهف عند قاعدة المنحدر — ملجأ طبيعي، جاف، بخط رؤية واضح للبحر. تجلس مُغطاة ببطانية حرارية، تذكرة عبارة في يدها.\n\nلم تُصب. هي هادئة. حين ترى، تقيّمك الطريقة التي يستطيع الأطفال وكبار السن وحدهم — بالكامل، في ثانية واحدة.\n\n"هل أنت المحقق؟" تسأل.\n\n${v.knowsNote ? '"وجدت ملاحظتك،" تقول. تومئ ببطء.' : '"نعم،" تقول.'}\n\nكانت تنتظر. لم تكن ضائعة أبدًا. كانت تختبئ.`,
    choices: [
      {
        id: 'm_ls_lily_talk',
        en: () => 'Let her tell you everything — don\'t rush her',
        ar: () => 'دعها تخبرك بكل شيء — لا تستعجلها',
        next: 'm_lily_testimony',
        effects: { clues: 3 },
      },
      {
        id: 'm_ls_safe_first',
        en: () => 'Get her to Merry\'s boat first — get her safe before anything else',
        ar: () => 'خذها إلى قارب ميري أولًا — أمّنها قبل أي شيء',
        next: 'm_lily_safe',
        effects: {},
      },
      {
        id: 'm_ls_derek',
        en: () => 'Derek may be coming — you can\'t stay here',
        ar: () => 'ديريك ربما قادم — لا يمكنك البقاء هنا',
        next: 'm_lily_race',
        effects: { race: true },
      },
      {
        id: 'm_ls_ask_kelvin',
        en: () => '"Did a man named Kelvin help you?" — verify his story',
        ar: () => '"هل ساعدك رجل اسمه كيلفين؟" — تحقق من روايته',
        next: 'm_lily_confirms_kelvin',
        effects: { clues: 1 },
      },
    ],
  },

  {
    id: 'm_lighthouse_threat',
    en: () =>
      `You follow the larger footprints. They lead down from the lighthouse, along the cliff path, to a dock on the far side — where Derek Vance's boat is moored.\n\nHe's here. He found the shelter. And the backpack is now empty — he's taken whatever Lily left behind.\n\nThen you hear it: voices from the cliff path below. A child's. And a man's, low, commanding.`,
    ar: () =>
      `تتبع الأقدام الكبيرة. تمتد نزولًا من المنارة، على طول درب المنحدر، إلى رصيف على الجانب البعيد — حيث يرسو قارب ديريك فانس.\n\nإنه هنا. وجد الملجأ. والحقيبة فارغة الآن — أخذ كل ما تركته ليلى خلفها.\n\nثم تسمعه: أصوات من درب المنحدر في الأسفل. صوت طفلة. ورجل، منخفض، آمر.`,
    choices: [
      {
        id: 'm_lt_rush',
        en: () => 'Rush toward the voices',
        ar: () => 'اندفع نحو الأصوات',
        next: 'm_confrontation_dangerous',
        effects: { fear: 3 },
      },
      {
        id: 'm_lt_careful',
        en: () => 'Move carefully — approach without being heard',
        ar: () => 'تحرك بحذر — اقترب دون أن تُسمع',
        next: 'm_confrontation_tactical',
        effects: { fear: 1 },
      },
      {
        id: 'm_lt_call',
        en: () => 'Call for backup immediately before engaging',
        ar: () => 'اطلب دعمًا فورًا قبل الانخراط',
        next: 'm_confrontation_backed',
        effects: {},
      },
      {
        id: 'm_lt_distract',
        en: () => 'Create a distraction — draw Derek away from Lily',
        ar: () => 'أوجد إلهاءً — اجذب ديريك بعيدًا عن ليلى',
        next: 'm_confrontation_tactical',
        effects: { fear: 1 },
      },
    ],
  },

  {
    id: 'm_lily_backpack',
    en: () =>
      `The backpack contains:\n— Three days of non-perishable food, carefully rationed.\n— A notebook. On the first page, in child's writing: "EVIDENCE AGAINST UNCLE DEREK."\n— A list of dates and incidents — a child's painstaking record, spanning eight months, of what her uncle had been doing.\n— A drawing. A lighthouse. Below it, in the same careful handwriting: "MERRY KNOWS WHERE I AM."\n\nLily Harrow was not a victim who was found. She is a seven-year-old who built herself a case and executed a plan.`,
    ar: () =>
      `الحقيبة تحتوي:\n— ثلاثة أيام من الطعام غير القابل للتلف، مُقسَّم بعناية.\n— دفتر. في الصفحة الأولى، بخط طفل: "أدلة ضد عم ديريك."\n— قائمة تواريخ وحوادث — سجل دقيق لطفل، يمتد ثمانية أشهر، لما كان عمها يفعله.\n— رسم. منارة. أسفله، بنفس الخط الدقيق: "ميري تعرف أين أنا."\n\nليلى هارو لم تكن ضحية عُثر عليها. إنها طفلة في السابعة بنت قضيتها ونفّذت خطة.`,
    choices: [
      {
        id: 'm_lb_notebook',
        en: () => 'The notebook is evidence — secure it and find Lily',
        ar: () => 'الدفتر دليل — أمّنه واجد ليلى',
        next: 'm_lighthouse_search',
        effects: { clues: 3, hasNotebook: true },
      },
      {
        id: 'm_lb_merry',
        en: () => '"Merry knows where I am" — call Merry immediately',
        ar: () => '"ميري تعرف أين أنا" — اتصل بميري فورًا',
        next: 'm_lily_location_merry',
        effects: { clues: 2, hasNotebook: true },
      },
      {
        id: 'm_lb_derek',
        en: () => 'The large footprints — Derek was here — find him first',
        ar: () => 'الأقدام الكبيرة — كان ديريك هنا — اجده أولًا',
        next: 'm_lighthouse_threat',
        effects: { clues: 2, hasNotebook: true },
      },
      {
        id: 'm_lb_arrest',
        en: () => 'You have enough — call for Derek\'s immediate arrest',
        ar: () => 'لديك ما يكفي — اطلب اعتقال ديريك الفوري',
        next: 'm_derek_arrest',
        effects: { clues: 3, hasNotebook: true, derekSuspected: true },
      },
    ],
  },

  {
    id: 'm_lily_location_merry',
    en: () =>
      `Merry picks up on the first ring.\n\n"The cave," she says immediately. "I showed her that cave myself. Safe from tide, hidden from the road. She asked me about it last week. Said she needed to know a safe place."\n\nShe pauses.\n\n"I should have asked more questions."`,
    ar: () =>
      `ميري ترد من الرنة الأولى.\n\n"الكهف،" تقول فورًا. "أريتها ذلك الكهف بنفسي. آمن من المد والجزر، مخفي عن الطريق. سألتني عنه الأسبوع الماضي. قالت تحتاج معرفة مكان آمن."\n\nتتوقف.\n\n"كان يجب أن أطرح المزيد من الأسئلة."`,
    choices: [
      {
        id: 'm_llm_cave',
        en: () => 'Go to the cave now',
        ar: () => 'اذهب إلى الكهف الآن',
        next: 'm_lighthouse_search',
        effects: { clues: 2 },
      },
      {
        id: 'm_llm_merry_boat',
        en: () => 'Get Merry to take you by boat to the cave entrance',
        ar: () => 'اجعل ميري تأخذك بالقارب إلى مدخل الكهف',
        next: 'm_lighthouse_by_boat',
        effects: { safePath: true },
      },
      {
        id: 'm_llm_derek',
        en: () => 'Derek\'s boat — is it near the lighthouse?',
        ar: () => 'قارب ديريك — هل هو بالقرب من المنارة؟',
        next: 'm_lighthouse_threat',
        effects: { race: true },
      },
      {
        id: 'm_llm_arrest_first',
        en: () => 'Arrest Derek before Lily — he\'s the priority danger',
        ar: () => 'اعتقل ديريك قبل ليلى — هو خطر الأولوية',
        next: 'm_derek_arrest',
        effects: { race: false, derekSuspected: true },
      },
    ],
  },

  // Confrontation scenes
  {
    id: 'm_confrontation_dangerous',
    en: () =>
      `You rush. Derek hears you coming. He turns.\n\nLily uses the moment to run. She knows the cliff paths better than anyone.\n\nDerek doesn't chase her. He turns to face you. And he has a boating knife. Legal. Completely reasonable to carry.\n\n"You have nothing on me," he says.\n\n"I have your crew's testimony, a seven-year-old's evidence notebook, a broken alibi, and a missing jacket."\n\nThe knife drops.`,
    ar: () =>
      `تندفع. ديريك يسمعك قادمًا. يلتفت.\n\nليلى تستغل اللحظة لتجري. تعرف دروب المنحدر أكثر من أي أحد.\n\nديريك لا يطاردها. يلتفت ليواجهك. ولديه سكين قارب. قانوني. معقول تمامًا لحمله.\n\n"ليس لديك أي شيء ضدي،" يقول.\n\n"لديّ شهادة طاقمك، دفتر أدلة طفلة في السابعة، حجة مكسورة، ومعطف مفقود."\n\nتسقط السكين.`,
    choices: [
      {
        id: 'm_cd_arrest',
        en: () => 'Arrest him',
        ar: () => 'اعتقله',
        next: 'm_ending_death',
        effects: { derekSuspected: true },
      },
      {
        id: 'm_cd_lily',
        en: () => 'Secure Lily first — she\'s on the cliffs',
        ar: () => 'أمّن ليلى أولًا — إنها على المنحدرات',
        next: 'm_lily_safe',
        effects: { derekSuspected: true },
      },
      {
        id: 'm_cd_call',
        en: () => 'Call for backup while keeping Derek talking',
        ar: () => 'اطلب دعمًا بينما تبقي ديريك في حوار',
        next: 'm_derek_arrest',
        effects: {},
      },
      {
        id: 'm_cd_evidence_first',
        en: () => 'Demand he tells you where Lily\'s belongings are — preserve evidence',
        ar: () => 'اطلب منه إخبارك أين ممتلكات ليلى — احفظ الأدلة',
        next: 'm_derek_arrest',
        effects: { clues: 1 },
      },
    ],
  },

  {
    id: 'm_confrontation_tactical',
    en: () =>
      `You move quietly. Through the grass, cliff-side, until you can see them.\n\nDerek has Lily by the arm. Not rough — careful. The careful grip of someone performing normality for an audience that doesn't exist.\n\n"Come back with me," he's saying. "Everyone is worried. This will all be better at home."\n\nLily is not crying. She is counting something under her breath. Steps, you realize. She's measuring the distance to the cliff edge.\n\nShe won't.\n\nOr — she's measuring the distance to the hidden path she knows and you don't.`,
    ar: () =>
      `تتحرك بهدوء. عبر العشب، جانب المنحدر، حتى تستطيع رؤيتهما.\n\nديريك يمسك ليلى من ذراعها. ليس بعنف — بعناية. قبضة الشخص الذي يؤدي الطبيعية لجمهور غير موجود.\n\n"ارجعي معي،" يقول. "الجميع قلقون. كل شيء سيكون أفضل في البيت."\n\nليلى لا تبكي. إنها تعد شيئًا في أنفاسها. خطوات، تدرك. إنها تقيس المسافة إلى حافة المنحدر.\n\nلن تفعل.\n\nأو — إنها تقيس المسافة إلى الممر الخفي الذي تعرفه وأنت لا تعرفه.`,
    choices: [
      {
        id: 'm_ct_reveal',
        en: () => 'Step out and identify yourself — remove his leverage',
        ar: () => 'تقدم وعرّف بنفسك — أزل نفوذه',
        next: 'm_confrontation_dangerous',
        effects: { fear: 1 },
      },
      {
        id: 'm_ct_lily_signal',
        en: () => 'Catch Lily\'s eye — signal her to run when you move',
        ar: () => 'التقط نظرة ليلى — أشر لها بالجري حين تتحرك',
        next: 'm_lily_escapes',
        effects: {},
      },
      {
        id: 'm_ct_call_out',
        en: () => 'Call out Derek\'s name loudly from cover — startle him',
        ar: () => 'نادِ اسم ديريك بقوة من مخبئك — أفزعه',
        next: 'm_confrontation_dangerous',
        effects: { fear: 0 },
      },
      {
        id: 'm_ct_wait',
        en: () => 'Wait — Lily knows what she\'s doing',
        ar: () => 'انتظر — ليلى تعرف ما تفعله',
        next: 'm_lily_escapes',
        effects: {},
      },
    ],
  },

  {
    id: 'm_confrontation_backed',
    en: (v) =>
      `Your call reaches ${v.names?.sheriffName ?? 'the sheriff'}. A three-second silence.\n\nThen: "I'm coming. Ten minutes."\n\nEight minutes later, a cruiser arrives at the lighthouse road. ${v.names?.sheriffName ?? 'The Sheriff'} is out of the car before it stops.\n\n"Where is he?"\n\nTogether you approach the cliff path. Derek sees two of you. His face calculates.\n\nHe releases Lily's arm. "I was just trying to bring her home safely," he says.\n\nLily walks to you. She looks at the sheriff with the measured eyes of a seven-year-old who has been lied to by adults her whole life.\n\n"The notebook is in the cave," she says. "Third shelf. It has everything."`,
    ar: (v) =>
      `مكالمتك تصل إلى ${v.names?.sheriffName ?? 'الشريف'}. صمت لثلاث ثوانٍ.\n\nثم: "قادم. عشر دقائق."\n\nبعد ثماني دقائق، تصل سيارة شرطة إلى طريق المنارة. ${v.names?.sheriffName ?? 'الشريف'} خارج السيارة قبل أن تتوقف.\n\n"أين هو؟"\n\nمعًا تقتربان من درب المنحدر. يرى ديريك الاثنين. وجهه يحسب.\n\nيطلق ذراع ليلى. "كنت فقط أحاول إحضارها للمنزل بأمان،" يقول.\n\nليلى تمشي نحوك. تنظر إلى الشريف بعيون طفلة في السابعة أكذب عليها الكبار طوال حياتها.\n\n"الدفتر في الكهف،" تقول. "الرف الثالث. فيه كل شيء."`,
    choices: [
      {
        id: 'm_cb_arrest',
        en: () => 'Arrest Derek right now',
        ar: () => 'اعتقل ديريك الآن',
        next: 'm_derek_arrest',
        effects: { trust: 1 },
      },
      {
        id: 'm_cb_notebook',
        en: () => 'Get the notebook first — secure the evidence',
        ar: () => 'احصل على الدفتر أولًا — أمّن الأدلة',
        next: 'm_ending_success',
        effects: { clues: 1, hasNotebook: true },
      },
      {
        id: 'm_cb_lily_safety',
        en: () => 'Lily first — get her away from all of this',
        ar: () => 'ليلى أولًا — ابعدها عن كل هذا',
        next: 'm_lily_safe',
        effects: {},
      },
      {
        id: 'm_cb_sheriff_trust',
        en: () => 'Trust the sheriff to handle Derek — focus on Lily',
        ar: () => 'ثق بالشريف للتعامل مع ديريك — ركز على ليلى',
        next: 'm_lily_safe',
        effects: { trust: 2 },
      },
    ],
  },

  {
    id: 'm_lily_escapes',
    en: () =>
      `Lily moves. She's measured the distance perfectly. She breaks left, down a path completely invisible from where Derek stands, and she's gone. He reaches for her and grabs air.\n\nHe turns. Sees you for the first time.\n\nHe's alone. Lily is safe. And you have backup coming.`,
    ar: () =>
      `ليلى تتحرك. لقد قاست المسافة بشكل مثالي. تنكسر يسارًا، نزولًا بممر غير مرئي تمامًا من حيث يقف ديريك، وتختفي. يمد يده نحوها ويمسك الهواء.\n\nيلتفت. يراك للمرة الأولى.\n\nهو وحيد. ليلى بأمان. ودعمك قادم.`,
    choices: [
      {
        id: 'm_le_arrest',
        en: () => 'Arrest him immediately',
        ar: () => 'اعتقله فورًا',
        next: 'm_derek_arrest',
        effects: { derekSuspected: true },
      },
      {
        id: 'm_le_find_lily',
        en: () => 'Find Lily first — make sure she\'s truly safe',
        ar: () => 'اجد ليلى أولًا — تأكد من أنها بأمان فعلًا',
        next: 'm_lily_safe',
        effects: {},
      },
      {
        id: 'm_le_talk',
        en: () => 'Keep Derek talking until backup arrives',
        ar: () => 'أبقِ ديريك في حوار حتى يصل الدعم',
        next: 'm_derek_arrest',
        effects: {},
      },
      {
        id: 'm_le_follow',
        en: () => 'Follow Lily — don\'t let her be alone',
        ar: () => 'تبع ليلى — لا تدعها وحدها',
        next: 'm_lily_safe',
        effects: {},
      },
    ],
  },

  // Lily testimony
  {
    id: 'm_lily_testimony',
    en: () =>
      `She tells you everything. Eight months. Specific dates. What he said. What he threatened. What he made her promise to keep secret.\n\nShe kept a notebook because her teacher told her: "Always write down what you experience. Words are evidence."\n\nWarren Hollis said that. In art class. She took it as instruction for something he could not imagine she needed.\n\nShe contacted the children's help line herself. Found Kelvin Marsh. Planned her departure. Took the ferry money.\n\n"I knew no one would believe me," she says. "So I made them have to."`,
    ar: () =>
      `تخبرك بكل شيء. ثمانية أشهر. تواريخ محددة. ما قاله. ما هدد به. ما أجبرها على الوعد بإخفائه.\n\nاحتفظت بدفتر لأن معلمها أخبرها: "دائمًا اكتبي ما تختبرينه. الكلمات هي الأدلة."\n\nوارن هوليس قال ذلك. في فصل الفن. أخذته كتعليم لشيء لا يمكن أن يتخيل أنها تحتاجه.\n\nتواصلت بنفسها مع خط مساعدة الأطفال. وجدت كيلفين مارش. خططت لمغادرتها. أخذت مال العبارة.\n\n"كنت أعرف أنه لن يصدقني أحد،" تقول. "لذا أنشأت وضعًا لم يكن بوسعهم تجاهله."`,
    choices: [
      {
        id: 'm_lt2_arrest',
        en: () => 'Take her testimony and arrest Derek immediately',
        ar: () => 'خذ شهادتها واعتقل ديريك فورًا',
        next: 'm_derek_arrest',
        effects: { clues: 3, derekSuspected: true },
      },
      {
        id: 'm_lt2_safe',
        en: () => 'Get her off this island first — then deal with Derek',
        ar: () => 'أخرجها من هذه الجزيرة أولًا — ثم تعامل مع ديريك',
        next: 'm_lily_safe',
        effects: { clues: 2 },
      },
      {
        id: 'm_lt2_notebook',
        en: () => 'The notebook — secure it as evidence',
        ar: () => 'الدفتر — أمّنه كدليل',
        next: 'm_ending_success',
        effects: { clues: 3, hasNotebook: true },
      },
      {
        id: 'm_lt2_secret',
        en: () => 'Ask her: "Why didn\'t you go to the police at all — even from the mainland?"',
        ar: () => 'اسألها: "لماذا لم تذهبي إلى الشرطة أصلًا — حتى من البر الرئيسي؟"',
        next: 'm_lily_secret_ending_rev',
        effects: { clues: 3 },
      },
    ],
  },

  {
    id: 'm_lily_confirms_kelvin',
    en: () =>
      `Lily's face changes when you mention Kelvin.\n\n"He's nice. He put me on the ferry. He said his sister would meet me. But I got scared. I thought if the ferry went to the mainland, Derek could follow. So I got off at the stop before but I kept the ticket."\n\nShe wasn't trying to reach the mainland at all. She just needed to reach the lighthouse — and stay hidden until someone safe came for her.\n\n"I knew Merry would tell the right person eventually."`,
    ar: () =>
      `يتغير وجه ليلى حين تذكر كيلفين.\n\n"هو لطيف. أركبني على العبارة. قال أخته ستقابلني. لكنني خفت. فكرت إذا ذهبت العبارة للبر الرئيسي، يمكن أن يتبع ديريك. لذا نزلت في المحطة قبل الأخيرة ولكنني احتفظت بالتذكرة."\n\nلم تكن تحاول الوصول للبر الرئيسي أصلًا. هي فقط احتاجت الوصول إلى المنارة — والبقاء مختبئة حتى يأتي شخص آمن لها.\n\n"كنت أعرف أن ميري ستخبر الشخص المناسب في النهاية."`,
    choices: [
      {
        id: 'm_lck_safe',
        en: () => 'Make sure Kelvin is released — he\'s innocent',
        ar: () => 'تأكد من إطلاق سراح كيلفين — إنه بريء',
        next: 'm_lily_safe',
        effects: { kelvinCleared: true },
      },
      {
        id: 'm_lck_derek',
        en: () => 'Focus on Derek — he still needs to be arrested',
        ar: () => 'ركز على ديريك — لا يزال يحتاج للاعتقال',
        next: 'm_derek_arrest',
        effects: { derekSuspected: true, kelvinCleared: true },
      },
      {
        id: 'm_lck_secret',
        en: () => '"Why did you trust the system if you knew Derek had the sheriff\'s ear?"',
        ar: () => '"لماذا وثقت بالنظام إذا كنت تعرفين أن ديريك له علاقة بالشريف؟"',
        next: 'm_lily_secret_ending_rev',
        effects: {},
      },
      {
        id: 'm_lck_notebook',
        en: () => 'Secure the notebook — it\'s everything you need',
        ar: () => 'أمّن الدفتر — إنه كل ما تحتاجه',
        next: 'm_ending_success',
        effects: { clues: 2, hasNotebook: true, kelvinCleared: true },
      },
    ],
  },

  // Additional utility nodes
  {
    id: 'm_route_walk',
    en: () =>
      `You walk Lily's route. She would have left home at 7:50 AM for the 8:15 first bell.\n\nAt the corner of Harbor Road and School Lane, you find something: scratched into the wood of a fence post, at knee height for an adult, at eye height for a seven-year-old: "MERRY KNOWS."\n\nTwo words. Placed where a child would look and an adult would miss. Lily scratched this herself. She left a trail.`,
    ar: () =>
      `تسير على طريق ليلى. كانت ستغادر المنزل في 7:50 صباحًا للجرس الأول في 8:15.\n\nعند تقاطع شارع الميناء وطريق المدرسة، تجد شيئًا: محفور في خشب عمود سياج، على ارتفاع الركبة لبالغ، على ارتفاع العين لطفلة في السابعة: "ميري تعرف."\n\nكلمتان. موضوعتان حيث ستنظر طفلة ويغفل بالغ. حفرتها ليلى بنفسها. تركت أثرًا.`,
    choices: [
      {
        id: 'm_rw_merry',
        en: () => 'Find Merry — she has information',
        ar: () => 'اجد ميري — لديها معلومات',
        next: 'm_dock_inquiry',
        effects: { clues: 2 },
      },
      {
        id: 'm_rw_school',
        en: () => 'Continue to the school — see what else the route shows',
        ar: () => 'واصل إلى المدرسة — اعرف ما يكشفه المسار أكثر',
        next: 'm_school_visit',
        effects: { clues: 1 },
      },
      {
        id: 'm_rw_harbor',
        en: () => 'The shopkeeper saw her at the harbor — go there',
        ar: () => 'رأى صاحب المتجر ليلى في الميناء — اذهب إلى هناك',
        next: 'm_shopkeeper_interview',
        effects: { clues: 1 },
      },
      {
        id: 'm_rw_sheriff',
        en: () => 'Report this to the sheriff first',
        ar: () => 'أبلغ الشريف بهذا أولًا',
        next: 'm_sheriff_meet',
        effects: {},
      },
    ],
  },

  {
    id: 'm_shopkeeper_interview',
    en: () =>
      `The shopkeeper — an elderly man who sells fishing supplies — speaks without prompting.\n\n"She came in. Bought three energy bars. Paid in coins. Exact change — she'd counted it out." He pauses. "A seven-year-old counting exact change. I should have asked."\n\n"She went directly to the docks after. A man was waiting — not from here. Thin, tanned. He helped her with her bag. They walked to the water taxi."`,
    ar: () =>
      `صاحب المتجر — رجل عجوز يبيع أدوات الصيد — يتحدث دون حافز.\n\n"جاءت. اشترت ثلاثة أشرطة طاقة. دفعت بالقطع المعدنية. فكة مضبوطة — كانت قد أحصتها." يتوقف. "طفلة في السابعة تعد فكة مضبوطة. كان يجب أن أسأل."\n\n"ذهبت مباشرة إلى الأرصفة بعدها. كان رجل ينتظر — ليس من هنا. نحيل، مدبوغ. ساعدها بحقيبتها. مشيا إلى التاكسي المائي."`,
    choices: [
      {
        id: 'm_si_kelvin',
        en: () => 'That\'s Kelvin Marsh — find him',
        ar: () => 'ذاك هو كيلفين مارش — اجده',
        next: 'm_kelvin_lead',
        effects: { clues: 2 },
      },
      {
        id: 'm_si_dock',
        en: () => 'Go to the docks — find the water taxi',
        ar: () => 'اذهب إلى الأرصفة — اجد التاكسي المائي',
        next: 'm_dock_inquiry',
        effects: { clues: 2 },
      },
      {
        id: 'm_si_lighthouse',
        en: () => 'She didn\'t take the taxi — trace where she went next',
        ar: () => 'لم تأخذ التاكسي — تتبع أين ذهبت بعدها',
        next: 'm_lighthouse',
        effects: { clues: 1 },
      },
      {
        id: 'm_si_derek',
        en: () => 'Was Derek anywhere near the docks then?',
        ar: () => 'هل كان ديريك بالقرب من الأرصفة في ذلك الوقت؟',
        next: 'm_derek_vance',
        effects: { clues: 1 },
      },
    ],
  },

  {
    id: 'm_teacher_interview',
    en: () =>
      `Lily's homeroom teacher, Mr. Crane, has been replaying the morning for three days.\n\n"She sat by the window. That was unusual. She drew something — a lighthouse. I thought it was just a drawing.\n\n"Before the other kids arrived, she went to Mr. Hollis's classroom. Five minutes, maybe. When she came back she was calmer. Like she'd decided something.\n\n"She left before first bell. I saw her through the window, across the yard. She had her backpack. She didn't run. She walked purposefully."`,
    ar: () =>
      `معلم فصل ليلى، السيد كريان، كان يعيد تشغيل الصباح في ذهنه لثلاثة أيام.\n\n"جلست عند النافذة. كان ذلك غير معتاد. رسمت شيئًا — منارة. ظننت مجرد رسم.\n\n"قبل وصول الأطفال الآخرين، ذهبت إلى فصل السيد هوليس. خمس دقائق، ربما. حين عادت كانت أهدأ. كأنها قررت شيئًا.\n\n"غادرت قبل الجرس الأول. رأيتها من النافذة، عبر الساحة. كانت تحمل حقيبتها. لم تجرِ. مشت باتجاه."`,
    choices: [
      {
        id: 'm_ti_warren',
        en: () => 'Warren Hollis — she visited him that morning. Find out what he said.',
        ar: () => 'وارن هوليس — زارته ذلك الصباح. اعرف ما قاله.',
        next: 'm_warren_hollis',
        effects: { clues: 1 },
      },
      {
        id: 'm_ti_school_exit',
        en: () => 'Check the route she walked — trace it purposefully',
        ar: () => 'تحقق من الطريق الذي سلكته — تتبعه باتجاه',
        next: 'm_route_walk',
        effects: { clues: 1 },
      },
      {
        id: 'm_ti_lighthouse_draw',
        en: () => 'The lighthouse drawing — does it still exist?',
        ar: () => 'رسم المنارة — هل لا يزال موجودًا؟',
        next: 'm_lighthouse',
        effects: { clues: 2 },
      },
      {
        id: 'm_ti_backpack',
        en: () => 'Her backpack — it\'s still at school. Examine it.',
        ar: () => 'حقيبتها — لا تزال في المدرسة. افحصها.',
        next: 'm_lily_note',
        effects: { clues: 1 },
      },
    ],
  },

  {
    id: 'm_side_gate',
    en: () =>
      `The side gate has a simple latch. A child could open it easily. The security camera that should cover it has been rotated away — deliberately. Recently.\n\nSomeone rotated that camera. Someone with access to the school's security system.\n\nA maintenance log on the wall shows the last access: "Camera reorientation — exterior maintenance." Signed three weeks ago by a contractor.\n\nThe name on the signature: D. Vance.`,
    ar: () =>
      `البوابة الجانبية لها مزلاج بسيط. طفل يستطيع فتحه بسهولة. كاميرا المراقبة التي يجب أن تغطيه وُجّهت بعيدًا — عن قصد. مؤخرًا.\n\nشخص ما وجّه تلك الكاميرا. شخص لديه صلاحية الوصول إلى نظام أمن المدرسة.\n\nسجل الصيانة على الجدار يظهر آخر وصول: "إعادة توجيه الكاميرا — صيانة خارجية." موقّع قبل ثلاثة أسابيع من قِبل مقاول.\n\nالاسم على التوقيع: د. فانس.`,
    choices: [
      {
        id: 'm_sg_derek',
        en: () => 'Derek Vance knew she would use this gate — he prepared',
        ar: () => 'ديريك فانس كان يعلم أنها ستستخدم هذه البوابة — استعد',
        next: 'm_derek_vance',
        effects: { clues: 3, derekSuspected: true },
      },
      {
        id: 'm_sg_merry',
        en: () => 'Get to the docks — find who knows what about Derek',
        ar: () => 'اذهب إلى الأرصفة — اجد من يعرف ماذا عن ديريك',
        next: 'm_dock_inquiry',
        effects: { clues: 2, derekSuspected: true },
      },
      {
        id: 'm_sg_sheriff',
        en: () => 'Take this to the sheriff — hard evidence',
        ar: () => 'خذ هذا للشريف — دليل قاطع',
        next: 'm_sheriff_confrontation',
        effects: { clues: 2, derekSuspected: true },
      },
      {
        id: 'm_sg_lily',
        en: () => 'Find Lily first — she may be running from Derek',
        ar: () => 'اجد ليلى أولًا — قد تكون تفر من ديريك',
        next: 'm_lighthouse',
        effects: { clues: 1, derekSuspected: true },
      },
    ],
  },

  {
    id: 'm_classmates',
    en: () =>
      `Two of Lily's classmates, interviewed with teacher present:\n\nFirst: "Lily had a secret. She said she was going to be safe soon. I thought she meant summer vacation."\n\nSecond: "She gave me her stack of good erasers to keep before she left. She said she wouldn't need them anymore. I thought she was being dramatic."`,
    ar: () =>
      `اثنان من زملاء ليلى في الفصل، مع حضور المعلم:\n\nالأول: "كان لدى ليلى سر. قالت ستكون بأمان قريبًا. ظننت تعني عطلة الصيف."\n\nالثاني: "أعطتني كومة ممحاياتها الجيدة للحفاظ عليها قبل أن ترحل. قالت لن تحتاجها بعد الآن. ظننت تكون مبالغة."`,
    choices: [
      {
        id: 'm_cl_plan',
        en: () => 'Lily had a planned departure — find her route',
        ar: () => 'كان لدى ليلى مغادرة مخططة — اجد مسارها',
        next: 'm_route_walk',
        effects: { clues: 2 },
      },
      {
        id: 'm_cl_note',
        en: () => 'She left something in her backpack — examine it',
        ar: () => 'تركت شيئًا في حقيبتها — افحصها',
        next: 'm_lily_note',
        effects: { clues: 1 },
      },
      {
        id: 'm_cl_warren',
        en: () => 'Talk to the art teacher she trusted',
        ar: () => 'تحدث مع معلم الفن الذي وثقت به',
        next: 'm_warren_hollis',
        effects: {},
      },
      {
        id: 'm_cl_dock',
        en: () => 'The harbor — she was seen heading there',
        ar: () => 'الميناء — شُوهدت متجهة إلى هناك',
        next: 'm_dock_inquiry',
        effects: { clues: 1 },
      },
    ],
  },

  {
    id: 'm_complaint_check',
    en: () =>
      `You pull the complaint file. A parent, Mr. Gareth, filed against Warren Hollis for "inappropriate physical contact with students."\n\nWarren's statement: He placed a hand on a crying student's shoulder to comfort her. Three witnesses confirm this.\n\nGareth's child was not the one being comforted.\n\nGareth is Derek Vance's fishing partner. He filed this complaint one week after Warren told Lily that "words are evidence."\n\nThe complaint wasn't about Warren. It was a warning. Stay away from the Harrow children.`,
    ar: () =>
      `تسحب ملف الشكوى. قدّم أحد الآباء، السيد غاريث، شكوى ضد وارن هوليس بسبب "تواصل جسدي غير ملائم مع الطلاب."\n\nإفادة وارن: وضع يده على كتف طالب يبكي لتهدئته. ثلاثة شهود يؤكدون هذا.\n\nطفل غاريث لم يكن من كان يُهدَّأ.\n\nغاريث شريك صيد ديريك فانس. قدّم الشكوى بعد أسبوع واحد من قول وارن لليلى أن "الكلمات هي الأدلة."\n\nالشكوى لم تكن عن وارن. كانت تحذيرًا. ابتعد عن أطفال هارو.`,
    choices: [
      {
        id: 'm_cc_derek',
        en: () => 'Derek orchestrated the complaint — this proves his knowledge',
        ar: () => 'ديريك دبّر الشكوى — هذا يثبت علمه',
        next: 'm_derek_vance',
        effects: { clues: 2, derekSuspected: true },
      },
      {
        id: 'm_cc_warren',
        en: () => 'Tell Warren — he deserves to know what the complaint was really about',
        ar: () => 'أخبر وارن — يستحق معرفة ما كانت الشكوى فعليًا عنه',
        next: 'm_warren_hollis',
        effects: { clues: 1, warrenCleared: true },
      },
      {
        id: 'm_cc_lighthouse',
        en: () => 'Enough from this angle — go to the lighthouse',
        ar: () => 'يكفي من هذه الزاوية — اذهب إلى المنارة',
        next: 'm_lighthouse',
        effects: { clues: 1, derekSuspected: true },
      },
      {
        id: 'm_cc_sheriff',
        en: () => 'The sheriff knew about this complaint and dismissed it — confront him',
        ar: () => 'الشريف كان يعرف عن الشكوى ورفضها — واجهه',
        next: 'm_sheriff_confrontation',
        effects: { clues: 2, waryOfSheriff: true },
      },
    ],
  },

  {
    id: 'm_boat_captain',
    en: () =>
      `You ask around. Three boat captains operate out of Greyvale's dock. One is Derek Vance. Another is Merry Reed. The third — a young man named Caspar — runs a quiet charter service.\n\nCaspar confirms: "A man came to me three weeks ago. Tall. Not local. Asked if I'd take a child across without papers if the situation required it. I said no."\n\nKelvin Marsh tried the official charter first. Was turned down. Then — or someone else — found another way.`,
    ar: () =>
      `تسأل حولك. ثلاثة قباطنة قوارب يعملون من رصيف غرايفيل. أحدهم ديريك فانس. الآخر ميري ريد. الثالث — شاب اسمه كاسبر — يدير خدمة تأجير هادئة.\n\nكاسبر يؤكد: "رجل جاء إليّ قبل ثلاثة أسابيع. طويل. ليس من المنطقة. سأل إذا كنت سأنقل طفلة دون وثائق إذا تطلّب الوضع ذلك. قلت لا."\n\nكيلفين مارش جرب التأجير الرسمي أولًا. رُفض. ثم — هو أو شخص آخر — وجد طريقة أخرى.`,
    choices: [
      {
        id: 'm_bc_kelvin',
        en: () => 'Find Kelvin Marsh — he\'s been trying to help Lily',
        ar: () => 'اجد كيلفين مارش — كان يحاول مساعدة ليلى',
        next: 'm_kelvin_lead',
        effects: { clues: 2 },
      },
      {
        id: 'm_bc_merry',
        en: () => 'Merry — she runs the other boat service. Did she help?',
        ar: () => 'ميري — تدير خدمة القوارب الأخرى. هل ساعدت؟',
        next: 'm_dock_inquiry',
        effects: { clues: 1 },
      },
      {
        id: 'm_bc_lighthouse',
        en: () => 'Lily didn\'t need a boat — she\'s at the lighthouse',
        ar: () => 'ليلى لم تحتج قاربًا — إنها في المنارة',
        next: 'm_lighthouse',
        effects: {},
      },
      {
        id: 'm_bc_derek',
        en: () => 'Derek runs a boat — was HE Lily\'s transportation?',
        ar: () => 'ديريك يدير قاربًا — هل كان هو وسيلة ليلى؟',
        next: 'm_derek_vance',
        effects: { derekSuspected: true },
      },
    ],
  },

  {
    id: 'm_note_shown_parents',
    en: () =>
      `You show them the note. Mrs. Harrow reads it in silence. A tear runs down her face. She doesn't wipe it.\n\nMr. Harrow reads it and his expression does something complex — guilt, fear, calculation. "Derek would never—" he starts.\n\n"Your daughter wrote this," you say. "She was afraid of someone. She named your sheriff. She named Derek." You watch his face. "And you didn't know."\n\nA long silence.\n\n"She tried to tell me," Mrs. Harrow says quietly. "I told her Derek was family."`,
    ar: () =>
      `تريهم الملاحظة. السيدة هارو تقرأها في صمت. دمعة تنزل على خدها. لا تمسحها.\n\nالسيد هارو يقرأها وتعبير وجهه يفعل شيئًا معقدًا — ذنب، خوف، حساب. "ديريك لن—" يبدأ.\n\n"ابنتك كتبت هذا،" تقول. "كانت تخشى شخصًا. سمّت شريفك. سمّت ديريك." تراقب وجهه. "وأنت لم تكن تعرف."\n\nصمت طويل.\n\n"حاولت أن تخبرني،" تقول السيدة هارو بهدوء. "قلت لها أن ديريك عائلة."`,
    choices: [
      {
        id: 'm_nsp_derek',
        en: () => 'Find Derek immediately',
        ar: () => 'اجد ديريك فورًا',
        next: 'm_derek_vance',
        effects: { clues: 2, derekSuspected: true },
      },
      {
        id: 'm_nsp_sheriff',
        en: () => 'The father needs to cooperate — take him to the sheriff',
        ar: () => 'الأب بحاجة للتعاون — خذه إلى الشريف',
        next: 'm_sheriff_confrontation',
        effects: { clues: 1, trust: 1 },
      },
      {
        id: 'm_nsp_lighthouse',
        en: () => 'Lily — focus on finding her',
        ar: () => 'ليلى — ركز على إيجادها',
        next: 'm_lighthouse',
        effects: { clues: 1 },
      },
      {
        id: 'm_nsp_mother',
        en: () => '"She tried to tell you" — press harder on the mother',
        ar: () => '"حاولت أن تخبرك" — اضغط أكثر على الأم',
        next: 'm_father_pressure',
        effects: { clues: 2 },
      },
    ],
  },

  {
    id: 'm_father_pressure',
    en: () =>
      `Mr. Harrow breaks in the kitchen, standing.\n\n"Derek has been funding our mortgage for eight months. You understand? We were going to lose the house. He offered to help. I didn't ask questions I didn't want answered."\n\nHis wife can hear from the next room. She makes no sound.\n\n"I'm not a bad person," he says, and it sounds like the most desperate lie.\n\n"You let a predator near your daughter because of money," you say, not unkindly.\n\nHe sits down. Slowly. Like something collapsing.`,
    ar: () =>
      `السيد هارو ينهار في المطبخ، واقفًا.\n\n"ديريك كان يموّل رهننا العقاري لثمانية أشهر. هل تفهم؟ كنا سنخسر المنزل. عرض المساعدة. لم أطرح أسئلة لا أريد إجاباتها."\n\nزوجته تستطيع السمع من الغرفة المجاورة. لا تصدر أي صوت.\n\n"لست شخصًا سيئًا،" يقول، ويبدو ذلك أيأس كذبة.\n\n"سمحت لمفترس بالاقتراب من ابنتك بسبب المال،" تقول، بدون قسوة.\n\nيجلس. ببطء. كشيء ينهار.`,
    choices: [
      {
        id: 'm_fp_derek',
        en: () => 'This is confirmation — arrest Derek',
        ar: () => 'هذا تأكيد — اعتقل ديريك',
        next: 'm_derek_arrest',
        effects: { clues: 2, derekSuspected: true },
      },
      {
        id: 'm_fp_lighthouse',
        en: () => 'Leave them — find Lily',
        ar: () => 'اتركهم — اجد ليلى',
        next: 'm_lighthouse',
        effects: { clues: 1 },
      },
      {
        id: 'm_fp_sheriff',
        en: () => 'Take this statement to the sheriff',
        ar: () => 'خذ هذه الإفادة للشريف',
        next: 'm_sheriff_confrontation',
        effects: { clues: 2 },
      },
      {
        id: 'm_fp_father_help',
        en: () => 'The father can help — can he call Derek directly?',
        ar: () => 'الأب يستطيع المساعدة — هل يستطيع الاتصال بديريك مباشرة؟',
        next: 'm_derek_vance',
        effects: { clues: 1, trust: 1 },
      },
    ],
  },

  {
    id: 'm_dr_marsh',
    en: () =>
      `Dr. Anna Marsh answers her phone on the second ring. Professional. Precise.\n\n"Yes, I was contacted by a child from Greyvale. Yes, I sent my brother. Yes, I know it was improper by protocol. I was more concerned about the child than the paperwork."\n\nShe pauses.\n\n"I spoke to Lily myself, through the anonymous line. What she described was consistent and detailed. She had been trying to report it officially for three months. She was dismissed. Twice."\n\n"Is she safe?"\n\n"I hope so. Kelvin put her on the ferry. She should have arrived. But she hasn't checked in."`,
    ar: () =>
      `الدكتورة آنا مارش ترد على هاتفها في الرنة الثانية. مهنية. دقيقة.\n\n"نعم، تواصلت معي طفلة من غرايفيل. نعم، أرسلت أخي. نعم، أعرف أنه غير لائق من حيث البروتوكول. كنت أكثر اهتمامًا بالطفلة من الأوراق."\n\nتتوقف.\n\n"تحدثت مع ليلى بنفسي، عبر الخط المجهول. ما وصفته كان متسقًا ومفصلًا. كانت تحاول الإبلاغ عنه رسميًا منذ ثلاثة أشهر. رُفضت. مرتين."\n\n"هل هي بأمان؟"\n\n"آمل ذلك. كيلفين أركبها العبارة. كان يجب أن تصل. لكنها لم تُسجّل وصولها."`,
    choices: [
      {
        id: 'm_dm_kelvin',
        en: () => 'Kelvin is being held — release him. Find where Lily actually went.',
        ar: () => 'كيلفين محتجز — أطلق سراحه. اجد أين ذهبت ليلى فعليًا.',
        next: 'm_kelvin_reveal',
        effects: { clues: 2, kelvinCleared: true },
      },
      {
        id: 'm_dm_lighthouse',
        en: () => 'She didn\'t take the ferry all the way — go to the lighthouse',
        ar: () => 'لم تأخذ العبارة حتى النهاية — اذهب إلى المنارة',
        next: 'm_lighthouse',
        effects: { clues: 2 },
      },
      {
        id: 'm_dm_derek',
        en: () => 'Derek Vance — confirm he\'s the subject of Lily\'s report',
        ar: () => 'ديريك فانس — تأكد من أنه موضوع تقرير ليلى',
        next: 'm_derek_arrest',
        effects: { clues: 2, derekSuspected: true },
      },
      {
        id: 'm_dm_state',
        en: () => 'Get official backup — escalate everything now',
        ar: () => 'احصل على دعم رسمي — صعّد كل شيء الآن',
        next: 'm_state_escalation',
        effects: { clues: 1 },
      },
    ],
  },

  {
    id: 'm_kelvin_proof',
    en: () =>
      `Kelvin shows you his phone. Messages from Dr. Anna Marsh. Three weeks of coordination. The ferry receipt. A photo — Lily at the harbor, holding his hand, looking nervous but decided.\n\nHe wasn't abducting her. He was extracting her.\n\nHe gives you Anna's number.\n\nYou clear Kelvin in the next half hour.`,
    ar: () =>
      `كيلفين يريك هاتفه. رسائل من الدكتورة آنا مارش. ثلاثة أسابيع من التنسيق. إيصال العبارة. صورة — ليلى في الميناء، تمسك يده، تبدو متوترة لكن حازمة.\n\nلم يكن يختطفها. كان يستخرجها.\n\nيعطيك رقم آنا.\n\nتُبرئ كيلفين في نصف الساعة التالية.`,
    choices: [
      {
        id: 'm_kp_lighthouse',
        en: () => 'She didn\'t reach the mainland — find her at the lighthouse',
        ar: () => 'لم تصل للبر الرئيسي — اجدها في المنارة',
        next: 'm_lighthouse',
        effects: { clues: 2, kelvinCleared: true },
      },
      {
        id: 'm_kp_derek',
        en: () => 'Derek must be arrested before he reaches Lily',
        ar: () => 'يجب اعتقال ديريك قبل أن يصل إلى ليلى',
        next: 'm_derek_arrest',
        effects: { derekSuspected: true, kelvinCleared: true },
      },
      {
        id: 'm_kp_merry',
        en: () => 'Get Merry\'s boat — reach the lighthouse by sea',
        ar: () => 'خذ قارب ميري — اصل للمنارة بالبحر',
        next: 'm_lighthouse_by_boat',
        effects: { safePath: true, kelvinCleared: true },
      },
      {
        id: 'm_kp_sheriff',
        en: () => 'Brief the sheriff — even he can\'t ignore this now',
        ar: () => 'أبلغ الشريف — حتى هو لا يستطيع تجاهل هذا الآن',
        next: 'm_sheriff_confrontation',
        effects: { kelvinCleared: true },
      },
    ],
  },

  // Lily safe and endings
  {
    id: 'm_lily_safe',
    en: () =>
      `Lily is safe. You stay with her until the state agents arrive.\n\nShe sits wrapped in Merry's spare sweater, eating a sandwich, watching the sea. She asks you only one question.\n\n"Will they be able to not believe me if I have the notebook?"\n\n"No," you tell her. "They won't be able to."\n\nShe nods. Satisfied. And goes back to watching the sea.`,
    ar: () =>
      `ليلى بأمان. تبقى معها حتى يصل عملاء الولاية.\n\nتجلس ملفوفة في كنزة ميري الاحتياطية، تأكل شطيرة، تراقب البحر. تسألك سؤالًا واحدًا فقط.\n\n"هل سيتمكنون من عدم تصديقي إذا كان لديّ الدفتر؟"\n\n"لا،" تخبرها. "لن يتمكنوا."\n\nتومئ. مرتاحة. وتعود لمراقبة البحر.`,
    choices: [
      {
        id: 'm_ls2_arrest',
        en: () => 'Derek still needs to be arrested — go do that',
        ar: () => 'ديريك لا يزال بحاجة للاعتقال — اذهب وافعل ذلك',
        next: 'm_derek_arrest',
        effects: { derekSuspected: true },
      },
      {
        id: 'm_ls2_end',
        en: () => 'Let the state agents handle the rest — you\'ve found her',
        ar: () => 'دع عملاء الولاية يتعاملون مع الباقي — لقد وجدتها',
        next: 'm_ending_success',
        effects: {},
      },
      {
        id: 'm_ls2_secret',
        en: () => 'Ask Lily what she wants to happen to Derek',
        ar: () => 'اسأل ليلى ماذا تريد أن يحدث لديريك',
        next: 'm_lily_secret_ending_rev',
        effects: {},
      },
      {
        id: 'm_ls2_sheriff',
        en: () => 'Brief the sheriff one last time — see which side he chooses',
        ar: () => 'أبلغ الشريف مرة أخيرة — اعرف أي جانب يختار',
        next: 'm_sheriff_confrontation',
        effects: {},
      },
    ],
  },

  {
    id: 'm_lily_race',
    en: () =>
      `There's no time for questions. Derek's boat is at the dock — he's here. You get Lily moving.\n\nYou take the cliff path. She leads — she knows every turn. You reach Merry's boat in eleven minutes.\n\n"Go," you tell Merry. "Get her to the mainland ferry terminal. Don't stop for anything."\n\n"What about you?"\n\n"I have work to do."`,
    ar: () =>
      `لا وقت للأسئلة. قارب ديريك في الرصيف — هو هنا. تجعل ليلى تتحرك.\n\nتسلكون درب المنحدر. تقود هي — تعرف كل منعطف. تصلون لقارب ميري في أحد عشر دقيقة.\n\n"اذهبي،" تقول لميري. "خذيها إلى محطة العبارة في البر الرئيسي. لا تتوقفي لأي شيء."\n\n"ماذا عنك؟"\n\n"لديّ عمل أقوم به."`,
    choices: [
      {
        id: 'm_lr_arrest',
        en: () => 'Find Derek and arrest him',
        ar: () => 'اجد ديريك واعتقله',
        next: 'm_derek_arrest',
        effects: { derekSuspected: true },
      },
      {
        id: 'm_lr_end',
        en: () => 'Call state backup — let them handle the arrest',
        ar: () => 'اتصل بدعم الولاية — دعهم يتعاملون مع الاعتقال',
        next: 'm_ending_success',
        effects: {},
      },
      {
        id: 'm_lr_sheriff',
        en: () => 'Confront the sheriff while you have leverage',
        ar: () => 'واجه الشريف بينما لديك نفوذ',
        next: 'm_sheriff_confrontation',
        effects: { waryOfSheriff: true },
      },
      {
        id: 'm_lr_lighthouse',
        en: () => 'Search the lighthouse for any remaining evidence',
        ar: () => 'فتش المنارة بحثًا عن أي دليل متبقٍ',
        next: 'm_lily_backpack',
        effects: {},
      },
    ],
  },

  {
    id: 'm_lily_confirmed_safe',
    en: () =>
      `You call Dr. Anna Marsh. She confirms: Lily arrived. She is safe. She's at the crisis center. She's eating chicken soup and watching cartoons, which is the most mundane and wonderful thing you've heard in days.\n\n"She brought a notebook," Anna says. "Everything in it.\n\n"Whoever you are — thank you."`,
    ar: () =>
      `تتصل بالدكتورة آنا مارش. تؤكد: ليلى وصلت. إنها بأمان. في مركز الأزمات. تأكل شوربة دجاج وتشاهد الرسوم المتحركة، وهو أكثر شيء عادي ورائع سمعته منذ أيام.\n\n"جلبت دفترًا معها،" تقول آنا. "كل شيء بداخله.\n\n"مهما كنت — شكرًا لك."`,
    choices: [
      {
        id: 'm_lcs_arrest',
        en: () => 'Derek Vance still needs to be arrested. Go.',
        ar: () => 'ديريك فانس لا يزال بحاجة للاعتقال. اذهب.',
        next: 'm_derek_arrest',
        effects: { derekSuspected: true },
      },
      {
        id: 'm_lcs_end',
        en: () => 'Lily is safe — let state handle the rest',
        ar: () => 'ليلى بأمان — دع الولاية تتعامل مع الباقي',
        next: 'm_ending_success',
        effects: {},
      },
      {
        id: 'm_lcs_sheriff',
        en: () => 'The sheriff needs to answer for his complicity',
        ar: () => 'الشريف بحاجة للإجابة عن تواطئه',
        next: 'm_sheriff_confrontation',
        effects: { waryOfSheriff: true },
      },
      {
        id: 'm_lcs_public',
        en: () => 'This needs to be public — file a full report',
        ar: () => 'هذا يحتاج أن يكون عامًا — قدّم تقريرًا كاملًا',
        next: 'm_ending_success',
        effects: {},
      },
    ],
  },

  // Derek arrest
  {
    id: 'm_derek_arrest',
    en: (v) =>
      `David Vance is arrested at ${v.names?.sheriffName ? `${v.names.sheriffName}'s` : 'the'} office — or at the dock, or found on the cliff path — it depends on where you find him.\n\nHe doesn't resist. He calls his lawyer, a voice like oil on water, before you finish the caution.\n\nHe sits in the interview room and smiles at the wall and you understand: he's done this before. He's been interviewed before. He's been believed before.\n\nThen you place Lily's notebook on the table.\n\nThe smile stays. But something behind the eyes goes darker.`,
    ar: (v) =>
      `يُعتقل ديريك فانس في مكتب ${v.names?.sheriffName ? `${v.names.sheriffName}` : 'الشريف'} — أو في الرصيف، أو يُوجد على درب المنحدر — يعتمد على أين تجده.\n\nلا يقاوم. يتصل بمحاميه، صوت كالزيت على الماء، قبل أن تنهي التحذير.\n\nيجلس في غرفة المقابلة ويبتسم عند الجدار وتفهم: فعل هذا من قبل. استُجوب من قبل. صُدّق من قبل.\n\nثم تضع دفتر ليلى على الطاولة.\n\nتبقى الابتسامة. لكن شيئًا خلف العينين يصبح أد أكثر قتامة.`,
    choices: [
      {
        id: 'm_da_end',
        en: () => 'The case is complete — write your report',
        ar: () => 'القضية مكتملة — اكتب تقريرك',
        next: 'm_ending_success',
        effects: {},
      },
      {
        id: 'm_da_sheriff',
        en: () => 'Ensure the sheriff is investigated too',
        ar: () => 'تأكد من التحقيق مع الشريف أيضًا',
        next: 'm_ending_success',
        effects: { waryOfSheriff: true },
      },
      {
        id: 'm_da_lily',
        en: () => 'Make sure Lily is informed — she deserves to know it\'s over',
        ar: () => 'تأكد من إخبار ليلى — تستحق أن تعرف أنه انتهى',
        next: 'm_ending_success',
        effects: {},
      },
      {
        id: 'm_da_secret',
        en: () => 'Read Lily\'s notebook fully — understand everything that happened',
        ar: () => 'اقرأ دفتر ليلى كاملًا — افهم كل ما حدث',
        next: 'm_lily_secret_ending_rev',
        effects: { clues: 3 },
      },
    ],
  },

  // Secret ending path
  {
    id: 'm_lily_secret_ending',
    en: () =>
      `Reading Lily's notebook — or listening to her full testimony — you piece together something the official case won't capture.\n\nLily didn't just run. She planned this for eight months. She set a trap.\n\nShe knew Derek had someone at the school. She knew the sheriff was compromised. She knew her father was silent. She knew her mother was afraid.\n\nSo she created an EVENT — a disappearance — that would bring in an outside investigator. She contacted the anonymous tip line specifically to create a paper trail that would justify sending someone like you.\n\nShe is seven years old.\n\nShe did what adults failed to do for eight months, in six days, by herself.`,
    ar: () =>
      `بقراءة دفتر ليلى — أو الاستماع لشهادتها الكاملة — تجمع شيئًا لن يلتقطه الملف الرسمي.\n\nليلى لم تهرب فقط. خططت لهذا لمدة ثمانية أشهر. نصبت فخًا.\n\nكانت تعرف أن ديريك لديه شخص في المدرسة. كانت تعرف أن الشريف متورط. كانت تعرف أن والدها صامت. كانت تعرف أن والدتها خائفة.\n\nلذا أوجدت حدثًا — اختفاءً — من شأنه استقدام محقق خارجي. تواصلت مع خط النجدة المجهول تحديدًا لإنشاء مسار ورقي سيبرر إرسال شخص مثلك.\n\nعمرها سبع سنوات.\n\nفعلت ما فشل الكبار في فعله لثمانية أشهر، في ستة أيام، بمفردها.`,
    choices: [
      {
        id: 'm_lse_acknowledge',
        en: () => 'Include this in your official report — the world needs to know',
        ar: () => 'أدرج هذا في تقريرك الرسمي — العالم يحتاج أن يعرف',
        next: 'm_ending_secret',
        effects: {},
      },
      {
        id: 'm_lse_arrest_end',
        en: () => 'Derek is convicted — that\'s what matters',
        ar: () => 'ديريك أُدين — هذا ما يهم',
        next: 'm_ending_success',
        effects: {},
      },
      {
        id: 'm_lse_tell_lily',
        en: () => 'Tell Lily you understand what she did',
        ar: () => 'أخبر ليلى أنك تفهم ما فعلته',
        next: 'm_ending_secret',
        effects: {},
      },
      {
        id: 'm_lse_report',
        en: () => 'Request a systemic review — how many others has this town failed?',
        ar: () => 'اطلب مراجعة منهجية — كم شخصًا آخر أخفقت هذه المدينة في حقه؟',
        next: 'm_ending_secret',
        effects: {},
      },
    ],
  },

  // ── ENDINGS ───────────────────────────────────────────────────────────────────
  {
    id: 'm_ending_success',
    en: (v) =>
      `Four months after you pulled Lily from that cave.\n\nDerek Vance is awaiting trial — fifteen counts, child services evidence, the crew's testimony, and a seven-year-old's meticulous notebook. His lawyer has been trying to have the notebook inadmissible. The judge has been unmoved.\n\nThe sheriff resigned in lieu of investigation. A federal audit of ${v.names?.sheriffName ?? 'his'} department is ongoing.\n\nKelvin Marsh received a formal apology. He's framed it and hung it in his sister's office next to a photo of Lily eating that chicken soup.\n\nLily Harrow is safe. In school. New town. New name, temporarily. She has begun, apparently, keeping a second notebook.\n\nYou close the case file. It's the thickest one you've ever worked.`,
    ar: (v) =>
      `بعد أربعة أشهر من سحبك ليلى من ذلك الكهف.\n\nديريك فانس ينتظر المحاكمة — خمسة عشر تهمة، أدلة خدمات الأطفال، شهادة الطاقم، ودفتر طفلة في السابعة دقيق. يحاول محاميه رفض الدفتر كدليل. القاضي لم يتحرك.\n\nالشريف استقال بدلًا من التحقيق. مراجعة فيدرالية لقسم ${v.names?.sheriffName ?? 'قسمه'} جارية.\n\nكيلفين مارش تلقى اعتذارًا رسميًا. وضعه في إطار وعلّقه في مكتب أخته بجانب صورة ليلى تأكل شوربة الدجاج.\n\nليلى هارو بأمان. في المدرسة. مدينة جديدة. اسم جديد، مؤقتًا. بدأت، على ما يبدو، الاحتفاظ بدفتر ثانٍ.\n\nتغلق ملف القضية. إنه أسمكها منذ أن بدأت العمل.`,
    isEnding: true,
    endingType: 'success',
  },

  {
    id: 'm_ending_secret',
    en: () =>
      `You sit across from Lily at the crisis center. Dr. Anna Marsh gives you ten minutes alone.\n\nYou tell her you understand what she did. The full picture.\n\nShe listens. Chews her sandwich. Looks at you with those old, measuring eyes.\n\n"I knew no one would look if nothing happened," she says. "So I made something happen."\n\n"You made yourself the evidence."\n\nShe nods.\n\n"Did it work?"\n\nYou think about Derek's face across the table. The sheriff's resignation. Kelvin's apology. The four other cases in Greyvale now being reviewed as a result of the systemic audit.\n\n"Yes," you tell her. "It worked."\n\nShe nods again. And goes back to her sandwich.\n\nYou write in your report a note for the official record: "This case was solved by a cooperative seven-year-old who understood the system better than the adults entrusted with protecting her."`,
    ar: () =>
      `تجلس أمام ليلى في مركز الأزمات. الدكتورة آنا مارش تمنحك عشر دقائق وحدًا.\n\nتخبرها أنك تفهم ما فعلته. الصورة الكاملة.\n\nتستمع. تمضغ شطيرتها. تنظر إليك بتلك العيون القديمة والمقيِّمة.\n\n"كنت أعرف أنه لن ينظر أحد إذا لم يحدث شيء،" تقول. "لذا جعلت شيئًا يحدث."\n\n"جعلت من نفسك الدليل."\n\nتومئ.\n\n"هل نجح الأمر؟"\n\nتفكر في وجه ديريك عبر الطاولة. استقالة الشريف. اعتذار كيلفين. أربع قضايا أخرى في غرايفيل تجري مراجعتها الآن نتيجة التدقيق المنهجي.\n\n"نعم،" تخبرها. "نجح."\n\nتومئ مجددًا. وتعود إلى شطيرتها.\n\nتكتب في تقريرك ملاحظة للسجل الرسمي: "حُلّت هذه القضية بمساعدة طفلة سبعية تفاعلت وفهمت النظام بشكل أفضل من الكبار الموكلين بحمايتها."`,
    isEnding: true,
    endingType: 'secret',
  },

  {
    id: 'm_ending_death',
    en: () =>
      `You went to the lighthouse alone, without backup, with Derek already knowing you were coming.\n\nThe cliff path is narrow. The sea is loud. Your call log doesn't show your exact location.\n\nThey find your badge two days later, washed up in the cove. Your body takes longer.\n\nDerek Vance holds a candlelight vigil for you in the town square. He gives a speech about the dangers detectives face. He cries on command.\n\nThe case is closed. Lily is found — eventually — on the mainland, having escaped on her own anyway. But without your report and your testimony, Derek faces minor charges. He is released on bail. He returns to Greyvale.\n\nLily Harrow is relocated again. She stops keeping notebooks. She stops trusting adults.\n\nYou were the best chance she had.`,
    ar: () =>
      `ذهبت إلى المنارة وحدك، بلا دعم، مع علم ديريك بالفعل بأنك قادم.\n\nدرب المنحدر ضيق. البحر صاخب. سجل مكالماتك لا يُظهر موقعك الدقيق.\n\nيجدون شارتك بعد يومين، ملقاة على الشاطئ في الخليج. جثتك تأخذ وقتًا أطول.\n\nديريك فانس ينظم سهرة شموع لك في ساحة المدينة. يلقي خطابًا عن المخاطر التي يواجهها المحققون. يبكي على الأمر.\n\nتُغلق القضية. ليلى تُوجد — في نهاية المطاف — في البر الرئيسي، كانت هربت بمفردها في كل الأحوال. لكن بدون تقريرك وشهادتك، لا يواجه ديريك سوى تهم صغيرة. يُطلق سراحه بكفالة. يعود إلى غرايفيل.\n\nتُنقل ليلى هارو مجددًا. تتوقف عن الاحتفاظ بالدفاتر. تتوقف عن الوثوق بالكبار.\n\nكنت أفضل فرصة كانت لديها.`,
    isEnding: true,
    endingType: 'death',
  },

  {
    id: 'm_lily_secret_ending_rev',
    en: () => `Lily was never lost. And you are about to understand the full shape of what she built.`,
    ar: () => `لم تكن ليلى ضائعة قط. وأنت على وشك فهم الشكل الكامل لما بنته.`,
    choices: [
      {
        id: 'm_lser_listen',
        en: () => 'Listen to everything she has to tell you',
        ar: () => 'استمع لكل ما لديها لتخبرك به',
        next: 'm_lily_secret_ending',
        effects: {},
      },
      {
        id: 'm_lser_end',
        en: () => 'You already understand — proceed to close the case',
        ar: () => 'أنت تفهم بالفعل — تابع لإغلاق القضية',
        next: 'm_ending_success',
        effects: {},
      },
      {
        id: 'm_lser_arrest',
        en: () => 'Deal with Derek first',
        ar: () => 'تعامل مع ديريك أولًا',
        next: 'm_derek_arrest',
        effects: {},
      },
      {
        id: 'm_lser_report',
        en: () => 'File the systemic report',
        ar: () => 'قدّم التقرير المنهجي',
        next: 'm_ending_secret',
        effects: {},
      },
    ],
  },
];

const story_mystery = {
  id: 'mystery',
  theme: 'mystery',
  startNode: 'm_start',
  initialVars: {
    trust: 0,
    clues: 0,
    suspectsExamined: 0,
    alibisBroken: 0,
    warrenCleared: false,
    kelvinCleared: false,
    derekSuspected: false,
    waryOfSheriff: false,
    knowsNote: false,
    hasNotebook: false,
    hasMap: false,
    hidingEvidence: false,
    race: false,
    safePath: false,
    names: {},
  },
  nameRequests: {
    sheriffName: {
      promptEn: 'The local sheriff is your main point of contact. What is his name?',
      promptAr: 'الشريف المحلي هو نقطة اتصالك الرئيسية. ما اسمه؟',
    },
    witnessName: {
      promptEn: 'Lily mentioned a friend who helped her make a plan. What was her friend\'s name?',
      promptAr: 'ذكرت ليلى صديقة ساعدتها في وضع خطة. ما اسم صديقتها؟',
    },
  },
  nodes,
};

export default story_mystery;
