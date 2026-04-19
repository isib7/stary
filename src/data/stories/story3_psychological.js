/**
 * STORY 3: Mirror Talk (Psychological Thriller)
 * Variables: memories[], trust, realityScore, medicationTaken, doctorMode, identityKnown
 * Named characters: doctorName (Dr. Elias), otherName (The Other)
 * Endings:
 *   success  → Remembered truth, escaped the ward
 *   death    → Given lethal injection "for your own good"
 *   failure  → Fully broken, believes the delusion forever
 *   secret   → You WERE the doctor all along — treating yourself
 */

const nodes = [
  // ── WAKING ────────────────────────────────────────────────────────────────────
  {
    id: 'p_start',
    en: () =>
      `White ceiling. White walls. The smell of antiseptic and something floral that is trying too hard.\n\nYou are lying in a bed with rails. There is a window — frosted glass — and light that could be morning or afternoon. Your head feels like a room that has been emptied.\n\nYou don't know your name.\n\nNot in the amnesia-thriller sense. Not "I forgot." More like: the slot where your name lives is present but empty. Like a drawer you know you own but cannot open.\n\nA door opens. Soft shoes. A clipboard.\n\n"Good. You're awake," says the person. "How do you feel?"`,
    ar: () =>
      `سقف أبيض. جدران بيضاء. رائحة المطهر وشيء زهري يبذل جهدًا زائدًا.\n\nأنت مستلقٍ في سرير مزود بقضبان. هناك نافذة — زجاج مثلج — وضوء قد يكون صباحًا أو بعد الظهر. رأسك يشعر كغرفة قد أُفرغت.\n\nلا تعرف اسمك.\n\nليس بالمعنى الإثارة-النسيان. ليس "نسيت." أشبه بـ: الفتحة التي يعيش فيها اسمك موجودة لكنها فارغة. كدرج تعرف أنك تملكه لكن لا تستطيع فتحه.\n\nيفتح باب. أحذية ناعمة. حافظة.\n\n"جيد. أنت مستيقظ،" يقول الشخص. "كيف حالك؟"`,
    choices: [
      {
        id: 'p_s_ask_where',
        en: () => '"Where am I?"',
        ar: () => '"أين أنا؟"',
        next: 'p_first_answer',
        effects: {},
      },
      {
        id: 'p_s_ask_who',
        en: () => '"Who are you?"',
        ar: () => '"من أنت؟"',
        next: 'p_first_answer',
        effects: {},
      },
      {
        id: 'p_s_silent',
        en: () => 'Say nothing — study the person carefully',
        ar: () => 'لا تقل شيئًا — ادرس الشخص بعناية',
        next: 'p_observe_arrival',
        effects: { realityScore: 1 },
      },
      {
        id: 'p_s_name',
        en: () => 'Ask: "What is my name?"',
        ar: () => 'اسأل: "ما اسمي؟"',
        next: 'p_name_question',
        effects: {},
      },
    ],
  },

  {
    id: 'p_first_answer',
    requiresName: 'doctorName',
    en: (v) =>
      `"You're in St. Adalyn's," they say. "A psychiatric care facility. I'm Dr. ${v.names?.doctorName ?? 'Elias'}. You came to us three weeks ago." A pause. "You were in significant distress."\n\nThey sit. The clipboard stays on the table, face-down.\n\n"Do you remember anything? Anything at all from before you came here?"`,
    ar: (v) =>
      `"أنت في مستشفى سانت أدالِن،" يقولون. "منشأة للرعاية النفسية. أنا الدكتور ${v.names?.doctorName ?? 'إلياس'}. جئت إلينا قبل ثلاثة أسابيع." توقف. "كنت في ضائقة شديدة."\n\nيجلسون. تبقى الحافظة على الطاولة، مواجهةً للأسفل.\n\n"هل تتذكر أي شيء؟ أي شيء على الإطلاق من قبل مجيئك إلى هنا؟"`,
    choices: [
      {
        id: 'p_fa_nothing',
        en: () => '"Nothing. Completely blank."',
        ar: () => '"لا شيء. فراغ تام."',
        next: 'p_first_session',
        effects: { trust: 1 },
      },
      {
        id: 'p_fa_fragments',
        en: () => '"Fragments. A hallway. Someone running."',
        ar: () => '"شظايا. ممر. شخص يجري."',
        next: 'p_fragment_memory',
        effects: { memories: 1 },
      },
      {
        id: 'p_fa_observe',
        en: () => 'Observe Dr. Elias carefully instead of answering',
        ar: () => 'راقب الدكتور بعناية بدلًا من الإجابة',
        next: 'p_observe_arrival',
        effects: { realityScore: 1 },
      },
      {
        id: 'p_fa_distrust',
        en: () => '"Why is the clipboard face-down?"',
        ar: () => '"لماذا الحافظة مواجهة للأسفل؟"',
        next: 'p_clipboard_question',
        effects: { trust: -1, realityScore: 1 },
      },
    ],
  },

  {
    id: 'p_name_question',
    requiresName: 'doctorName',
    en: (v) =>
      `Dr. ${v.names?.doctorName ?? 'Elias'} pauses — just long enough to be noticeable — before answering.\n\n"Your admission records give your name. But I'd like YOU to try to tell me first. Part of the recovery process is accessing your own memories, not having them given to you."\n\nThey say this warmly. Clinically. You notice they aren't answering the question.\n\nYour name. Your own name. It should be the most available thing. And it isn't.`,
    ar: (v) =>
      `الدكتور ${v.names?.doctorName ?? 'إلياس'} يتوقف — مدة كافية فقط للملاحظة — قبل الإجابة.\n\n"سجلات قبولك تعطي اسمك. لكنني أريد أن تحاول أنت أن تخبرني أولًا. جزء من عملية التعافي هو الوصول إلى ذاكرتك الخاصة، لا الحصول عليها من جهات خارجية."\n\nيقولون هذا بدفء. بأسلوب سريري. تلاحظ أنهم لا يجيبون على السؤال.\n\nاسمك. اسمك الخاص. يجب أن يكون الشيء الأكثر توفرًا. وليس كذلك.`,
    choices: [
      {
        id: 'p_nq_try',
        en: () => 'Try to access your name — focus hard',
        ar: () => 'حاول الوصول إلى اسمك — ركز بشدة',
        next: 'p_name_attempt',
        effects: { memories: 1 },
      },
      {
        id: 'p_nq_demand',
        en: () => '"Tell me. From the records. Now."',
        ar: () => '"أخبرني. من السجلات. الآن."',
        next: 'p_first_session',
        effects: { trust: -1 },
      },
      {
        id: 'p_nq_observe',
        en: () => 'Study Dr. Elias\'s expression while processing this',
        ar: () => 'ادرس تعبير الدكتور أثناء معالجة هذا',
        next: 'p_observe_arrival',
        effects: { realityScore: 1 },
      },
      {
        id: 'p_nq_cooperate',
        en: () => '"Fine. Tell me about where I am first."',
        ar: () => '"حسنًا. أخبرني عن المكان الذي أنا فيه أولًا."',
        next: 'p_ward_explained',
        effects: {},
      },
    ],
  },

  {
    id: 'p_observe_arrival',
    en: (v) =>
      `You watch Dr. ${v.names?.doctorName ?? 'Elias'} without speaking.\n\nThings you notice:\n— Their badge is on the right side. Most medical professionals wear it on the left.\n— There's a slight mark on their left wrist, partially covered by their sleeve. Old. Deliberate.\n— They have a second key on their lanyard that doesn't match the facility's standard issue. Different manufacturer.\n— When they sit, they arrange their posture with the precision of someone who has thought about how to sit in this room many times before.\n\nThey are professional. Completely. Perhaps too completely.`,
    ar: (v) =>
      `تراقب الدكتور ${v.names?.doctorName ?? 'إلياس'} دون كلام.\n\nأشياء تلاحظها:\n— شارتهم على الجانب الأيمن. معظم المتخصصين الطبيين يضعونها على اليسار.\n— هناك علامة خفيفة على معصمهم الأيسر، مغطاة جزئيًا بالكم. قديمة. متعمدة.\n— لديهم مفتاح ثانٍ على الحزام لا يطابق إصدار المنشأة القياسي. مصنّع مختلف.\n— حين يجلسون، يرتبون وضعيتهم بدقة شخص فكّر كثيرًا في كيفية الجلوس في هذه الغرفة من قبل.\n\nهم محترفون. تمامًا. ربما باحترافية مفرطة.`,
    choices: [
      {
        id: 'p_oa_badge',
        en: () => '"Your badge is on the wrong side."',
        ar: () => '"شارتك على الجانب الخاطئ."',
        next: 'p_badge_response',
        effects: { realityScore: 1, trust: -1 },
      },
      {
        id: 'p_oa_key',
        en: () => '"That second key on your lanyard — what does it open?"',
        ar: () => '"ذلك المفتاح الثاني في حزامك — ماذا يفتح؟"',
        next: 'p_key_question',
        effects: { realityScore: 2, trust: -1 },
      },
      {
        id: 'p_oa_wrist',
        en: () => 'Point to their wrist — say nothing',
        ar: () => 'أشر إلى معصمهم — لا تقل شيئًا',
        next: 'p_wrist_moment',
        effects: { realityScore: 1 },
      },
      {
        id: 'p_oa_cooperate',
        en: () => 'Decide to cooperate for now — get more information first',
        ar: () => 'قرر التعاون في الوقت الحالي — احصل على مزيد من المعلومات أولًا',
        next: 'p_first_session',
        effects: { trust: 1 },
      },
    ],
  },

  // First therapy session
  {
    id: 'p_first_session',
    en: (v) =>
      `Dr. ${v.names?.doctorName ?? 'Elias'} runs the first session gently. You answer questions. They take notes, clipboard now face-up but angled so you can't read it.\n\nThe session covers: childhood (blank), family (blank), profession (almost — something about a gray building and people looking to you for answers), last memory (nothing clear).\n\nAt the end, they offer medication. "Something to help with the anxiety. It's mild. It will help you sleep."\n\nThey set the small cup on the table and wait.`,
    ar: (v) =>
      `يدير الدكتور ${v.names?.doctorName ?? 'إلياس'} الجلسة الأولى بلطف. تجيب على الأسئلة. يأخذون ملاحظات، الحافظة الآن مواجهة للأعلى لكنها بزاوية لا تستطيع قراءتها.\n\nتغطي الجلسة: الطفولة (فراغ)، العائلة (فراغ)، المهنة (تقريبًا — شيء ما عن مبنى رمادي وناس ينظرون إليك لإيجاد إجابات)، الذكرى الأخيرة (لا شيء واضح).\n\nفي النهاية، يعرضون دواءً. "شيء يساعد على القلق. خفيف. سيساعدك على النوم."\n\nيضعون كوبًا صغيرًا على الطاولة وينتظرون.`,
    choices: [
      {
        id: 'p_fs_take',
        en: () => 'Take the medication',
        ar: () => 'خذ الدواء',
        next: 'p_medicated',
        effects: { trust: 1, medicationTaken: 1 },
      },
      {
        id: 'p_fs_refuse',
        en: () => 'Refuse — you want to keep your mind clear',
        ar: () => 'ارفض — تريد إبقاء عقلك صافيًا',
        next: 'p_refuse_meds',
        effects: { trust: -1, medicationTaken: 0 },
      },
      {
        id: 'p_fs_pretend',
        en: () => 'Pretend to take it but hide it under your tongue',
        ar: () => 'تظاهر بأخذه لكن أخفِه تحت لسانك',
        next: 'p_fake_meds',
        effects: { trust: 1, medicationTaken: 0, realityScore: 2 },
      },
      {
        id: 'p_fs_ask',
        en: () => 'Ask what medication it is exactly',
        ar: () => 'اسأل ما هو الدواء بالضبط',
        next: 'p_med_question',
        effects: { trust: -1 },
      },
    ],
  },

  {
    id: 'p_medicated',
    en: (v) =>
      `You take the medication.\n\nSleep comes heavily. Then dreams — or what feel like dreams.\n\nA hallway. Longer than any hallway should be. At the end, a door with a nameplate. The nameplate has letters but when you try to read them they rearrange.\n\nYou wake up knowing one thing: someone is watching you sleep.\n\nDr. ${v.names?.doctorName ?? 'Elias'} is in the chair beside your bed. Sitting completely still. Not asleep. The lights are off but they are watching you in the dark.`,
    ar: (v) =>
      `تأخذ الدواء.\n\nيأتي النوم بثقل. ثم أحلام — أو ما يشعر كأحلام.\n\nممر. أطول من أي ممر ينبغي أن يكون. في النهاية، باب بلافتة اسم. اللافتة بها أحرف لكن حين تحاول قراءتها تعيد ترتيب نفسها.\n\nتستيقظ وأنت تعرف شيئًا واحدًا: أحدهم يراقبك وأنت نائم.\n\nالدكتور ${v.names?.doctorName ?? 'إلياس'} في الكرسي بجانب سريرك. جالس في سكون تام. لا نائم. الأضواء مطفأة لكنهم يراقبونك في الظلام.`,
    choices: [
      {
        id: 'p_med_ask',
        en: (v) => `"Dr. ${v.names?.doctorName ?? 'Elias'}, what are you doing?"`,
        ar: (v) => `"دكتور ${v.names?.doctorName ?? 'إلياس'}، ماذا تفعل؟"`,
        next: 'p_watched_confrontation',
        effects: { trust: -1, realityScore: 1 },
      },
      {
        id: 'p_med_pretend',
        en: () => 'Pretend to still be asleep — watch them watching you',
        ar: () => 'تظاهر بأنك لا تزال نائمًا — راقبهم وهم يراقبونك',
        next: 'p_watched_observation',
        effects: { realityScore: 2 },
      },
      {
        id: 'p_med_cough',
        en: () => 'Cough — give them a chance to pretend they weren\'t watching',
        ar: () => 'سعّل — امنحهم فرصة للتظاهر بأنهم لم يكونوا يراقبون',
        next: 'p_watched_confrontation',
        effects: { trust: 0 },
      },
      {
        id: 'p_med_remember',
        en: () => 'Lie still — try to hold onto the dream memory. The hallway. The door.',
        ar: () => 'ابقَ ساكنًا — حاول الإمساك بذكرى الحلم. الممر. الباب.',
        next: 'p_dream_memory',
        effects: { memories: 1 },
      },
    ],
  },

  {
    id: 'p_refuse_meds',
    en: (v) =>
      `Dr. ${v.names?.doctorName ?? 'Elias'} does not argue. They note something on the clipboard. Quietly.\n\n"That's fine. You're in control of your treatment."\n\nThat night, someone else brings you the medication again — a nurse you haven't seen before, with a flat professional smile and no explanation.\n\nYou ask the same question: "What is it?" They say: "It's what the doctor prescribed."\n\nYou are in a place where not taking the medicine is a documented behavior. Watch yourself.`,
    ar: (v) =>
      `الدكتور ${v.names?.doctorName ?? 'إلياس'} لا يجادل. يسجلون شيئًا في الحافظة. بهدوء.\n\n"هذا جيد. أنت المتحكم في علاجك."\n\nفي تلك الليلة، يأتيك شخص آخر بالدواء مجددًا — ممرض لم تره من قبل، بابتسامة مهنية مسطحة ودون تفسير.\n\nتطرح السؤال ذاته: "ما هو؟" يقولون: "إنه ما وصفه الطبيب."\n\nأنت في مكان يُعدّ فيه عدم أخذ الدواء سلوكًا موثقًا. راقب نفسك.`,
    choices: [
      {
        id: 'p_rm_take_now',
        en: () => 'Take it this time — you need to trust something',
        ar: () => 'خذه هذه المرة — تحتاج الثقة بشيء ما',
        next: 'p_medicated',
        effects: { trust: 1, medicationTaken: 1 },
      },
      {
        id: 'p_rm_refuse_again',
        en: () => 'Refuse again — consistently',
        ar: () => 'ارفض مجددًا — باتساق',
        next: 'p_consistently_refusing',
        effects: { trust: -2, medicationTaken: 0 },
      },
      {
        id: 'p_rm_fake',
        en: () => 'Accept but fake taking it',
        ar: () => 'اقبل لكن تظاهر بأخذه',
        next: 'p_fake_meds',
        effects: { trust: 1, medicationTaken: 0, realityScore: 1 },
      },
      {
        id: 'p_rm_explore',
        en: () => 'Look at what the nurse leaves behind',
        ar: () => 'انظر إلى ما يتركه الممرض خلفه',
        next: 'p_nurse_clue',
        effects: { realityScore: 2 },
      },
    ],
  },

  {
    id: 'p_fake_meds',
    en: () =>
      `You hide the pill under your tongue. Wait until they leave. Spit it into the trash.\n\nYour mind stays sharp. Sharper, in fact, than the hours when you first woke up.\n\nAt 2:17 AM, the floor outside your room creaks. Then silence. Then the door handle moves — slowly, tentatively — and then stops.\n\nNothing comes in. But something was deciding whether to.`,
    ar: () =>
      `تخفي الحبة تحت لسانك. تنتظر حتى يغادروا. تبصقها في سلة المهملات.\n\nعقلك يبقى حادًا. أحد في الحقيقة، مقارنة بالساعات التي استيقظت فيها أولًا.\n\nعند الساعة 2:17 صباحًا، يطقطق الممر خارج غرفتك. ثم صمت. ثم مقبض الباب يتحرك — ببطء، بتردد — ثم يتوقف.\n\nلا شيء يدخل. لكن شيئًا ما كان يقرر إذا كان سيفعل.`,
    choices: [
      {
        id: 'p_fm_door',
        en: () => 'Go to the door — look out',
        ar: () => 'اذهب إلى الباب — انظر للخارج',
        next: 'p_midnight_corridor',
        effects: { realityScore: 1 },
      },
      {
        id: 'p_fm_wait',
        en: () => 'Stay still — don\'t reveal you\'re awake',
        ar: () => 'ابقَ ساكنًا — لا تكشف أنك مستيقظ',
        next: 'p_watched_observation',
        effects: { realityScore: 2 },
      },
      {
        id: 'p_fm_call',
        en: () => 'Press the call button — summon a nurse',
        ar: () => 'اضغط على زر الاستدعاء — استدعِ ممرضًا',
        next: 'p_nurse_summoned',
        effects: { trust: 0 },
      },
      {
        id: 'p_fm_sleep',
        en: () => 'Try to sleep — you can\'t do anything without more information',
        ar: () => 'حاول النوم — لا تستطيع فعل شيء بدون مزيد من المعلومات',
        next: 'p_morning_two',
        effects: {},
      },
    ],
  },

  {
    id: 'p_med_question',
    en: (v) =>
      `"Haloperidol and a mild anxiolytic," Dr. ${v.names?.doctorName ?? 'Elias'} says. "Both standard. Both in low dose."\n\nHaloperidol. An antipsychotic. You know this word. You know what it's used for.\n\nAnd you realize: you know the word. You know what it's for. You have a frame of reference.\n\nSomeone who knows what haloperidol is, is treated with haloperidol, in a psychiatric ward.`,
    ar: (v) =>
      `"هالوبيريدول ومضاد قلق خفيف،" يقول الدكتور ${v.names?.doctorName ?? 'إلياس'}. "كلاهما قياسيان. كلاهما بجرعة منخفضة."\n\nهالوبيريدول. مضاد ذهان. تعرف هذه الكلمة. تعرف ما تُستخدم من أجله.\n\nوتدرك: أنت تعرف الكلمة. تعرف ما هي من أجله. لديك إطار مرجعي.\n\nشخص يعرف ما هو الهالوبيريدول، يُعالج بالهالوبيريدول، في جناح طب نفسي.`,
    choices: [
      {
        id: 'p_mq_take',
        en: () => 'Take the medication — process this later',
        ar: () => 'خذ الدواء — عالج هذا لاحقًا',
        next: 'p_medicated',
        effects: { trust: 1, medicationTaken: 1 },
      },
      {
        id: 'p_mq_refuse',
        en: () => 'Refuse — this knowledge means something',
        ar: () => 'ارفض — هذه المعرفة تعني شيئًا',
        next: 'p_refuse_meds',
        effects: { trust: -1, realityScore: 2 },
      },
      {
        id: 'p_mq_professional',
        en: () => '"I know what haloperidol is. Why do I know that?"',
        ar: () => '"أعرف ما هو الهالوبيريدول. لماذا أعرف ذلك؟"',
        next: 'p_professional_memory',
        effects: { memories: 2, realityScore: 1 },
      },
      {
        id: 'p_mq_fake',
        en: () => 'Pretend to take it — but keep your mind clear',
        ar: () => 'تظاهر بأخذه — لكن أبقِ عقلك صافيًا',
        next: 'p_fake_meds',
        effects: { realityScore: 2 },
      },
    ],
  },

  // Observations and memory fragments
  {
    id: 'p_fragment_memory',
    en: (v) =>
      `"Tell me about the hallway," Dr. ${v.names?.doctorName ?? 'Elias'} says.\n\nYou describe it. Long. Institutional lighting. Doors on both sides. Numbered.\n\n"What numbers?"\n\nThe effort is like pressing a bruise. "Four hundreds. 401, 402..."\n\n"Were you visiting someone?"\n\nA pause in your own memory — not blankness. More like: a deliberate redaction. Like something has been removed and the edges smoothed over.\n\n"I don't think I was visiting."`,
    ar: (v) =>
      `"أخبرني عن الممر،" يقول الدكتور ${v.names?.doctorName ?? 'إلياس'}.\n\nتصفه. طويل. إضاءة مؤسسية. أبواب على كلا الجانبين. مرقّمة.\n\n"ما الأرقام؟"\n\nالجهد مثل الضغط على كدمة. "أربعمائة. 401، 402..."\n\n"هل كنت تزور أحدًا؟"\n\nتوقف في ذاكرتك الخاصة — ليس فراغًا. أشبه بـ: شطب متعمد. كأن شيئًا ما أُزيل ونُعّمت الحواف.\n\n"لا أعتقد أنني كنت أزور أحدًا."`,
    choices: [
      {
        id: 'p_fm2_push',
        en: () => 'Push the memory — what were you doing in that hallway?',
        ar: () => 'ادفع الذاكرة — ماذا كنت تفعل في ذلك الممر؟',
        next: 'p_memory_push',
        effects: { memories: 1 },
      },
      {
        id: 'p_fm2_elias',
        en: (v) => `Ask Dr. ${v.names?.doctorName ?? 'Elias'} what they know about you`,
        ar: (v) => `اسأل الدكتور ${v.names?.doctorName ?? 'إلياس'} ما يعرفه عنك`,
        next: 'p_doctor_knows',
        effects: { trust: 0 },
      },
      {
        id: 'p_fm2_other',
        en: () => 'Was there someone else in the hallway? Think.',
        ar: () => 'هل كان هناك شخص آخر في الممر؟ فكّر.',
        next: 'p_other_appears',
        effects: { memories: 1 },
      },
      {
        id: 'p_fm2_meds',
        en: () => 'Accept the medication — maybe it will help unlock memories',
        ar: () => 'اقبل الدواء — ربما يساعد في فتح الذكريات',
        next: 'p_first_session',
        effects: {},
      },
    ],
  },

  {
    id: 'p_professional_memory',
    en: () =>
      `You sit with the knowledge: you know haloperidol. You know Diagnostic Statistical Manuals. You know the correct term for "blunted affect."\n\nYou didn't learn this as a patient.\n\nA cold room. A mahogany desk. Your name on a placard — you can almost see it. People sitting across from you, telling you terrible things, and you writing them down.\n\nYou were not the one on the couch.`,
    ar: () =>
      `تجلس مع المعرفة: أنت تعرف الهالوبيريدول. تعرف الدلائل التشخيصية الإحصائية. تعرف المصطلح الصحيح لـ"التأثير المكتسب."\n\nلم تتعلم هذا كمريض.\n\nغرفة باردة. مكتب خشب ماهوجاني. اسمك على لافتة — تكاد ترى ذلك. أناس يجلسون أمامك، يخبرونك بأشياء فظيعة، وأنت تدوّنها.\n\nلم تكن أنت من يجلس على الأريكة.`,
    choices: [
      {
        id: 'p_pm_elias',
        en: (v) => `Confront Dr. ${v.names?.doctorName ?? 'Elias'} with this`,
        ar: (v) => `واجه الدكتور ${v.names?.doctorName ?? 'إلياس'} بهذا`,
        next: 'p_doctor_confrontation',
        effects: { realityScore: 2, trust: -1 },
      },
      {
        id: 'p_pm_room',
        en: () => 'Try to remember the room — feel your way into that memory',
        ar: () => 'حاول تذكر الغرفة — اشعر طريقك في تلك الذكرى',
        next: 'p_office_memory',
        effects: { memories: 2 },
      },
      {
        id: 'p_pm_records',
        en: () => 'Get access to your medical records — you have a right to them',
        ar: () => 'احصل على الوصول إلى سجلاتك الطبية — لديك الحق بها',
        next: 'p_records_request',
        effects: { realityScore: 1 },
      },
      {
        id: 'p_pm_other',
        en: () => 'There\'s another person here — the one you keep glimpsing',
        ar: () => 'هناك شخص آخر هنا — الذي تلمحه باستمرار',
        next: 'p_other_appears',
        effects: { memories: 1 },
      },
    ],
  },

  {
    id: 'p_clipboard_question',
    en: (v) =>
      `Dr. ${v.names?.doctorName ?? 'Elias'} pauses.\n\nThen turns the clipboard over. It shows your admission form. Name: REDACTED (standard procedure while memory is unstable). Admitting diagnosis: dissociative identity response with episodic delusional ideation.\n\n"We use face-down to avoid anchoring patients to their diagnosis before they've had a chance to experience their own reality," they say. "It's a standard protocol."\n\nIt IS a real protocol. But the admitting diagnosis. Delusional ideation. They have already decided something about you.`,
    ar: (v) =>
      `يتوقف الدكتور ${v.names?.doctorName ?? 'إلياس'}.\n\nثم يقلب الحافظة. تُظهر استمارة قبولك. الاسم: محجوب (إجراء قياسي أثناء عدم استقرار الذاكرة). تشخيص القبول: استجابة هوية تفارقية مع أوهام فكرية نوبية.\n\n"نستخدم المواجهة للأسفل لتجنب تثبيت المرضى على تشخيصهم قبل أن تتاح لهم الفرصة لتجربة واقعهم الخاص،" يقولون. "إنه بروتوكول قياسي."\n\nإنه بروتوكول حقيقي فعلًا. لكن تشخيص القبول. أوهام فكرية. لقد قرروا بالفعل شيئًا عنك.`,
    choices: [
      {
        id: 'p_cq_accept',
        en: () => 'Accept this explanation — cooperate',
        ar: () => 'اقبل هذا التفسير — تعاون',
        next: 'p_first_session',
        effects: { trust: 1 },
      },
      {
        id: 'p_cq_push',
        en: () => '"Delusional ideation. What delusions specifically do I have?"',
        ar: () => '"أوهام فكرية. ما هي الأوهام المحددة لديّ؟"',
        next: 'p_delusion_detail',
        effects: { realityScore: 1, trust: -1 },
      },
      {
        id: 'p_cq_name',
        en: () => '"Why is my name redacted?"',
        ar: () => '"لماذا اسمي محجوب؟"',
        next: 'p_name_redacted',
        effects: { realityScore: 2 },
      },
      {
        id: 'p_cq_observe',
        en: () => 'Study the form — look for any name or identifying detail',
        ar: () => 'ادرس الاستمارة — ابحث عن أي اسم أو تفصيل معرِّف',
        next: 'p_form_examine',
        effects: { realityScore: 2, memories: 1 },
      },
    ],
  },

  // The Other character
  {
    id: 'p_other_appears',
    requiresName: 'otherName',
    en: (v) =>
      `You see them in the corridor outside your room. Another patient — except they don't move like a patient. They move with certainty, with direction. They stop outside your window. Look in.\n\nThen they're gone.\n\nThe next session, you ask Dr. ${v.names?.doctorName ?? 'Elias'}: "Who is the person in room 412?"\n\nA pause. "There is no patient in room 412."\n\n"I saw someone."\n\n"We can talk about what you saw."\n\nYou call the person ${v.names?.otherName ?? 'The Other'}.`,
    ar: (v) =>
      `تراهم في الممر خارج غرفتك. مريض آخر — إلا أنهم لا يتحركون كمريض. يتحركون بثقة، باتجاه. يتوقفون خارج نافذتك. ينظرون للداخل.\n\nثم يختفون.\n\nفي الجلسة التالية، تسأل الدكتور ${v.names?.doctorName ?? 'إلياس'}: "من الشخص في غرفة 412؟"\n\nتوقف. "لا يوجد مريض في غرفة 412."\n\n"رأيت أحدًا."\n\n"يمكننا التحدث عما رأيت."\n\nتسمي الشخص ${v.names?.otherName ?? 'الآخر'}.`,
    choices: [
      {
        id: 'p_oa2_find',
        en: (v) => `Find ${v.names?.otherName ?? 'The Other'} — seek them out`,
        ar: (v) => `اجد ${v.names?.otherName ?? 'الآخر'} — ابحث عنهم`,
        next: 'p_find_other',
        effects: { realityScore: 1 },
      },
      {
        id: 'p_oa2_accept',
        en: (v) => `Accept Dr. ${v.names?.doctorName ?? 'Elias'}\'s explanation — maybe you imagined it`,
        ar: (v) => `اقبل تفسير الدكتور ${v.names?.doctorName ?? 'إلياس'} — ربما تخيّلت ذلك`,
        next: 'p_first_session',
        effects: { trust: 1, realityScore: -1 },
      },
      {
        id: 'p_oa2_record',
        en: () => 'Write down everything you saw — keep a private record',
        ar: () => 'دوّن كل ما رأيت — احتفظ بسجل خاص',
        next: 'p_private_record',
        effects: { realityScore: 2, memories: 1 },
      },
      {
        id: 'p_oa2_night',
        en: () => 'Wait until night — they might return',
        ar: () => 'انتظر حتى الليل — ربما يعودون',
        next: 'p_midnight_corridor',
        effects: { realityScore: 1 },
      },
    ],
  },

  {
    id: 'p_find_other',
    en: (v) =>
      `You find ${v.names?.otherName ?? 'The Other'} in the recreation room — a large, low-lit space with mismatched chairs and a television showing something soundless.\n\nThey see you coming. They sit perfectly still, which is not the stillness of fear.\n\nYou sit across from them.\n\n"You're the new one," they say. Not a question.\n\n"How long have you been here?"\n\n"Longer."\n\nThey look at you with an expression you can't place. Not pity. Not recognition. Something like anticipation.\n\n"They haven't told you yet," they say. "Of course they haven't."`,
    ar: (v) =>
      `تجد ${v.names?.otherName ?? 'الآخر'} في غرفة الاستجمام — مساحة كبيرة ذات إضاءة خافتة بكراسٍ غير متطابقة وتلفزيون يعرض شيئًا بلا صوت.\n\nيرونك قادمًا. يجلسون في سكون تام، وهو ليس سكون الخوف.\n\nتجلس أمامهم.\n\n"أنت القادم الجديد،" يقولون. ليس سؤالًا.\n\n"كم مضى عليك هنا؟"\n\n"أطول."\n\nينظرون إليك بتعبير لا تستطيع وصفه. ليس شفقة. ليس معرفة. شيء أشبه بالترقب.\n\n"لم يخبروك بعد،" يقولون. "بالطبع لم يخبروك."`,
    choices: [
      {
        id: 'p_fo_ask',
        en: () => '"Tell me. What haven\'t they told me?"',
        ar: () => '"أخبرني. ماذا لم يخبروني؟"',
        next: 'p_other_revelation',
        effects: { realityScore: 1 },
      },
      {
        id: 'p_fo_trust',
        en: () => '"Why should I trust anything you say over what the doctor tells me?"',
        ar: () => '"لماذا يجب أن أثق بأي شيء تقوله أكثر مما يخبرني به الطبيب؟"',
        next: 'p_other_trust_question',
        effects: { trust: 1, realityScore: 0 },
      },
      {
        id: 'p_fo_observe',
        en: () => 'Study them — who are they? What are they actually like?',
        ar: () => 'ادرسهم — من هم؟ كيف هم فعليًا؟',
        next: 'p_other_study',
        effects: { realityScore: 1, memories: 1 },
      },
      {
        id: 'p_fo_leave',
        en: () => 'Leave — you don\'t know if you can trust this person',
        ar: () => 'اغادر — لا تعرف إذا كنت تستطيع الوثوق بهذا الشخص',
        next: 'p_morning_two',
        effects: {},
      },
    ],
  },

  {
    id: 'p_other_revelation',
    en: (v) =>
      `${v.names?.otherName ?? 'The Other'} speaks quietly.\n\n"This ward has a rotation. Every few months a new 'patient' arrives. They don't know who they are. They have fragmented memories. They're given medication that creates compliance and mild confusion.\n\n"Then, gradually, they remember. Usually too late.\n\n"You're not a patient. I don't know exactly what you are. But I know what I am: I used to work here. I was investigating this place. They got me before I could finish."\n\nThey lean forward.\n\n"There's a file. Room 412. It has everything you need to understand what's happening to both of us. The question is whether you trust me enough to try to get it."`,
    ar: (v) =>
      `${v.names?.otherName ?? 'الآخر'} يتحدث بهدوء.\n\n"هذا الجناح له دورة. كل بضعة أشهر يصل 'مريض' جديد. لا يعرفون من هم. لديهم ذكريات متشظية. يُعطَون دواءً يخلق الامتثال والارتباك الخفيف.\n\n"ثم، تدريجيًا، يتذكرون. في العادة بعد فوات الأوان.\n\n"أنت لست مريضًا. لا أعرف بالضبط ما أنت. لكنني أعرف ما أنا: كنت أعمل هنا. كنت أحقق في هذا المكان. أمسكوا بي قبل أن أتمكن من الإنهاء."\n\nيتكئون للأمام.\n\n"هناك ملف. غرفة 412. فيه كل ما تحتاجه لفهم ما يحدث لكلينا. السؤال هو إذا كنت تثق بي بما يكفي للمحاولة."`,
    choices: [
      {
        id: 'p_or_trust',
        en: (v) => `Trust ${v.names?.otherName ?? 'The Other'} — go for the file`,
        ar: (v) => `ثق بـ${v.names?.otherName ?? 'الآخر'} — اذهب للملف`,
        next: 'p_room412',
        effects: { realityScore: 2 },
      },
      {
        id: 'p_or_verify',
        en: () => 'Ask for something verifiable — proof they\'re who they say',
        ar: () => 'اطلب شيئًا قابلًا للتحقق — دليل على هويتهم',
        next: 'p_other_proof',
        effects: { realityScore: 1 },
      },
      {
        id: 'p_or_elias',
        en: (v) => `Bring this to Dr. ${v.names?.doctorName ?? 'Elias'} — see what they say`,
        ar: (v) => `أحضر هذا إلى الدكتور ${v.names?.doctorName ?? 'إلياس'} — اعرف ما سيقوله`,
        next: 'p_other_vs_doctor',
        effects: { trust: 1 },
      },
      {
        id: 'p_or_alone',
        en: () => 'Process this alone first — go back to your room and think',
        ar: () => 'عالج هذا وحدك أولًا — ارجع إلى غرفتك وفكّر',
        next: 'p_morning_two',
        effects: { memories: 1 },
      },
    ],
  },

  {
    id: 'p_other_study',
    en: (v) =>
      `You study ${v.names?.otherName ?? 'The Other'}.\n\nThey're not medicated — or they're resisting it. Their eyes are clear in a way patients here generally aren't. They speak with specificity. They don't repeat themselves. They track the room.\n\nAnd their wrist. A mark there — similar to the one on Dr. ${v.names?.doctorName ?? 'Elias'}.\n\nSame shape. Different age. Older.\n\nYou've seen this mark before. In your memory — the hallway, the numbered rooms.\n\nEveryone in that hallway had this mark.`,
    ar: (v) =>
      `تدرس ${v.names?.otherName ?? 'الآخر'}.\n\nهم غير مخدَّرين — أو يقاومون ذلك. عيونهم صافية بطريقة لا يكون عليها المرضى هنا. يتحدثون بتحديد. لا يكررون أنفسهم. يراقبون الغرفة.\n\nومعصمهم. علامة هناك — مشابهة للعلامة على الدكتور ${v.names?.doctorName ?? 'إلياس'}.\n\nنفس الشكل. عمر مختلف. أقدم.\n\nلقد رأيت هذه العلامة من قبل. في ذاكرتك — الممر، الغرف المرقّمة.\n\nكل شخص في ذلك الممر كان يحمل هذه العلامة.`,
    choices: [
      {
        id: 'p_os_ask_mark',
        en: () => 'Ask about the mark on their wrist',
        ar: () => 'اسأل عن العلامة على معصمهم',
        next: 'p_mark_meaning',
        effects: { realityScore: 2, memories: 2 },
      },
      {
        id: 'p_os_revelation',
        en: () => 'Tell them what you\'ve remembered — the hallway, the numbers, the marks',
        ar: () => 'أخبرهم بما تذكّرت — الممر، الأرقام، العلامات',
        next: 'p_other_revelation',
        effects: { memories: 2 },
      },
      {
        id: 'p_os_trust',
        en: () => 'Trust them — they\'re another piece of what you need to understand',
        ar: () => 'ثق بهم — هم قطعة أخرى مما تحتاج لفهمه',
        next: 'p_other_revelation',
        effects: { realityScore: 1 },
      },
      {
        id: 'p_os_elias',
        en: (v) => `Bring this to Dr. ${v.names?.doctorName ?? 'Elias'} — the mark, the claim`,
        ar: (v) => `أحضر هذا إلى الدكتور ${v.names?.doctorName ?? 'إلياس'} — العلامة، الادعاء`,
        next: 'p_doctor_confrontation',
        effects: { trust: -1, realityScore: 1 },
      },
    ],
  },

  {
    id: 'p_mark_meaning',
    en: (v) =>
      `${v.names?.otherName ?? 'The Other'} looks at their wrist. Then at yours — both eyes steady.\n\n"Do you have one?"\n\nYou check. Left wrist. You've been ignoring it since you woke up — it looked like a scratch. It's not a scratch. It's a symbol. Clean. Old.\n\n"Everyone who works in the research program gets one," they say. "Voluntary identifier. Supposed to be proud of it."\n\nResearch program. You worked in a research program.\n\n"What research?" you ask.\n\n"Memory," they say. "What happens to a mind when you take everything from it and see what grows back."`,
    ar: (v) =>
      `${v.names?.otherName ?? 'الآخر'} ينظر إلى معصمهم. ثم إلى معصمك — كلا العيون ثابتتان.\n\n"هل لديك واحدة؟"\n\nتتحقق. المعصم الأيسر. كنت تتجاهله منذ استيقظت — بدا كخدش. إنه ليس خدشًا. إنه رمز. نظيف. قديم.\n\n"كل من يعمل في برنامج البحث يحصل على واحدة،" يقولون. "معرّف طوعي. من المفترض أن تفتخر بها."\n\nبرنامج بحث. عملت في برنامج بحث.\n\n"أي بحث؟" تسأل.\n\n"الذاكرة،" يقولون. "ما يحدث للعقل حين تأخذ منه كل شيء وترى ما ينمو بعده."`,
    choices: [
      {
        id: 'p_mm_research',
        en: () => 'You were a researcher here — you did this to yourself',
        ar: () => 'كنت باحثًا هنا — فعلت هذا بنفسك',
        next: 'p_researcher_reveal',
        effects: { memories: 3, realityScore: 2 },
      },
      {
        id: 'p_mm_room412',
        en: () => 'The file in room 412 — go now',
        ar: () => 'الملف في الغرفة 412 — اذهب الآن',
        next: 'p_room412',
        effects: { realityScore: 2 },
      },
      {
        id: 'p_mm_elias',
        en: (v) => `Dr. ${v.names?.doctorName ?? 'Elias'} — they have the same mark. Confront them.`,
        ar: (v) => `الدكتور ${v.names?.doctorName ?? 'إلياس'} — لهم نفس العلامة. واجههم.`,
        next: 'p_doctor_confrontation',
        effects: { realityScore: 2, trust: -2 },
      },
      {
        id: 'p_mm_terrified',
        en: () => 'This is too much — cooperate with the staff, take the medication',
        ar: () => 'هذا أكثر مما تحتمل — تعاون مع الطاقم، خذ الدواء',
        next: 'p_compliance_path',
        effects: { trust: 2, realityScore: -2 },
      },
    ],
  },

  // Room 412
  {
    id: 'p_room412',
    en: (v) =>
      `Room 412 is locked. Not with a standard lock — with a keypad.\n\nYou try to remember the code. You don't know why you think you know it. A four-digit number. Something about dates.\n\n${v.names?.otherName ?? 'The Other'} is with you — barely. They stand watch at the corner of the corridor.\n\nA memory: a date. November 14th. 1114.\n\nYou try it.`,
    ar: (v) =>
      `الغرفة 412 مقفلة. ليس بقفل عادي — بلوحة مفاتيح.\n\nتحاول تذكر الكود. لا تعرف لماذا تعتقد أنك تعرفه. رقم مكون من أربعة أرقام. شيء عن التواريخ.\n\n${v.names?.otherName ?? 'الآخر'} معك — بالكاد. يقف على دور الحراسة عند زاوية الممر.\n\nذكرى: تاريخ. الرابع عشر من نوفمبر. 1114.\n\nتجربه.`,
    choices: [
      {
        id: 'p_r412_try',
        en: () => 'Try 1114 — the date',
        ar: () => 'جرّب 1114 — التاريخ',
        next: 'p_room412_open',
        effects: { memories: 2 },
      },
      {
        id: 'p_r412_different',
        en: () => 'Try a different number — something else feels right',
        ar: () => 'جرّب رقمًا مختلفًا — شيء آخر يبدو صحيحًا',
        next: 'p_room412_wrong',
        effects: {},
      },
      {
        id: 'p_r412_key',
        en: (v) => `The doctor's second key — could it work here?`,
        ar: (v) => `المفتاح الثاني للدكتور — هل يعمل هنا؟`,
        next: 'p_room412_open',
        condition: (v) => v.realityScore >= 3,
        lockedEn: 'You haven\'t put enough pieces together yet',
        lockedAr: 'لم تجمع ما يكفي من القطع بعد',
        effects: { memories: 1 },
      },
      {
        id: 'p_r412_retreat',
        en: () => 'Retreat — this feels too dangerous',
        ar: () => 'تراجع — هذا يبدو خطيرًا جدًا',
        next: 'p_morning_two',
        effects: {},
      },
    ],
  },

  {
    id: 'p_room412_open',
    en: (v) =>
      `The door opens.\n\nIt's not a patient room. It's an office. A clinical one. On the desk: a nameplate. You walk toward it.\n\nYou read your name. Your actual name — the one that fits into the empty slot in your head.\n\nBelow the name: your title. DR. [YOUR NAME]. HEAD OF EXPERIMENTAL MEMORY RESEARCH — PROGRAM ARES.\n\nOn the wall behind the desk: photographs. You in this facility. At a conference. In this very room. Smiling. Not as a patient. As the person in charge.\n\n${v.names?.otherName ?? 'The Other'} stands in the doorway.\n\n"There it is," they say.`,
    ar: (v) =>
      `الباب ينفتح.\n\nليست غرفة مريض. إنها مكتب. سريري. على المكتب: لافتة اسم. تمشي نحوها.\n\nتقرأ اسمك. اسمك الحقيقي — الذي يناسب الفتحة الفارغة في رأسك.\n\nأسفل الاسم: لقبك. الدكتور [اسمك]. رئيس أبحاث الذاكرة التجريبية — برنامج آريس.\n\nعلى الجدار خلف المكتب: صور. أنت في هذه المنشأة. في مؤتمر. في هذه الغرفة بالذات. تبتسم. ليس كمريض. كالشخص المسؤول.\n\n${v.names?.otherName ?? 'الآخر'} يقف في المدخل.\n\n"ها هو ذا،" يقولون.`,
    choices: [
      {
        id: 'p_r412o_files',
        en: () => 'Search the files — understand the full picture',
        ar: () => 'فتش الملفات — افهم الصورة الكاملة',
        next: 'p_files_reveal',
        effects: { memories: 3, realityScore: 2 },
      },
      {
        id: 'p_r412o_elias',
        en: (v) => `Go find Dr. ${v.names?.doctorName ?? 'Elias'} — confront them now`,
        ar: (v) => `اذهب وأجد الدكتور ${v.names?.doctorName ?? 'إلياس'} — واجههم الآن`,
        next: 'p_doctor_confrontation',
        effects: { realityScore: 2, memories: 2, doctorMode: true },
      },
      {
        id: 'p_r412o_escape',
        en: () => 'You have enough — get out of this facility now',
        ar: () => 'لديك ما يكفي — اخرج من هذه المنشأة الآن',
        next: 'p_escape_attempt',
        effects: { realityScore: 2 },
      },
      {
        id: 'p_r412o_secret',
        en: () => 'Look at the research files on the desk specifically — what was Program ARES?',
        ar: () => 'انظر إلى ملفات البحث على المكتب تحديدًا — ما كان برنامج آريس؟',
        next: 'p_ares_reveal',
        effects: { memories: 3, realityScore: 3 },
      },
    ],
  },

  {
    id: 'p_room412_wrong',
    en: () =>
      `The keypad beeps three times. Wrong. A light turns red.\n\nThen the facility's PA system activates: "Patient in corridor four, please return to your room." A pause. "This is not a request."\n\nYou have ninety seconds, maybe less.`,
    ar: () =>
      `لوحة المفاتيح تصدر ثلاثة صفيرات. خاطئ. يضيء ضوء أحمر.\n\nثم يعمل نظام الإذاعة في المنشأة: "المريض في الممر الرابع، يرجى العودة إلى غرفتك." توقف. "هذا ليس طلبًا."\n\nأمامك تسعون ثانية، ربما أقل.`,
    choices: [
      {
        id: 'p_rw_try_again',
        en: () => 'Try 1114 — the date from your memory',
        ar: () => 'جرّب 1114 — التاريخ من ذاكرتك',
        next: 'p_room412_open',
        effects: { memories: 1 },
      },
      {
        id: 'p_rw_run',
        en: () => 'Run — get back to your room',
        ar: () => 'اجرِ — عد إلى غرفتك',
        next: 'p_morning_two',
        effects: { trust: 0 },
      },
      {
        id: 'p_rw_hide',
        en: (v) => `Hide with ${v.names?.otherName ?? 'The Other'} — wait for the staff to pass`,
        ar: (v) => `الاختباء مع ${v.names?.otherName ?? 'الآخر'} — انتظر مرور الطاقم`,
        next: 'p_hiding_together',
        effects: { realityScore: 1 },
      },
      {
        id: 'p_rw_confront',
        en: () => 'Stand your ground — demand to know why room 412 is classified',
        ar: () => 'اثبت على موقفك — اطلب معرفة لماذا الغرفة 412 سرية',
        next: 'p_room412_confronted',
        effects: { realityScore: 1, trust: -2 },
      },
    ],
  },

  {
    id: 'p_room412_confronted',
    en: (v) =>
      `Two staff members arrive. One you recognize — the nurse who brought you medication. The other: taller, unsmiling.\n\nDr. ${v.names?.doctorName ?? 'Elias'} arrives behind them two minutes later.\n\n"I'd like to know why that room is locked," you say steadily. "And why it says 'research' on the door panel."\n\nDr. ${v.names?.doctorName ?? 'Elias'} looks at you for a long moment. Then — unexpectedly — something in their expression shifts.\n\n"Come with me," they say quietly. "There's something we should have told you on day one."`,
    ar: (v) =>
      `يصل عضوان من الطاقم. تتعرف على أحدهما — الممرض الذي جلب لك الدواء. الآخر: أطول، بلا ابتسامة.\n\nالدكتور ${v.names?.doctorName ?? 'إلياس'} يصل خلفهم بعد دقيقتين.\n\n"أريد أن أعرف لماذا تلك الغرفة مقفلة،" تقول بثبات. "ولماذا مكتوب 'بحث' على لوحة الباب."\n\nالدكتور ${v.names?.doctorName ?? 'إلياس'} ينظر إليك لحظة طويلة. ثم — بشكل غير متوقع — يتحول شيء في تعبير وجههم.\n\n"تعال معي،" يقولون بهدوء. "هناك شيء كان يجب أن نخبرك به في اليوم الأول."`,
    choices: [
      {
        id: 'p_rc_follow',
        en: (v) => `Follow Dr. ${v.names?.doctorName ?? 'Elias'}`,
        ar: (v) => `تبع الدكتور ${v.names?.doctorName ?? 'إلياس'}`,
        next: 'p_doctor_reveals',
        effects: { trust: 1 },
      },
      {
        id: 'p_rc_demand_here',
        en: () => 'Tell me here. Right here.',
        ar: () => 'أخبرني هنا. هنا بالضبط.',
        next: 'p_doctor_reveals',
        effects: { trust: -1 },
      },
      {
        id: 'p_rc_run',
        en: () => 'Run — this feels like a trap',
        ar: () => 'اجرِ — هذا يبدو كفخ',
        next: 'p_escape_attempt',
        effects: { realityScore: 1 },
      },
      {
        id: 'p_rc_other',
        en: (v) => `Demand ${v.names?.otherName ?? 'The Other'} be present too`,
        ar: (v) => `اطلب حضور ${v.names?.otherName ?? 'الآخر'} أيضًا`,
        next: 'p_doctor_reveals',
        effects: { memories: 1 },
      },
    ],
  },

  // Doctor confrontation
  {
    id: 'p_doctor_confrontation',
    en: (v) =>
      `You face Dr. ${v.names?.doctorName ?? 'Elias'} in the session room.\n\n"The mark on your wrist. The key that doesn't match facility standard. The redacted name on my admission form. The room you won't tell me about. My professional knowledge of medications and protocols that a patient shouldn't have.\n\n"I am not telling you who I am. I am asking you to tell ME."`,
    ar: (v) =>
      `تواجه الدكتور ${v.names?.doctorName ?? 'إلياس'} في غرفة الجلسة.\n\n"العلامة على معصمك. المفتاح الذي لا يطابق معيار المنشأة. الاسم المحجوب في استمارة قبولي. الغرفة التي لن تخبرني عنها. معرفتي المهنية بالأدوية والبروتوكولات التي لا ينبغي لمريض امتلاكها.\n\n"لست أخبرك من أنا. أنا أطلب منك أن تخبرني أنت."`,
    choices: [
      {
        id: 'p_dc_listen',
        en: () => 'Wait and let Dr. Elias respond',
        ar: () => 'انتظر ودع الدكتور يرد',
        next: 'p_doctor_reveals',
        effects: {},
      },
      {
        id: 'p_dc_files',
        en: () => '"I found my office. Room 412. I know what I am."',
        ar: () => '"وجدت مكتبي. غرفة 412. أعرف ما أنا."',
        next: 'p_doctor_reveals',
        condition: (v) => v.memories >= 3,
        lockedEn: 'You haven\'t remembered enough yet',
        lockedAr: 'لم تتذكر ما يكفي بعد',
        effects: { memories: 1, realityScore: 1, doctorMode: true },
      },
      {
        id: 'p_dc_other',
        en: (v) => `Show them you know about ${v.names?.otherName ?? 'The Other'}`,
        ar: (v) => `أظهر لهم أنك تعرف عن ${v.names?.otherName ?? 'الآخر'}`,
        next: 'p_other_vs_doctor',
        effects: {},
      },
      {
        id: 'p_dc_escape',
        en: () => 'Stop confronting — make a break for the exit',
        ar: () => 'توقف عن المواجهة — انطلق نحو المخرج',
        next: 'p_escape_attempt',
        effects: { realityScore: 1 },
      },
    ],
  },

  {
    id: 'p_doctor_reveals',
    en: (v) =>
      `Dr. ${v.names?.doctorName ?? 'Elias'} sits down. Slowly.\n\n"You are Dr. [your name]. You were the head of Program ARES. Voluntary memory erasure and reintegration research.\n\n"Eight months ago, you volunteered yourself as a subject. You said the only ethical way to understand what the program does to patients is to experience it as one.\n\n"You erased your own memory. You made us promise not to tell you who you were for at least thirty days."${v.doctorMode ? '\n\nYou already knew this. But hearing it from someone else is different.' : '\n\nThe silence in the room is absolute.'}\n\nThen they add:\n\n"The program was discontinued two weeks after you began. By the board. Due to ethics violations they found in the files you left unsealed deliberately before you went under."`,
    ar: (v) =>
      `الدكتور ${v.names?.doctorName ?? 'إلياس'} يجلس. ببطء.\n\n"أنت الدكتور [اسمك]. كنت رئيس برنامج آريس. أبحاث مسح الذاكرة الطوعي وإعادة التكامل.\n\n"قبل ثمانية أشهر، تطوعت كعينة. قلت الطريقة الأخلاقية الوحيدة لفهم ما يفعله البرنامج للمرضى هي تجربته كأحدهم.\n\n"مسحت ذاكرتك الخاصة. جعلتنا نعد بعدم إخبارك بمن أنت لمدة ثلاثين يومًا على الأقل."${v.doctorMode ? '\n\nكنت تعرف هذا بالفعل. لكن سماعه من شخص آخر مختلف.' : '\n\nالصمت في الغرفة مطلق.'}\n\nثم يضيفون:\n\n"أُوقف البرنامج قبل أسبوعين من بدايتك. من قِبل المجلس. بسبب انتهاكات أخلاقية وجدوها في الملفات التي تركتها غير مغلقة عن قصد قبل خضوعك."`,
    choices: [
      {
        id: 'p_dr_process',
        en: () => 'Process this — ask what happens now',
        ar: () => 'عالج هذا — اسأل ماذا يحدث الآن',
        next: 'p_what_now',
        effects: { memories: 1 },
      },
      {
        id: 'p_dr_ethics',
        en: () => '"The ethics violations — those are why you discontinued it. What exactly was wrong?"',
        ar: () => '"انتهاكات الأخلاقيات — هذا سبب إيقافه. ما الخطأ بالضبط؟"',
        next: 'p_ethics_reveal',
        effects: { memories: 2 },
      },
      {
        id: 'p_dr_other',
        en: (v) => `Ask about ${v.names?.otherName ?? 'The Other'} — who are they in this story?`,
        ar: (v) => `اسأل عن ${v.names?.otherName ?? 'الآخر'} — من هم في هذه القصة؟`,
        next: 'p_other_identity',
        effects: { memories: 1 },
      },
      {
        id: 'p_dr_escape',
        en: () => 'You want out — now. Immediately.',
        ar: () => 'تريد الخروج — الآن. فورًا.',
        next: 'p_departure_process',
        effects: {},
      },
    ],
  },

  // Key revelations
  {
    id: 'p_files_reveal',
    en: (v) =>
      `The files in room 412 are meticulous. They document eight research subjects — all with the same protocol: voluntary memory erasure, thirty-day blackout period, reintegration.\n\nSubject 1 through 7: all recovered. Most within three weeks. Full memory return. Minor emotional disturbances.\n\nSubject 8: YOU. Eight months. Partial recovery. Multiple attempts at full reintegration. Complications: "Subject has developed significant psychological resistance to re-identifying as primary research authority. Possible identity fragmentation."\n\nAt the bottom of the file: a handwritten note in your own handwriting.\n\n"If I can't remember who I am, it proves the program works beyond intended parameters. Publish the results. Discontinue the program. The ethics violations are in the unsealed files in the main office."`,
    ar: (v) =>
      `ملفات الغرفة 412 دقيقة. توثق ثمانية موضوعات بحثية — جميعها بنفس البروتوكول: مسح الذاكرة الطوعي، فترة انقطاع ثلاثين يومًا، إعادة التكامل.\n\nالموضوعات 1 إلى 7: جميعها تعافت. معظمها خلال ثلاثة أسابيع. عودة الذاكرة الكاملة. اضطرابات عاطفية طفيفة.\n\nالموضوع 8: أنت. ثمانية أشهر. تعافٍ جزئي. محاولات متعددة لإعادة التكامل الكامل. مضاعفات: "أظهر الموضوع مقاومة نفسية كبيرة لإعادة التعريف بنفسه كسلطة بحثية أساسية. تشتت هوية محتمل."\n\nفي أسفل الملف: ملاحظة مكتوبة بخط يدك، بخطك.\n\n"إذا لم أستطع تذكر من أنا، فهذا يثبت أن البرنامج يعمل خارج المعايير المقصودة. انشر النتائج. أوقف البرنامج. انتهاكات الأخلاقيات في الملفات غير المقفلة في المكتب الرئيسي."`,
    choices: [
      {
        id: 'p_fr_elias',
        en: (v) => `Confront Dr. ${v.names?.doctorName ?? 'Elias'} with this`,
        ar: (v) => `واجه الدكتور ${v.names?.doctorName ?? 'إلياس'} بهذا`,
        next: 'p_doctor_confrontation',
        effects: { doctorMode: true, memories: 2, realityScore: 2 },
      },
      {
        id: 'p_fr_leave',
        en: () => 'You know enough — get out of this facility',
        ar: () => 'لديك ما يكفي — اخرج من هذه المنشأة',
        next: 'p_departure_process',
        effects: { doctorMode: true },
      },
      {
        id: 'p_fr_other',
        en: (v) => `Find ${v.names?.otherName ?? 'The Other'} — tell them what you found`,
        ar: (v) => `اجد ${v.names?.otherName ?? 'الآخر'} — أخبرهم بما وجدت`,
        next: 'p_other_identity',
        effects: { doctorMode: true, memories: 1 },
      },
      {
        id: 'p_fr_accept',
        en: () => 'Sit down. Breathe. You did this to yourself on purpose.',
        ar: () => 'اجلس. تنفس. فعلت هذا بنفسك عن قصد.',
        next: 'p_acceptance',
        effects: { doctorMode: true, memories: 3 },
      },
    ],
  },

  {
    id: 'p_ares_reveal',
    en: () =>
      `Program ARES: Adaptive Reality and Episodic Substitution.\n\nObjective: Understand the process of identity dissolution under complete memory erasure conditions, and develop a reliable reintegration protocol.\n\nFunding: Three major pharmaceutical companies with direct benefit from the research.\n\nEthics board approval: Conditional.\n\nConditions that were violated: "Subject must be able to exit the program at any time with full support." The lead researcher — YOU — designed the protocol in such a way that exiting required remembering who you were, which you had removed the ability to do.\n\nYou designed a trap for yourself. You walked into it voluntarily. And then left a trail of breadcrumbs so that eventually, you'd find your way out.`,
    ar: () =>
      `برنامج آريس: التكيف مع الواقع والاستبدال النوبي.\n\nالهدف: فهم عملية تفكك الهوية في ظروف مسح الذاكرة الكامل، وتطوير بروتوكول موثوق لإعادة التكامل.\n\nالتمويل: ثلاث شركات أدوية كبرى تستفيد مباشرة من البحث.\n\nموافقة لجنة الأخلاقيات: مشروطة.\n\nالشروط التي انتُهكت: "يجب أن يتمكن الموضوع من الخروج من البرنامج في أي وقت بدعم كامل." الباحث الرئيسي — أنت — صمّم البروتوكول بطريقة تتطلب الخروج تذكّر من أنت، وهو ما كنت قد أزلت القدرة عليه.\n\nصممت فخًا لنفسك. دخلته طوعيًا. ثم تركت فتات خبز حتى تجد طريقك للخروج في نهاية المطاف.`,
    choices: [
      {
        id: 'p_ar_understand',
        en: () => 'You understand now. Find your way out.',
        ar: () => 'أنت تفهم الآن. اجد طريقك للخروج.',
        next: 'p_departure_process',
        effects: { doctorMode: true, memories: 3, realityScore: 3 },
      },
      {
        id: 'p_ar_accept',
        en: () => 'Sit with this. What you do to others, you did to yourself first.',
        ar: () => 'اجلس مع هذا. ما تفعله بالآخرين، فعلته بنفسك أولًا.',
        next: 'p_acceptance',
        effects: { doctorMode: true, memories: 3 },
      },
      {
        id: 'p_ar_elias',
        en: (v) => `Confront Dr. ${v.names?.doctorName ?? 'Elias'} with everything`,
        ar: (v) => `واجه الدكتور ${v.names?.doctorName ?? 'إلياس'} بكل شيء`,
        next: 'p_doctor_confrontation',
        effects: { doctorMode: true, memories: 2 },
      },
      {
        id: 'p_ar_other',
        en: (v) => `Find ${v.names?.otherName ?? 'The Other'} — what is their role?`,
        ar: (v) => `اجد ${v.names?.otherName ?? 'الآخر'} — ما دورهم؟`,
        next: 'p_other_identity',
        effects: { memories: 2 },
      },
    ],
  },

  // Other identity reveal
  {
    id: 'p_other_identity',
    en: (v) =>
      `Dr. ${v.names?.doctorName ?? 'Elias'} tells you about ${v.names?.otherName ?? 'The Other'}.\n\n"${v.names?.otherName ?? 'They'} were a journalist. They contacted us eight months ago, after receiving a tip about the program from an anonymous source. They were given a facility tour under the guise of a public health feature story.\n\n"During the tour, they were administered a mild version of the ARES protocol — without consent. We panicked. It was meant to be temporary. Three weeks at most.\n\n"It's been eight months. They remembered more than we expected. More than we could handle. We've been... managing their recovery."\n\nManaging. The word sits between you like a stone.`,
    ar: (v) =>
      `الدكتور ${v.names?.doctorName ?? 'إلياس'} يخبرك عن ${v.names?.otherName ?? 'الآخر'}.\n\n"${v.names?.otherName ?? 'هم'} كانوا صحفيًا. تواصلوا معنا قبل ثمانية أشهر، بعد تلقي تلميحة عن البرنامج من مصدر مجهول. أُعطي لهم جولة في المنشأة تحت ستار قصة صحة عامة.\n\n"خلال الجولة، أُعطي لهم نسخة خفيفة من بروتوكول آريس — دون موافقة. أصابنا الذعر. كان من المفترض أن يكون مؤقتًا. ثلاثة أسابيع على الأقل.\n\n"مرت ثمانية أشهر. تذكروا أكثر مما توقعنا. أكثر مما استطعنا التعامل معه. كنا... ندير تعافيهم."\n\nيدير. الكلمة تجلس بينكما كحجر.`,
    choices: [
      {
        id: 'p_oi_free_other',
        en: (v) => `Demand ${v.names?.otherName ?? 'The Other'} be freed immediately`,
        ar: (v) => `اطلب الإفراج عن ${v.names?.otherName ?? 'الآخر'} فورًا`,
        next: 'p_demand_freedom',
        effects: { doctorMode: true },
      },
      {
        id: 'p_oi_report',
        en: () => 'This is a crime. You need to report this to authorities.',
        ar: () => 'هذه جريمة. تحتاج إبلاغ السلطات.',
        next: 'p_departure_process',
        effects: { doctorMode: true },
      },
      {
        id: 'p_oi_ethics',
        en: () => '"You gave them a protocol without consent. That\'s not managing. That\'s what started this."',
        ar: () => '"أعطيتهم البروتوكول دون موافقة. هذا ليس إدارة. هذا ما بدأ كل هذا."',
        next: 'p_ethics_reveal',
        effects: { doctorMode: true, memories: 1 },
      },
      {
        id: 'p_oi_yourself',
        en: () => 'You designed this program. You are responsible for what it did to them.',
        ar: () => 'أنت صممت هذا البرنامج. أنت مسؤول عما فعله بهم.',
        next: 'p_acceptance',
        effects: { doctorMode: true, memories: 2 },
      },
    ],
  },

  // Resistance / compliance paths
  {
    id: 'p_compliance_path',
    en: (v) =>
      `You take the medication. You cooperate fully. You attend every session. You tell Dr. ${v.names?.doctorName ?? 'Elias'} what they want to hear.\n\nWeeks pass. The medication dulls the edges of everything. The questions you had fade — not forgotten, but deprioritized. Put away like items in a drawer you no longer think to open.\n\nYou're comfortable. The ward is comfortable. The routine is comfortable.\n\nAnd then one day you catch ${v.names?.otherName ?? 'The Other'} watching you from across the recreation room, and their expression is the saddest thing you've seen in a long time.\n\nThey look away first.`,
    ar: (v) =>
      `تأخذ الدواء. تتعاون بالكامل. تحضر كل جلسة. تخبر الدكتور ${v.names?.doctorName ?? 'إلياس'} بما يريدون سماعه.\n\nتمر أسابيع. الدواء يخفف حواف كل شيء. الأسئلة التي كانت لديك تتلاشى — لم تُنسى، لكنها فقدت أولويتها. أُودعت جانبًا كأشياء في درج لم تعد تفكر في فتحه.\n\nأنت مرتاح. الجناح مريح. الروتين مريح.\n\nثم يومًا ما تلتقط ${v.names?.otherName ?? 'الآخر'} يراقبك من عبر غرفة الاستجمام، وتعبير وجههم أحزن شيء رأيته منذ وقت طويل.\n\nيصرفون نظرهم أولًا.`,
    choices: [
      {
        id: 'p_cp_wake',
        en: () => 'That look wakes something in you — stop taking the medication',
        ar: () => 'تلك النظرة تصحو شيئًا فيك — توقف عن أخذ الدواء',
        next: 'p_fake_meds',
        effects: { trust: -1, realityScore: 2 },
      },
      {
        id: 'p_cp_approach',
        en: (v) => `Approach ${v.names?.otherName ?? 'The Other'} — ask why they looked at you that way`,
        ar: (v) => `اقترب من ${v.names?.otherName ?? 'الآخر'} — اسأل لماذا نظرا إليك هكذا`,
        next: 'p_find_other',
        effects: { realityScore: 1 },
      },
      {
        id: 'p_cp_stay',
        en: () => 'Stay in compliance — you\'re getting better here',
        ar: () => 'ابقَ في الامتثال — أنت تتحسن هنا',
        next: 'p_ending_failure',
        effects: { trust: 2, realityScore: -3 },
      },
      {
        id: 'p_cp_session',
        en: (v) => `In the next session, ask Dr. ${v.names?.doctorName ?? 'Elias'} when you can go home`,
        ar: (v) => `في الجلسة التالية، اسأل الدكتور ${v.names?.doctorName ?? 'إلياس'} متى تستطيع الذهاب للبيت`,
        next: 'p_what_now',
        effects: { trust: 1 },
      },
    ],
  },

  // What happens now
  {
    id: 'p_what_now',
    en: (v) =>
      `Dr. ${v.names?.doctorName ?? 'Elias'} is clear: you can leave any time you choose. You are here voluntarily. You were ALWAYS here voluntarily.\n\nThe protocol you designed requires the subject to consciously choose to exit. That's the final test of the reintegration.\n\n"The thirty-day blank period ended seven months ago," they say. "You could have left then. You kept... extending your stay. Every time we tried to tell you, you rejected the information." A pause. "We believed you knew, on some level, that you weren't ready."`,
    ar: (v) =>
      `الدكتور ${v.names?.doctorName ?? 'إلياس'} واضح: يمكنك المغادرة في أي وقت تختار. أنت هنا طوعيًا. كنت دائمًا هنا طوعيًا.\n\nالبروتوكول الذي صممته يتطلب من الموضوع اختيار الخروج بوعي. هذا الاختبار النهائي لإعادة التكامل.\n\n"انتهت فترة الثلاثين يومًا الفارغة قبل سبعة أشهر،" يقولون. "كنت تستطيع المغادرة حينها. واصلت... تمديد إقامتك. في كل مرة حاولنا إخبارك، رفضت المعلومات." توقف. "اعتقدنا أنك تعرف، على مستوى ما، أنك لم تكن مستعدًا."`,
    choices: [
      {
        id: 'p_wn_leave',
        en: () => '"I\'m ready now. I want to leave."',
        ar: () => '"أنا مستعد الآن. أريد المغادرة."',
        next: 'p_departure_process',
        effects: { doctorMode: true },
      },
      {
        id: 'p_wn_other',
        en: (v) => `"${v.names?.otherName ?? 'The Other'} needs to leave too. They didn\'t volunteer."`,
        ar: (v) => `"${v.names?.otherName ?? 'الآخر'} يحتاج المغادرة أيضًا. هم لم يتطوعوا."`,
        next: 'p_demand_freedom',
        effects: { doctorMode: true },
      },
      {
        id: 'p_wn_ethics',
        en: () => '"And the board? The discontinuation? The ethics violations?"',
        ar: () => '"وماذا عن المجلس؟ الإيقاف؟ انتهاكات الأخلاقيات؟"',
        next: 'p_ethics_reveal',
        effects: { doctorMode: true },
      },
      {
        id: 'p_wn_not_ready',
        en: () => 'You\'re not sure you are ready. Stay a little longer.',
        ar: () => 'لست متأكدًا من أنك مستعد. ابقَ قليلًا أطول.',
        next: 'p_compliance_path',
        effects: { trust: 1 },
      },
    ],
  },

  {
    id: 'p_ethics_reveal',
    en: () =>
      `The ethics violations:\n\n1. The reintegration protocol did not include a maximum duration. Subjects could theoretically be held indefinitely.\n\n2. The medication used — haloperidol — was not strictly necessary for the research. It was used to suppress attempts to self-discharge.\n\n3. One subject — ${`[The Other]`} — was dosed without consent.\n\n4. The research data was shared with the pharmaceutical funders before being reviewed by the ethics board.\n\n5. You — the lead researcher — knew all of this. You left the files accessible intentionally. You wanted someone to find them after you couldn't find them yourself.\n\nYou left a trail specifically so the program would be shut down even if you couldn't shut it down yourself.`,
    ar: () =>
      `انتهاكات الأخلاقيات:\n\n1. بروتوكول إعادة التكامل لم يحتوِ على مدة قصوى. يمكن نظريًا احتجاز الموضوعات إلى أجل غير مسمى.\n\n2. الدواء المستخدم — الهالوبيريدول — لم يكن ضروريًا بشكل صارم للبحث. استُخدم لقمع محاولات الخروج الذاتي.\n\n3. أحد الموضوعات — ${`[الآخر]`} — أُعطي جرعة بدون موافقة.\n\n4. بيانات البحث شُوركت مع الممولين الصيدلانيين قبل مراجعتها من قِبل لجنة الأخلاقيات.\n\n5. أنت — الباحث الرئيسي — كنت تعرف كل هذا. تركت الملفات قابلة للوصول عن قصد. أردت أن يجدها شخص ما بعد أن لا تستطيع أنت إيجادها.\n\nتركت أثرًا تحديدًا حتى يُغلق البرنامج حتى لو لم تستطع أنت إغلاقه.`,
    choices: [
      {
        id: 'p_er_leave',
        en: () => 'You did what you set out to do — now leave',
        ar: () => 'فعلت ما قصدته فعله — الآن غادر',
        next: 'p_departure_process',
        effects: { doctorMode: true, memories: 2 },
      },
      {
        id: 'p_er_other',
        en: (v) => `Free ${v.names?.otherName ?? 'The Other'} first`,
        ar: (v) => `حرر ${v.names?.otherName ?? 'الآخر'} أولًا`,
        next: 'p_demand_freedom',
        effects: { doctorMode: true },
      },
      {
        id: 'p_er_accept',
        en: () => 'Sit with what you\'ve been part of',
        ar: () => 'اجلس مع ما كنت جزءًا منه',
        next: 'p_acceptance',
        effects: { memories: 2, realityScore: 1 },
      },
      {
        id: 'p_er_report',
        en: () => 'Plan to report everything — authorities, press',
        ar: () => 'خطط للإبلاغ عن كل شيء — السلطات، الصحافة',
        next: 'p_departure_process',
        effects: { doctorMode: true, memories: 1 },
      },
    ],
  },

  // Demand freedom
  {
    id: 'p_demand_freedom',
    en: (v) =>
      `Dr. ${v.names?.doctorName ?? 'Elias'} agrees, with some difficulty.\n\n${v.names?.otherName ?? 'The Other'} is given discharge papers three hours later. They sign them with a hand that doesn't hesitate.\n\nIn the lobby, before leaving, they turn to you.\n\n"You designed the program," they say. It's not an accusation. It's a fact.\n\n"Yes."\n\n"The thing that was done to me — you designed that protocol."\n\n"Yes."\n\nA long pause.\n\n"Then you were also the anonymous source who tipped me off," they say. "Weren't you."`,
    ar: (v) =>
      `الدكتور ${v.names?.doctorName ?? 'إلياس'} يوافق، ببعض الصعوبة.\n\n${v.names?.otherName ?? 'الآخر'} يُعطى أوراق الخروج بعد ثلاث ساعات. يوقعها بيد لا تتردد.\n\nفي البهو، قبل المغادرة، يلتفتون نحوك.\n\n"أنت صممت البرنامج،" يقولون. ليس اتهامًا. إنها حقيقة.\n\n"نعم."\n\n"الشيء الذي حدث لي — أنت صممت ذلك البروتوكول."\n\n"نعم."\n\nتوقف طويل.\n\n"إذن أنت أيضًا كنت المصدر المجهول الذي أبلغني،" يقولون. "أليس كذلك."`,
    choices: [
      {
        id: 'p_df_yes',
        en: () => '"Yes. I sent you the tip before I went under. I knew I wouldn\'t be able to stop it myself."',
        ar: () => '"نعم. أرسلت لك التلميحة قبل خضوعي. كنت أعرف أنني لن أتمكن من إيقافه بنفسي."',
        next: 'p_ending_secret',
        effects: { doctorMode: true, memories: 3 },
      },
      {
        id: 'p_df_no',
        en: () => 'Say nothing — let them draw their own conclusion',
        ar: () => 'لا تقل شيئًا — دعهم يستخلصون استنتاجهم الخاص',
        next: 'p_ending_success',
        effects: { doctorMode: true },
      },
      {
        id: 'p_df_acknowledge',
        en: () => '"I don\'t know. I don\'t remember that part. But it sounds like something I would do."',
        ar: () => '"لا أعرف. لا أتذكر ذلك الجزء. لكنه يبدو كشيء سأفعله."',
        next: 'p_ending_success',
        effects: { doctorMode: true, memories: 2 },
      },
      {
        id: 'p_df_apologize',
        en: () => 'Apologize first. There is so much to apologize for.',
        ar: () => 'اعتذر أولًا. هناك الكثير للاعتذار عنه.',
        next: 'p_ending_success',
        effects: { doctorMode: true },
      },
    ],
  },

  // Departure
  {
    id: 'p_departure_process',
    en: (v) =>
      `You ask to leave. They have no grounds to hold you — you are not committed involuntarily. You signed in voluntarily and you sign out voluntarily.\n\nIt takes four hours. Paperwork. A medical release. A recorded statement that you understand your current psychological state.\n\nWhen you sign the last form, Dr. ${v.names?.doctorName ?? 'Elias'} asks:\n\n"Will you be publishing the ARES results?"\n\nYou look at them. The badge on the wrong side. The key that doesn't fit.\n\n"I already did," you say. "I left the file open. That's why the board shut you down."\n\nA pause.\n\n"That's what I thought," they say quietly.`,
    ar: (v) =>
      `تطلب المغادرة. ليس لديهم أسباب لاحتجازك — لم تُودَع قسرًا. دخلت طوعًا وتخرج طوعًا.\n\nيستغرق الأمر أربع ساعات. أوراق. إفراج طبي. إفادة مسجلة أنك تفهم حالتك النفسية الراهنة.\n\nحين توقع الاستمارة الأخيرة، يسأل الدكتور ${v.names?.doctorName ?? 'إلياس'}:\n\n"هل ستنشر نتائج آريس؟"\n\nتنظر إليهم. الشارة على الجانب الخاطئ. المفتاح الذي لا يناسب.\n\n"فعلت بالفعل،" تقول. "تركت الملف مفتوحًا. لذلك أغلقكم المجلس."\n\nتوقف.\n\n"هذا ما ظننت،" يقولون بهدوء.`,
    choices: [
      {
        id: 'p_dp_leave',
        en: () => 'Walk out the door',
        ar: () => 'امشِ خارجًا من الباب',
        next: 'p_ending_success',
        effects: { doctorMode: true },
      },
      {
        id: 'p_dp_other',
        en: (v) => `Not without ${v.names?.otherName ?? 'The Other'}`,
        ar: (v) => `ليس دون ${v.names?.otherName ?? 'الآخر'}`,
        next: 'p_demand_freedom',
        effects: {},
      },
      {
        id: 'p_dp_secret',
        en: () => 'One more question before you go — was any of this real?',
        ar: () => 'سؤال أخير قبل الذهاب — هل كان أي من هذا حقيقيًا؟',
        next: 'p_ending_secret',
        effects: { memories: 1 },
      },
      {
        id: 'p_dp_accept',
        en: () => 'Sit with the weight of it first — then leave',
        ar: () => 'اجلس مع ثقله أولًا — ثم غادر',
        next: 'p_acceptance',
        effects: { memories: 1 },
      },
    ],
  },

  // Acceptance
  {
    id: 'p_acceptance',
    en: (v) =>
      `You sit in the session room alone.\n\nYou designed a system to take memories from people — including yourself. You did it, ostensibly, for science. For knowledge. To help future patients.\n\nBut you also knew, on some level, that the program was wrong. You left the breadcrumbs. You sent the tip. You designed the exit so that finding it required someone sufficiently motivated to search.\n\nYou were a researcher who became a subject who rebuilt themselves from nothing.\n\nYou are not the same person who designed Program ARES. That person's memories are returning, piece by piece, into someone who has spent eight months as nothing but a question mark.\n\nThe question is: what does that person — you — decide to do with what they've become?`,
    ar: (v) =>
      `تجلس في غرفة الجلسة وحدك.\n\nصممت نظامًا لأخذ الذكريات من الناس — بما فيهم نفسك. فعلت ذلك، ظاهريًا، من أجل العلم. من أجل المعرفة. لمساعدة المرضى المستقبليين.\n\nلكنك كنت تعرف أيضًا، على مستوى ما، أن البرنامج كان خاطئًا. تركت فتات الخبز. أرسلت التلميحة. صممت الخروج بحيث يتطلب إيجاده شخصًا محفَّزًا بما يكفي للبحث.\n\nكنت باحثًا أصبح موضوعًا أعاد بناء نفسه من الصفر.\n\nلست نفس الشخص الذي صمم برنامج آريس. ذكريات ذلك الشخص تعود، قطعة بقطعة، إلى شخص قضى ثمانية أشهر لا يكون سوى علامة استفهام.\n\nالسؤال هو: ما الذي يقرر ذلك الشخص — أنت — فعله بما أصبح عليه؟`,
    choices: [
      {
        id: 'p_ac_leave',
        en: () => 'Leave and never look back',
        ar: () => 'غادر ولا تنظر للخلف أبدًا',
        next: 'p_ending_success',
        effects: { doctorMode: true },
      },
      {
        id: 'p_ac_report',
        en: () => 'Leave — and then report everything',
        ar: () => 'غادر — ثم أبلغ عن كل شيء',
        next: 'p_ending_success',
        effects: { doctorMode: true },
      },
      {
        id: 'p_ac_question',
        en: () => 'Ask one final burning question: who were you BEFORE the program?',
        ar: () => 'اسأل سؤالًا أخيرًا حارقًا: من كنت قبل البرنامج؟',
        next: 'p_who_before',
        effects: {},
      },
      {
        id: 'p_ac_other',
        en: (v) => `Make sure ${v.names?.otherName ?? 'The Other'} gets justice first`,
        ar: (v) => `تأكد من حصول ${v.names?.otherName ?? 'الآخر'} على العدالة أولًا`,
        next: 'p_demand_freedom',
        effects: { doctorMode: true },
      },
    ],
  },

  {
    id: 'p_who_before',
    en: (v) =>
      `Dr. ${v.names?.doctorName ?? 'Elias'} tells you.\n\nBefore the program, you were someone who drove this work forward with genuine conviction. You believed memory plasticity could heal trauma. You believed the research was good.\n\nBut the files you left unsealed before going under tell a different story. They suggest you had begun to doubt. That you saw what the program was doing to subjects — the dissociation, the extended stays, the dependence — and realized you'd created something that healed nothing.\n\nYou put yourself in it. Not just to experience it. To stop it from continuing without someone stopping you from stopping it.\n\nYou couldn't trust yourself to shut it down without losing the courage first. So you removed the courage along with everything else. And left a trail anyway.`,
    ar: (v) =>
      `الدكتور ${v.names?.doctorName ?? 'إلياس'} يخبرك.\n\nقبل البرنامج، كنت شخصًا دفع هذا العمل للأمام بقناعة حقيقية. كنت تؤمن بأن مرونة الذاكرة يمكن أن تعالج الصدمات. كنت تؤمن بأن البحث جيد.\n\nلكن الملفات التي تركتها غير مقفلة قبل خضوعك تحكي قصة مختلفة. تشير إلى أنك بدأت تشك. أنك رأيت ما كان البرنامج يفعله بالموضوعات — التفارق، الإقامات الممتدة، الاعتماد — وأدركت أنك أوجدت شيئًا لم يعالج شيئًا.\n\nأدخلت نفسك فيه. ليس فقط لتجربته. لمنعه من الاستمرار دون أن يوقفك أحد من إيقافه.\n\nلم تستطع الثقة بنفسك لإغلاقه دون أن تفقد الشجاعة أولًا. لذا أزلت الشجاعة جنبًا إلى جنب مع كل شيء آخر. وتركت أثرًا على أي حال.`,
    choices: [
      {
        id: 'p_wb_leave',
        en: () => 'That is enough. Leave.',
        ar: () => 'يكفي هذا. غادر.',
        next: 'p_ending_success',
        effects: { doctorMode: true },
      },
      {
        id: 'p_wb_secret',
        en: () => 'This is the full truth — face it completely',
        ar: () => 'هذه هي الحقيقة الكاملة — واجهها بالكامل',
        next: 'p_ending_secret',
        effects: { doctorMode: true, memories: 3 },
      },
      {
        id: 'p_wb_other',
        en: (v) => `Free ${v.names?.otherName ?? 'The Other'} first`,
        ar: (v) => `حرر ${v.names?.otherName ?? 'الآخر'} أولًا`,
        next: 'p_demand_freedom',
        effects: {},
      },
      {
        id: 'p_wb_stay',
        en: () => 'Stay another week — you\'re not done processing this',
        ar: () => 'ابقَ أسبوعًا آخر — أنت لم تنتهِ من معالجة هذا',
        next: 'p_compliance_path',
        effects: {},
      },
    ],
  },

  // Additional utility nodes
  {
    id: 'p_morning_two',
    en: (v) =>
      `Morning comes. You've processed. You're still here. In the light of day, St. Adalyn's looks almost ordinary. The garden — there IS a garden, through the common room window — has birds.\n\nDr. ${v.names?.doctorName ?? 'Elias'} brings you breakfast themselves. Not the orderly. Not the quiet nurse.\n\n"You seem more settled today," they say.\n\nYou look at them. The mark on the wrist. The key.\n\n"I have questions," you say.\n\n"I know," they say.`,
    ar: (v) =>
      `يأتي الصباح. لقد عالجت. لا تزال هنا. في ضوء النهار، تبدو سانت أدالِن شبه عادية. الحديقة — هناك حديقة فعليًا، عبر نافذة الغرفة المشتركة — فيها طيور.\n\nالدكتور ${v.names?.doctorName ?? 'إلياس'} يجلب لك الإفطار بنفسهم. ليس المرافق. ليس الممرض الهادئ.\n\n"تبدو أكثر استقرارًا اليوم،" يقولون.\n\nتنظر إليهم. العلامة على المعصم. المفتاح.\n\n"لديّ أسئلة،" تقول.\n\n"أعرف،" يقولون.`,
    choices: [
      {
        id: 'p_m2_marks',
        en: () => 'Ask about the mark on their wrist',
        ar: () => 'اسأل عن العلامة على معصمهم',
        next: 'p_observe_arrival',
        effects: { realityScore: 1 },
      },
      {
        id: 'p_m2_other',
        en: (v) => `Ask about ${v.names?.otherName ?? 'The Other'} — the person you keep seeing`,
        ar: (v) => `اسأل عن ${v.names?.otherName ?? 'الآخر'} — الشخص الذي تراه باستمرار`,
        next: 'p_other_appears',
        condition: (v) => !!v.names?.otherName,
        lockedEn: 'You haven\'t encountered them yet',
        lockedAr: 'لم تصادفهم بعد',
        effects: {},
      },
      {
        id: 'p_m2_records',
        en: () => 'Ask for your medical records',
        ar: () => 'اطلب سجلاتك الطبية',
        next: 'p_records_request',
        effects: {},
      },
      {
        id: 'p_m2_push',
        en: () => 'Push memories — think hard about the gray building',
        ar: () => 'ادفع الذكريات — فكّر بشدة في المبنى الرمادي',
        next: 'p_professional_memory',
        effects: { memories: 1 },
      },
    ],
  },

  {
    id: 'p_midnight_corridor',
    en: () =>
      `You open your door. The corridor is dim — nighttime lighting only, a warm amber strip at floor level.\n\nFour doors away from you, a figure stands. Watching your door. Completely still.\n\nThen they move. Not toward you — away. Down the corridor. Turning left at the nurses' station.\n\nYou follow.\n\nBy the time you reach the turn, the corridor is empty. But one door is not fully closed — room 412.`,
    ar: () =>
      `تفتح بابك. الممر خافت — فقط إضاءة الليل، شريط كهرماني دافئ على مستوى الأرضية.\n\nعلى بعد أربعة أبواب منك، يقف شكل. يراقب بابك. في سكون تام.\n\nثم يتحرك. ليس نحوك — بعيدًا. أسفل الممر. ملتفًا يسارًا عند محطة الممرضات.\n\nتتبعه.\n\nبحلول وصولك إلى المنعطف، الممر فارغ. لكن بابًا واحدًا ليس مغلقًا بالكامل — الغرفة 412.`,
    choices: [
      {
        id: 'p_mc_enter',
        en: () => 'Enter room 412',
        ar: () => 'ادخل الغرفة 412',
        next: 'p_room412_open',
        effects: { realityScore: 2, memories: 1 },
      },
      {
        id: 'p_mc_knock',
        en: () => 'Knock before entering',
        ar: () => 'اطرق قبل الدخول',
        next: 'p_room412',
        effects: { realityScore: 1 },
      },
      {
        id: 'p_mc_retreat',
        en: () => 'Retreat — this could be a trap',
        ar: () => 'تراجع — قد يكون هذا فخًا',
        next: 'p_morning_two',
        effects: {},
      },
      {
        id: 'p_mc_wait',
        en: () => 'Wait in the corridor — see if the figure comes back out',
        ar: () => 'انتظر في الممر — لاحظ إذا عاد الشكل للخروج',
        next: 'p_other_appears',
        effects: { realityScore: 1 },
      },
    ],
  },

  {
    id: 'p_records_request',
    en: (v) =>
      `Dr. ${v.names?.doctorName ?? 'Elias'} is silent for a moment.\n\n"You have every right to your records. We'll prepare them." A pause. "It will take a day."\n\n"A day for what? It's a digital system."\n\nThey meet your eyes. "Some records require attending physician review before patient release."\n\nNine words that tell you everything: they can redact before you see the files.`,
    ar: (v) =>
      `الدكتور ${v.names?.doctorName ?? 'إلياس'} صامت للحظة.\n\n"لديك كل الحق في سجلاتك. سنُعدّها." توقف. "سيستغرق ذلك يومًا."\n\n"يومًا لماذا؟ إنه نظام رقمي."\n\nيلتقون بعيونك. "بعض السجلات تتطلب مراجعة الطبيب المعالج قبل إصدارها للمريض."\n\nتسعة كلمات تخبرك بكل شيء: يمكنهم الحذف قبل أن تر الملفات.`,
    choices: [
      {
        id: 'p_rr_insist',
        en: () => '"Now. Or I walk out and call a lawyer."',
        ar: () => '"الآن. أو أمشي وأتصل بمحامٍ."',
        next: 'p_departure_process',
        effects: { trust: -2, realityScore: 1 },
      },
      {
        id: 'p_rr_room412',
        en: () => 'Skip the official records — find room 412',
        ar: () => 'تجاوز السجلات الرسمية — اجد الغرفة 412',
        next: 'p_room412',
        effects: { realityScore: 2 },
      },
      {
        id: 'p_rr_wait',
        en: () => 'Wait a day — then review',
        ar: () => 'انتظر يومًا — ثم راجع',
        next: 'p_morning_two',
        effects: { trust: 1 },
      },
      {
        id: 'p_rr_other',
        en: (v) => `Find ${v.names?.otherName ?? 'The Other'} instead`,
        ar: (v) => `اجد ${v.names?.otherName ?? 'الآخر'} بدلًا من ذلك`,
        next: 'p_find_other',
        effects: { realityScore: 1 },
      },
    ],
  },

  {
    id: 'p_badge_response',
    en: (v) =>
      `Dr. ${v.names?.doctorName ?? 'Elias'} looks at their badge.\n\n"Left-hand for some facilities. Right-hand for others. Dr. ${v.names?.doctorName ?? '[their name]'}." They tap it. "Does it matter which side?"\n\n"To know if you're telling the truth, yes."\n\nA pause. They don't explain further. They make a note.\n\nYou realize: the note is not about the badge. It's about the fact that you noticed. That you checked.`,
    ar: (v) =>
      `الدكتور ${v.names?.doctorName ?? 'إلياس'} ينظر إلى شارتهم.\n\n"اليسار لبعض المنشآت. اليمين للأخرى. الدكتور ${v.names?.doctorName ?? '[اسمهم]'}." يطرقون عليها. "هل يهم الجانب؟"\n\n"لمعرفة إذا كنت تقول الحقيقة، نعم."\n\nتوقف. لا يفسرون أكثر. يأخذون ملاحظة.\n\nتدرك: الملاحظة ليست عن الشارة. إنها عن حقيقة أنك لاحظت. أنك تحققت.`,
    choices: [
      {
        id: 'p_br_push',
        en: () => '"What did you just write down?"',
        ar: () => '"ماذا دوّنت للتو؟"',
        next: 'p_clipboard_question',
        effects: { realityScore: 1, trust: -1 },
      },
      {
        id: 'p_br_key',
        en: () => 'Ask about the second key on their lanyard',
        ar: () => 'اسأل عن المفتاح الثاني في حزامهم',
        next: 'p_key_question',
        effects: { realityScore: 1 },
      },
      {
        id: 'p_br_cooperate',
        en: () => 'Drop it — cooperate for now',
        ar: () => 'اتركه — تعاون في الوقت الحالي',
        next: 'p_first_session',
        effects: { trust: 1 },
      },
      {
        id: 'p_br_other',
        en: () => 'Ask who else is in this ward',
        ar: () => 'اسأل من آخر في هذا الجناح',
        next: 'p_other_appears',
        effects: {},
      },
    ],
  },

  {
    id: 'p_key_question',
    en: (v) =>
      `Dr. ${v.names?.doctorName ?? 'Elias'} looks at the key. Their hand moves to cover it slightly.\n\n"Personal key. Some staff keep personal items in locked storage."\n\n"In a psychiatric ward?"\n\nA pause. "It's not unusual."\n\nIt IS unusual. Personal locked storage in a psychiatric ward implies something worth locking away. Worth separating from the facility's systems.`,
    ar: (v) =>
      `الدكتور ${v.names?.doctorName ?? 'إلياس'} ينظر إلى المفتاح. يده تتحرك لتغطيه قليلًا.\n\n"مفتاح شخصي. بعض الموظفين يحتفظون بأشياء شخصية في تخزين مقفل."\n\n"في جناح طب نفسي؟"\n\nتوقف. "ليس غير عادي."\n\nإنه غير عادي فعلًا. التخزين الشخصي المقفل في جناح طب نفسي يعني شيئًا يستحق الإخفاء. يستحق الفصل عن أنظمة المنشأة.`,
    choices: [
      {
        id: 'p_kq_let_go',
        en: () => 'Accept this and move on — save the suspicion for later',
        ar: () => 'اقبل هذا وتابع — احتفظ بالشك للاحقًا',
        next: 'p_first_session',
        effects: { trust: 1 },
      },
      {
        id: 'p_kq_push',
        en: () => '"What\'s in the personal storage?"',
        ar: () => '"ما الذي في التخزين الشخصي؟"',
        next: 'p_clipboard_question',
        effects: { trust: -1, realityScore: 1 },
      },
      {
        id: 'p_kq_412',
        en: () => 'Room 412 — find it tonight',
        ar: () => 'الغرفة 412 — اجدها الليلة',
        next: 'p_midnight_corridor',
        effects: { realityScore: 2 },
      },
      {
        id: 'p_kq_other',
        en: () => 'Ask about the other patients in the ward',
        ar: () => 'اسأل عن المرضى الآخرين في الجناح',
        next: 'p_other_appears',
        effects: {},
      },
    ],
  },

  {
    id: 'p_wrist_moment',
    en: (v) =>
      `You point to Dr. ${v.names?.doctorName ?? 'Elias'}\'s wrist without speaking.\n\nThey look down. Then back up at you.\n\nFor three seconds, the clinical distance in their eyes is gone entirely. Something real — something tired and real — looks at you.\n\nThen it's back.\n\n"An old injury," they say. "From many years ago."\n\nThey make a note. You see your own wrist for the first time — the same mark. Identical placement.`,
    ar: (v) =>
      `تشير إلى معصم الدكتور ${v.names?.doctorName ?? 'إلياس'} دون كلام.\n\nيخفضون النظر. ثم يعودون للنظر إليك.\n\nلثلاث ثوانٍ، المسافة السريرية في عيونهم تختفي تمامًا. شيء حقيقي — شيء متعب وحقيقي — ينظر إليك.\n\nثم يعود.\n\n"إصابة قديمة،" يقولون. "من سنوات كثيرة."\n\nيأخذون ملاحظة. ترى معصمك الخاص للمرة الأولى — نفس العلامة. نفس الموضع بالضبط.`,
    choices: [
      {
        id: 'p_wm_push',
        en: () => '"I have the same mark. What does it mean?"',
        ar: () => '"لديّ نفس العلامة. ماذا تعني؟"',
        next: 'p_mark_meaning',
        condition: (v) => v.realityScore >= 2,
        lockedEn: 'You haven\'t noticed your own wrist yet',
        lockedAr: 'لم تلاحظ معصمك الخاص بعد',
        effects: { realityScore: 2, memories: 1 },
      },
      {
        id: 'p_wm_drop',
        en: () => 'Accept their answer and cooperate',
        ar: () => 'اقبل إجابتهم وتعاون',
        next: 'p_first_session',
        effects: { trust: 1 },
      },
      {
        id: 'p_wm_other',
        en: () => 'Look for the same mark on other staff members',
        ar: () => 'ابحث عن نفس العلامة على أعضاء الطاقم الآخرين',
        next: 'p_other_study',
        condition: (v) => !!v.names?.otherName,
        lockedEn: 'Find The Other first',
        lockedAr: 'اجد الآخر أولًا',
        effects: { realityScore: 1 },
      },
      {
        id: 'p_wm_memory',
        en: () => 'Try to push the memory — what do you know about this mark?',
        ar: () => 'حاول دفع الذاكرة — ماذا تعرف عن هذه العلامة؟',
        next: 'p_professional_memory',
        effects: { memories: 1 },
      },
    ],
  },

  {
    id: 'p_consistently_refusing',
    en: (v) =>
      `Three days of refusing. The documentation is growing thick.\n\nDr. ${v.names?.doctorName ?? 'Elias'} informs you, very calmly, that consistent refusal of prescribed medication in a voluntary care setting could trigger a mandatory psychiatric review. "Not a threat," they add. "Protocol."\n\nYou understand: comply or be involuntarily committed. And involuntary commitment removes your ability to leave at will.`,
    ar: (v) =>
      `ثلاثة أيام من الرفض. التوثيق يصبح سميكًا.\n\nالدكتور ${v.names?.doctorName ?? 'إلياس'} يبلغك، بهدوء تام، أن الرفض المتسق لدواء موصوف في بيئة رعاية طوعية يمكن أن يثير مراجعة نفسية إلزامية. "ليس تهديدًا،" يضيفون. "بروتوكول."\n\nتفهم: امتثل أو يُودَع قسرًا. والإيداع القسري يزيل قدرتك على المغادرة إراديًا.`,
    choices: [
      {
        id: 'p_cr_fake',
        en: () => 'Start faking compliance — take and discard',
        ar: () => 'ابدأ التظاهر بالامتثال — خذ واتخلص',
        next: 'p_fake_meds',
        effects: { trust: 1, realityScore: 2 },
      },
      {
        id: 'p_cr_leave',
        en: () => 'Demand to leave — you can\'t be held involuntarily yet',
        ar: () => 'اطلب المغادرة — لا يمكن احتجازك قسرًا بعد',
        next: 'p_departure_process',
        effects: { trust: -2 },
      },
      {
        id: 'p_cr_take',
        en: () => 'Take the medication — you\'re not winning this battle',
        ar: () => 'خذ الدواء — لم تربح هذه المعركة',
        next: 'p_medicated',
        effects: { trust: 1, medicationTaken: 1 },
      },
      {
        id: 'p_cr_room412',
        en: () => 'Find room 412 before they can formally review you',
        ar: () => 'اجد الغرفة 412 قبل أن يستطيعوا مراجعتك رسميًا',
        next: 'p_midnight_corridor',
        effects: { realityScore: 2 },
      },
    ],
  },

  {
    id: 'p_nurse_clue',
    en: () =>
      `The nurse left a small tray with the cup. On the tray — a printed sheet, folded to show only the dosage information.\n\nYou unfold it. The medication name on the top of the sheet has been folded under — but there's a shadow through the paper. You hold it to the light.\n\nThe full name: ARES-7 COMPOSITE (Haloperidol/Dissociative Agent Blend) — RESEARCH GRADE.\n\nNot a standard prescription. A research compound.`,
    ar: () =>
      `الممرض ترك صينية صغيرة مع الكوب. على الصينية — ورقة مطبوعة، مطوية لتظهر فقط معلومات الجرعة.\n\nتنشرها. اسم الدواء في أعلى الورقة مطوي تحت — لكن هناك ظل عبر الورقة. تضعها في مواجهة الضوء.\n\nالاسم الكامل: مركب آريس-7 (مزيج هالوبيريدول / عامل تفارق) — درجة بحثية.\n\nليس وصفة طبية قياسية. مركب بحثي.`,
    choices: [
      {
        id: 'p_nc_research',
        en: () => 'Research compound — this is experimental treatment. Confront Dr. Elias.',
        ar: () => 'مركب بحثي — هذا علاج تجريبي. واجه الدكتور.',
        next: 'p_doctor_confrontation',
        effects: { realityScore: 3, trust: -2 },
      },
      {
        id: 'p_nc_room',
        en: () => 'ARES. Program ARES. Find room 412.',
        ar: () => 'آريس. برنامج آريس. اجد الغرفة 412.',
        next: 'p_room412',
        effects: { realityScore: 3, memories: 2 },
      },
      {
        id: 'p_nc_hide',
        en: () => 'Keep this — it\'s evidence. Hide it and act normal.',
        ar: () => 'احتفظ بهذا — إنه دليل. أخفِه وتصرف بشكل طبيعي.',
        next: 'p_private_record',
        effects: { realityScore: 2 },
      },
      {
        id: 'p_nc_other',
        en: (v) => `Find ${v.names?.otherName ?? 'The Other'} — show them this`,
        ar: (v) => `اجد ${v.names?.otherName ?? 'الآخر'} — أرهم هذا`,
        next: 'p_find_other',
        condition: (v) => !!v.names?.otherName,
        lockedEn: 'Find The Other first',
        lockedAr: 'اجد الآخر أولًا',
        effects: { realityScore: 2 },
      },
    ],
  },

  {
    id: 'p_office_memory',
    en: () =>
      `You close your eyes and push into the memory.\n\nA desk. Your desk. The nameplate is still blurred. But the papers on it — you can see them clearly now. Patient files. Research files. ARES in bold on the folders.\n\nYou are the researcher. You were sitting in that room assessing how the protocol was working on other people.\n\nThen — a decision. A moment of decision. You, picking up a pen. You, signing something. \n\nConsent form. Your own name on the patient line.`,
    ar: () =>
      `تغمض عينيك وتدفع في الذاكرة.\n\nمكتب. مكتبك. لافتة الاسم لا تزال ضبابية. لكن الأوراق عليه — يمكنك رؤيتها بوضوح الآن. ملفات مرضى. ملفات أبحاث. آريس بالخط العريض على المجلدات.\n\nأنت الباحث. كنت جالسًا في تلك الغرفة تقيّم كيف يعمل البروتوكول على أشخاص آخرين.\n\nثم — قرار. لحظة قرار. أنت، تمسك قلمًا. أنت، توقّع شيئًا. \n\nاستمارة موافقة. اسمك في خانة المريض.`,
    choices: [
      {
        id: 'p_om_accept',
        en: () => 'You volunteered yourself. Accept this and find your way out.',
        ar: () => 'أنت تطوّعت بنفسك. اقبل هذا واجد طريقك للخروج.',
        next: 'p_files_reveal',
        effects: { doctorMode: true, memories: 3, realityScore: 2 },
      },
      {
        id: 'p_om_why',
        en: () => 'But WHY? What pushed you to do this to yourself?',
        ar: () => 'لكن لماذا؟ ما الذي دفعك لفعل هذا بنفسك؟',
        next: 'p_who_before',
        effects: { memories: 2 },
      },
      {
        id: 'p_om_room',
        en: () => 'Room 412 — your office is number 412',
        ar: () => 'الغرفة 412 — مكتبك الرقم 412',
        next: 'p_room412_open',
        effects: { memories: 2, realityScore: 2 },
      },
      {
        id: 'p_om_elias',
        en: (v) => `Tell Dr. ${v.names?.doctorName ?? 'Elias'} what you\'ve just remembered`,
        ar: (v) => `أخبر الدكتور ${v.names?.doctorName ?? 'إلياس'} بما تذكّرته للتو`,
        next: 'p_doctor_confrontation',
        effects: { memories: 2, doctorMode: true },
      },
    ],
  },

  {
    id: 'p_memory_push',
    en: () =>
      `You push. The hallway. The doors. The numbers.\n\nYou were moving with purpose. It wasn't a visit. It was rounds.\n\nYou were checking on patients. Your patients. In the rooms numbered 401 through 407. Checking their responses, their recall, their reintegration progress.\n\nYou were the one with the clipboard. You were the one in the professional clothes. You were the one who wrote notes.\n\nThe memory collapses before you can see your own face clearly. But you know: you were not a patient in that hallway.`,
    ar: () =>
      `تدفع. الممر. الأبواب. الأرقام.\n\nكنت تتحرك بقصد. لم تكن زيارة. كانت جولات.\n\nكنت تتفقد المرضى. مرضاك. في الغرف المرقّمة من 401 إلى 407. تتحقق من ردود أفعالهم، ذاكرتهم، تقدم إعادة تكاملهم.\n\nكنت من يحمل الحافظة. كنت من يرتدي الملابس المهنية. كنت من يكتب الملاحظات.\n\nالذاكرة تنهار قبل أن تستطيع رؤية وجهك بوضوح. لكنك تعرف: لم تكن مريضًا في ذلك الممر.`,
    choices: [
      {
        id: 'p_mp_confront',
        en: (v) => `Confront Dr. ${v.names?.doctorName ?? 'Elias'} with this memory`,
        ar: (v) => `واجه الدكتور ${v.names?.doctorName ?? 'إلياس'} بهذه الذكرى`,
        next: 'p_doctor_confrontation',
        effects: { memories: 2, realityScore: 1 },
      },
      {
        id: 'p_mp_room',
        en: () => 'Room 412 — what\'s in there?',
        ar: () => 'الغرفة 412 — ما الذي فيها؟',
        next: 'p_room412',
        effects: { memories: 1 },
      },
      {
        id: 'p_mp_push_more',
        en: () => 'Push harder into the memory — see your face',
        ar: () => 'ادفع أعمق في الذاكرة — اعرف وجهك',
        next: 'p_office_memory',
        effects: { memories: 2 },
      },
      {
        id: 'p_mp_other',
        en: (v) => `Find ${v.names?.otherName ?? 'The Other'} — tell them what you remembered`,
        ar: (v) => `اجد ${v.names?.otherName ?? 'الآخر'} — أخبرهم بما تذكّرت`,
        next: 'p_other_revelation',
        condition: (v) => !!v.names?.otherName,
        lockedEn: 'Find The Other first',
        lockedAr: 'اجد الآخر أولًا',
        effects: { memories: 1 },
      },
    ],
  },

  {
    id: 'p_doctor_knows',
    en: (v) =>
      `Dr. ${v.names?.doctorName ?? 'Elias'} tells you what they claim to know:\n\nYou arrived three weeks ago in severe distress. You couldn't state your name or identify basic biographical details. You were gently admitted under a voluntary care protocol.\n\nThey use the word 'gently' twice. You notice this.\n\nWhat they claim NOT to know: what caused the distress. Whether you have family to contact. Your occupation.\n\nThings they should have on file if you were admitted properly: all of those things.`,
    ar: (v) =>
      `الدكتور ${v.names?.doctorName ?? 'إلياس'} يخبرك بما يدّعون معرفته:\n\nأنت وصلت قبل ثلاثة أسابيع في ضائقة شديدة. لم تتمكن من إعلان اسمك أو تحديد التفاصيل البيوغرافية الأساسية. تم قبولك بلطف تحت بروتوكول رعاية طوعية.\n\nيستخدمون كلمة 'بلطف' مرتين. تلاحظ هذا.\n\nما يدّعون عدم معرفته: ما سبّب الضائقة. إذا كان لديك عائلة للتواصل معها. مهنتك.\n\nأشياء كان يجب أن تكون في الملف إذا تم قبولك بشكل صحيح: كل تلك الأشياء.`,
    choices: [
      {
        id: 'p_dk_push',
        en: () => '"Why is none of that in my file?"',
        ar: () => '"لماذا لا يوجد أي من ذلك في ملفي؟"',
        next: 'p_clipboard_question',
        effects: { realityScore: 2, trust: -1 },
      },
      {
        id: 'p_dk_records',
        en: () => 'Request the full records immediately',
        ar: () => 'اطلب السجلات الكاملة فورًا',
        next: 'p_records_request',
        effects: { realityScore: 1 },
      },
      {
        id: 'p_dk_family',
        en: () => '"If you don\'t know who I am, how do you know I have no family to contact?"',
        ar: () => '"إذا لا تعرفون من أنا، كيف تعرفون أنه لا توجد عائلة للتواصل معها؟"',
        next: 'p_doctor_confrontation',
        effects: { realityScore: 2, trust: -1 },
      },
      {
        id: 'p_dk_cooperate',
        en: () => 'Accept this for now and cooperate',
        ar: () => 'اقبل هذا في الوقت الحالي وتعاون',
        next: 'p_first_session',
        effects: { trust: 2 },
      },
    ],
  },

  {
    id: 'p_form_examine',
    en: () =>
      `You study every corner of the form.\n\nAdmission date. Three weeks ago. Check.\nTreating physician: Dr. ${`[Elias name]`}. Check.\nFacility code: STD-ARES. Not STD-GEN (general). Not STD-ACUTE.\n\nSTD-ARES. A separate admission track.\n\nYou are not in the general psychiatric ward.\n\nYou are in the ARES wing.`,
    ar: () =>
      `تدرس كل زاوية من الاستمارة.\n\nتاريخ القبول. قبل ثلاثة أسابيع. صحيح.\nالطبيب المعالج: الدكتور ${`[اسم إلياس]`}. صحيح.\nرمز المنشأة: STD-ARES. ليس STD-GEN (عام). ليس STD-ACUTE.\n\nSTD-ARES. مسار قبول منفصل.\n\nأنت لست في جناح الطب النفسي العام.\n\nأنت في جناح آريس.`,
    choices: [
      {
        id: 'p_fe_confront',
        en: (v) => `Confront Dr. ${v.names?.doctorName ?? 'Elias'} — what is ARES?`,
        ar: (v) => `واجه الدكتور ${v.names?.doctorName ?? 'إلياس'} — ما هو آريس؟`,
        next: 'p_doctor_confrontation',
        effects: { realityScore: 3, trust: -2 },
      },
      {
        id: 'p_fe_room',
        en: () => 'Find room 412 — that\'s where the ARES files are',
        ar: () => 'اجد الغرفة 412 — هناك توجد ملفات آريس',
        next: 'p_room412',
        effects: { realityScore: 2 },
      },
      {
        id: 'p_fe_other',
        en: (v) => `Find ${v.names?.otherName ?? 'The Other'} — they said they worked here`,
        ar: (v) => `اجد ${v.names?.otherName ?? 'الآخر'} — قالوا إنهم عملوا هنا`,
        next: 'p_find_other',
        condition: (v) => !!v.names?.otherName,
        lockedEn: 'Find The Other first',
        lockedAr: 'اجد الآخر أولًا',
        effects: { realityScore: 2 },
      },
      {
        id: 'p_fe_accept',
        en: () => 'File this information and cooperate for now',
        ar: () => 'سجّل هذه المعلومات وتعاون في الوقت الحالي',
        next: 'p_first_session',
        effects: { trust: 1, realityScore: 1 },
      },
    ],
  },

  {
    id: 'p_delusion_detail',
    en: (v) =>
      `Dr. ${v.names?.doctorName ?? 'Elias'} meets your eyes.\n\n"The primary presenting delusion was that you were a medical professional. You claimed to have institutional authority. You attempted to give instructions to staff members."A pause. "When those instructions were not followed, you became distressed."\n\nYou hear this. You consider it.\n\nA person who believes they are a doctor, acting like a doctor, dismissed as delusional by the actual doctors.\n\nOr: an actual doctor who has been placed in a situation where no one will confirm their identity.`,
    ar: (v) =>
      `الدكتور ${v.names?.doctorName ?? 'إلياس'} يلتقي بعيونك.\n\n"الوهم الرئيسي المُقدَّم كان أنك متخصص طبي. ادّعيت امتلاك صلاحية مؤسسية. حاولت إعطاء تعليمات لأعضاء الطاقم." توقف. "حين لم تُتّبع هذه التعليمات، ازداد ضائقتك."\n\nتسمع هذا. تفكّر فيه.\n\nشخص يؤمن بأنه طبيب، يتصرف كطبيب، يُرفض كواهم من قِبل الأطباء الفعليين.\n\nأو: طبيب فعلي جُعل في وضع لا يؤكد فيه أحد هويته.`,
    choices: [
      {
        id: 'p_dd_test',
        en: () => 'Ask them a specific clinical question only a doctor would know',
        ar: () => 'اسألهم سؤالًا سريريًا محددًا لا يعرفه إلا الطبيب',
        next: 'p_professional_memory',
        effects: { realityScore: 2, memories: 1 },
      },
      {
        id: 'p_dd_accept',
        en: () => 'Accept the diagnosis tentatively — cooperate',
        ar: () => 'اقبل التشخيص مبدئيًا — تعاون',
        next: 'p_first_session',
        effects: { trust: 2, realityScore: -1 },
      },
      {
        id: 'p_dd_room',
        en: () => 'Room 412 — find what\'s there tonight',
        ar: () => 'الغرفة 412 — اجد ما فيها الليلة',
        next: 'p_midnight_corridor',
        effects: { realityScore: 1 },
      },
      {
        id: 'p_dd_other',
        en: () => 'There\'s someone else here who you\'ve glimpsed — find them',
        ar: () => 'هناك شخص آخر هنا رأيته طرفًا منه — اجده',
        next: 'p_other_appears',
        effects: { realityScore: 1 },
      },
    ],
  },

  {
    id: 'p_name_redacted',
    en: (v) =>
      `"Standard procedure," Dr. ${v.names?.doctorName ?? 'Elias'} says. "For patients with identity-related presenting symptoms, anchoring them to an external name before they've had a chance to access their own can create false recovery. We want your memories to come from you, not from a label."\n\nThis is also a real protocol. Every word they say is technically correct.\n\nAnd yet: "DO NOT GIVE A PATIENT THEIR OWN NAME" is not a standard procedure anywhere. It is a specific, careful choice.`,
    ar: (v) =>
      `"إجراء قياسي،" يقول الدكتور ${v.names?.doctorName ?? 'إلياس'}. "للمرضى ذوي الأعراض المتعلقة بالهوية، تثبيتهم على اسم خارجي قبل أن تتاح لهم فرصة الوصول لاسمهم الخاص قد يخلق تعافيًا زائفًا. نريد ذكرياتك أن تأتي منك، لا من علامة."\n\nهذا أيضًا بروتوكول حقيقي. كل كلمة يقولونها صحيحة تقنيًا.\n\nومع ذلك: "لا تعطِ المريض اسمه الخاص" ليس إجراءً قياسيًا في أي مكان. إنه خيار محدد ومتأنٍّ.`,
    choices: [
      {
        id: 'p_nr_trust',
        en: () => 'Accept this explanation and cooperate',
        ar: () => 'اقبل هذا التفسير وتعاون',
        next: 'p_first_session',
        effects: { trust: 2 },
      },
      {
        id: 'p_nr_demand',
        en: () => '"Tell me my name. From the records."',
        ar: () => '"أخبرني باسمي. من السجلات."',
        next: 'p_doctor_confrontation',
        effects: { trust: -1, realityScore: 1 },
      },
      {
        id: 'p_nr_push',
        en: () => 'Try to access your own name right now — focus everything on it',
        ar: () => 'حاول الوصول إلى اسمك الخاص الآن — ركّز كل شيء على ذلك',
        next: 'p_name_attempt',
        effects: { memories: 1 },
      },
      {
        id: 'p_nr_mark',
        en: () => 'Ask about the mark on their wrist instead',
        ar: () => 'اسأل عن العلامة على معصمهم بدلًا من ذلك',
        next: 'p_wrist_moment',
        effects: { realityScore: 1 },
      },
    ],
  },

  {
    id: 'p_name_attempt',
    en: () =>
      `You push. Hard.\n\nThe slot is there. You can feel it. It's like pressing a finger into a bruise that isn't visible — the pain is there but you can't see the wound.\n\nA letter. A first letter. Feeling rather than seeing: something with a curve. A C, or G, or O, or S.\n\nThen it's gone. Your head aches.\n\nBut you got something. A shape. A starting point.`,
    ar: () =>
      `تدفع. بشدة.\n\nالفتحة موجودة. تستطيع الإحساس بها. مثل الضغط بإصبع على كدمة غير مرئية — الألم موجود لكن لا ترى الجرح.\n\nحرف. حرف أول. إحساس لا رؤية: شيء ذو منحنى. C، أو G، أو O، أو S.\n\nثم يختفي. رأسك يؤلمه.\n\nلكنك حصلت على شيء. شكل. نقطة بداية.`,
    choices: [
      {
        id: 'p_na_continue',
        en: () => 'Keep pressing — try for the second letter',
        ar: () => 'استمر في الضغط — حاول للحرف الثاني',
        next: 'p_professional_memory',
        effects: { memories: 2 },
      },
      {
        id: 'p_na_rest',
        en: () => 'Stop — your head can\'t take more pressure right now',
        ar: () => 'توقف — رأسك لا يستطيع تحمل مزيد من الضغط الآن',
        next: 'p_morning_two',
        effects: {},
      },
      {
        id: 'p_na_tell',
        en: (v) => `Tell Dr. ${v.names?.doctorName ?? 'Elias'} what you accessed`,
        ar: (v) => `أخبر الدكتور ${v.names?.doctorName ?? 'إلياس'} بما وصلت إليه`,
        next: 'p_fragment_memory',
        effects: { trust: 1, memories: 1 },
      },
      {
        id: 'p_na_other',
        en: () => 'Look for the person you keep glimpsing in the corridor',
        ar: () => 'ابحث عن الشخص الذي تلمحه باستمرار في الممر',
        next: 'p_other_appears',
        effects: {},
      },
    ],
  },

  {
    id: 'p_ward_explained',
    en: (v) =>
      `Dr. ${v.names?.doctorName ?? 'Elias'} explains: St. Adalyn's is a private psychiatric care facility. This wing has sixteen rooms. Currently occupied: eight patients. The roster is not something they share between patients.\n\nYou have full access to the common areas, garden, library. Meals at 7, 12, and 6. Lights out at 10, but not enforced — just recommended.\n\n"It's more like a retreat than a hospital," they say.\n\nThe word 'retreat' sits wrong. Retreats have exits.`,
    ar: (v) =>
      `الدكتور ${v.names?.doctorName ?? 'إلياس'} يشرح: سانت أدالِن منشأة رعاية نفسية خاصة. هذا الجناح فيه ستة عشر غرفة. مشغول حاليًا: ثمانية مرضى. القائمة ليست شيئًا يشاركونه بين المرضى.\n\nلديك وصول كامل للمناطق المشتركة، الحديقة، المكتبة. الوجبات في 7، 12، و6. إضاءة مطفأة في 10، لكن غير مفروضة — مجرد توصية.\n\n"إنه أشبه بملجأ من مستشفى،" يقولون.\n\nكلمة 'ملجأ' تبدو خاطئة. الملاجئ لها مخارج.`,
    choices: [
      {
        id: 'p_we_exit',
        en: () => '"Where is the exit? The main doors?"',
        ar: () => '"أين المخرج؟ الأبواب الرئيسية؟"',
        next: 'p_doctor_reveals',
        effects: { trust: -1, realityScore: 1 },
      },
      {
        id: 'p_we_others',
        en: () => '"The other patients — can I interact with them?"',
        ar: () => '"المرضى الآخرون — هل يمكنني التفاعل معهم؟"',
        next: 'p_other_appears',
        effects: {},
      },
      {
        id: 'p_we_library',
        en: () => '"The library — what\'s in it?"',
        ar: () => '"المكتبة — ما فيها؟"',
        next: 'p_first_session',
        effects: { memories: 1 },
      },
      {
        id: 'p_we_meds',
        en: () => 'Accept the medication — it might help',
        ar: () => 'اقبل الدواء — قد يساعد',
        next: 'p_first_session',
        effects: { trust: 1 },
      },
    ],
  },

  {
    id: 'p_other_trust_question',
    en: (v) =>
      `${v.names?.otherName ?? 'The Other'} considers this.\n\n"You shouldn't. You don't know me. But I'll tell you this: I'm the only person in this unit who hasn't been given medication against my will. I'm the only one whose file doesn't have a research code on it. I'm not better off here than you. But I'm at least accurately documented."\n\nA pause.\n\n"Also — there's a mark on your wrist. Check it. Then look at Dr. ${v.names?.doctorName ?? 'Elias'}\'s wrist. Same mark."`,
    ar: (v) =>
      `${v.names?.otherName ?? 'الآخر'} يعتبر هذا.\n\n"لا يجب. لا تعرفني. لكنني سأخبرك بهذا: أنا الشخص الوحيد في هذه الوحدة الذي لم يُعطَ دواءً ضد إرادته. أنا الوحيد الذي لا يحتوي ملفه على رمز بحث. لست في وضع أفضل هنا منك. لكنني على الأقل موثق بدقة."\n\nتوقف.\n\n"وأيضًا — هناك علامة على معصمك. تحقق منها. ثم انظر إلى معصم الدكتور ${v.names?.doctorName ?? 'إلياس'}. نفس العلامة."`,
    choices: [
      {
        id: 'p_otq_mark',
        en: () => 'Check your wrist — look at the mark',
        ar: () => 'تحقق من معصمك — انظر إلى العلامة',
        next: 'p_mark_meaning',
        effects: { realityScore: 2, memories: 1 },
      },
      {
        id: 'p_otq_revelation',
        en: () => '"Tell me what they haven\'t told me."',
        ar: () => '"أخبرني ما لم يخبروني به."',
        next: 'p_other_revelation',
        effects: { realityScore: 1 },
      },
      {
        id: 'p_otq_room412',
        en: () => '"Room 412. What\'s in there?"',
        ar: () => '"الغرفة 412. ما فيها؟"',
        next: 'p_room412',
        effects: { realityScore: 1 },
      },
      {
        id: 'p_otq_leave',
        en: () => 'Leave this alone — too uncertain',
        ar: () => 'اترك هذا جانبًا — غير مؤكد',
        next: 'p_morning_two',
        effects: {},
      },
    ],
  },

  {
    id: 'p_other_proof',
    en: (v) =>
      `${v.names?.otherName ?? 'The Other'} nods. They reach into their sock — smooth, practiced — and produce a press credential. Creased but clearly real.\n\n[Their name]. Investigative Journalist.\n\n"I've kept this since day one," they say. "They thought they took everything. They missed this."\n\nIt's real. You can see it. You believe it.`,
    ar: (v) =>
      `${v.names?.otherName ?? 'الآخر'} يومئ. يمد يده في جوربه — بسلاسة، ببراعة — ويُخرج بطاقة صحفية. متجعدة لكنها واضحة الأصالة.\n\n[اسمه]. صحفي استقصائي.\n\n"احتفظت بهذا منذ اليوم الأول،" يقولون. "ظنوا أنهم أخذوا كل شيء. فاتهم هذا."\n\nإنه حقيقي. يمكنك رؤيته. أنت مصدّق.`,
    choices: [
      {
        id: 'p_op_room412',
        en: () => 'Go for room 412 together',
        ar: () => 'اذهبا معًا للغرفة 412',
        next: 'p_room412',
        effects: { realityScore: 2 },
      },
      {
        id: 'p_op_revelation',
        en: () => '"Tell me what you know about what\'s happening here."',
        ar: () => '"أخبرني ما تعرفه عما يحدث هنا."',
        next: 'p_other_revelation',
        effects: { realityScore: 1 },
      },
      {
        id: 'p_op_wrist',
        en: () => 'Check your own wrist — they mentioned a mark',
        ar: () => 'تحقق من معصمك الخاص — ذكروا علامة',
        next: 'p_mark_meaning',
        effects: { realityScore: 1 },
      },
      {
        id: 'p_op_elias',
        en: (v) => `Tell Dr. ${v.names?.doctorName ?? 'Elias'} about this journalist`,
        ar: (v) => `أخبر الدكتور ${v.names?.doctorName ?? 'إلياس'} عن هذا الصحفي`,
        next: 'p_other_vs_doctor',
        effects: { trust: 1 },
      },
    ],
  },

  {
    id: 'p_other_vs_doctor',
    en: (v) =>
      `You tell Dr. ${v.names?.doctorName ?? 'Elias'} about ${v.names?.otherName ?? 'The Other'}.\n\nThe response is measured. Too measured.\n\n"That patient has been presenting with a narrative delusional framework. They believe they are an investigative journalist who was placed here against their will. This is a coherent but false belief system. We've documented it extensively."\n\nA pause.\n\n"It's actually very common for patients in this setting to create alternative narratives about why they're here. It feels more manageable than the truth."\n\nTwo people telling you two different stories. One has a medical degree. One has a press credential.`,
    ar: (v) =>
      `تخبر الدكتور ${v.names?.doctorName ?? 'إلياس'} عن ${v.names?.otherName ?? 'الآخر'}.\n\nالرد مُحكم. مُحكم أكثر مما ينبغي.\n\n"ذلك المريض يقدم إطار وهمي سردي. يعتقدون أنهم صحفي استقصائي وُضع هنا ضد إرادتهم. هذا نظام معتقد متماسك لكن خاطئ. وثّقناه بشكل مستفيض."\n\nتوقف.\n\n"إنه في الواقع شائع جدًا للمرضى في هذا الإعداد أن يخلقوا سرديات بديلة عن سبب وجودهم هنا. يبدو أكثر قابلية للإدارة من الحقيقة."\n\nشخصان يخبرانك قصتين مختلفتين. أحدهما لديه درجة طبية. الآخر لديه بطاقة صحفية.`,
    choices: [
      {
        id: 'p_ovd_other',
        en: (v) => `Believe ${v.names?.otherName ?? 'The Other'}`,
        ar: (v) => `صدّق ${v.names?.otherName ?? 'الآخر'}`,
        next: 'p_other_revelation',
        effects: { trust: -1, realityScore: 2 },
      },
      {
        id: 'p_ovd_doctor',
        en: (v) => `Believe Dr. ${v.names?.doctorName ?? 'Elias'}`,
        ar: (v) => `صدّق الدكتور ${v.names?.doctorName ?? 'إلياس'}`,
        next: 'p_compliance_path',
        effects: { trust: 2, realityScore: -1 },
      },
      {
        id: 'p_ovd_neither',
        en: () => 'Trust neither. Investigate room 412.',
        ar: () => 'لا تصدّق أيًا منهما. حقق في الغرفة 412.',
        next: 'p_room412',
        effects: { realityScore: 3 },
      },
      {
        id: 'p_ovd_verify',
        en: () => 'Ask for verifiable facts from both',
        ar: () => 'اطلب حقائق قابلة للتحقق من كليهما',
        next: 'p_files_reveal',
        effects: { realityScore: 2 },
      },
    ],
  },

  {
    id: 'p_hiding_together',
    en: (v) =>
      `You and ${v.names?.otherName ?? 'The Other'} press against the wall in a supply closet while footsteps pass.\n\nThey are breathing steadily. You are not.\n\n"Breathe," they whisper. "Slowly."\n\nThe footsteps pass.\n\nWhen the corridor is clear, they look at you: "Tomorrow night. The keypad. 1114. It's the program initiation date. I found it in a maintenance log."`,
    ar: (v) =>
      `أنت و${v.names?.otherName ?? 'الآخر'} تضغطان على الجدار في خزانة لوازم بينما تمر خطوات.\n\nهم يتنفسون بثبات. أنت لا.\n\n"تنفس،" يهمسون. "ببطء."\n\nتمر الخطوات.\n\nحين يصفو الممر، ينظرون إليك: "غدًا ليلًا. لوحة المفاتيح. 1114. إنه تاريخ انطلاق البرنامج. وجدته في سجل صيانة."`,
    choices: [
      {
        id: 'p_ht_now',
        en: () => 'Try room 412 now while the corridor is clear',
        ar: () => 'جرّب الغرفة 412 الآن بينما الممر صافٍ',
        next: 'p_room412',
        effects: { realityScore: 2, memories: 1 },
      },
      {
        id: 'p_ht_tomorrow',
        en: () => 'Tomorrow night — follow their plan',
        ar: () => 'غدًا ليلًا — اتبع خطتهم',
        next: 'p_morning_two',
        effects: {},
      },
      {
        id: 'p_ht_revelation',
        en: () => '"How did you find the initiation date? Tell me everything you know."',
        ar: () => '"كيف وجدت تاريخ الانطلاق؟ أخبرني بكل ما تعرفه."',
        next: 'p_other_revelation',
        effects: { realityScore: 1, memories: 1 },
      },
      {
        id: 'p_ht_trust',
        en: () => 'Back to your room — you\'re not sure you trust this plan',
        ar: () => 'ارجع إلى غرفتك — لست متأكدًا من الثقة بهذه الخطة',
        next: 'p_morning_two',
        effects: {},
      },
    ],
  },

  {
    id: 'p_private_record',
    en: () =>
      `You find a pen — one they missed when they cleared your room — and begin writing on the inside of your pillowcase where the fabric is white enough and the pen dark enough.\n\nYou write everything you know. Every inconsistency. Every observation.\n\nThe list grows. By the time you stop, you have fourteen items.\n\nYou look at the list.\n\nFourteen items of specific, detailed, consistent anomalies from a person who ostensibly has no memory of basic biographical information.\n\nSomeone who can build a case but can't remember their name.`,
    ar: () =>
      `تجد قلمًا — واحدًا فاتهم حين أخلوا غرفتك — وتبدأ الكتابة على الجانب الداخلي من كيس وسادتك حيث القماش أبيض بما يكفي والحبر داكن بما يكفي.\n\nتكتب كل ما تعرفه. كل تناقض. كل ملاحظة.\n\nتنمو القائمة. حين تتوقف، لديك أربعة عشر بندًا.\n\nتنظر إلى القائمة.\n\nأربعة عشر بندًا من الشذوذات المحددة والمفصلة والمتسقة من شخص يُفترض أنه لا يملك أي ذاكرة لمعلومات بيوغرافية أساسية.\n\nشخص يستطيع بناء قضية لكن لا يستطيع تذكر اسمه.`,
    choices: [
      {
        id: 'p_pr_room',
        en: () => 'Find room 412 — the answers must be there',
        ar: () => 'اجد الغرفة 412 — الإجابات يجب أن تكون هناك',
        next: 'p_midnight_corridor',
        effects: { realityScore: 2 },
      },
      {
        id: 'p_pr_other',
        en: (v) => `Find ${v.names?.otherName ?? 'The Other'} — show them the list`,
        ar: (v) => `اجد ${v.names?.otherName ?? 'الآخر'} — أرهم القائمة`,
        next: 'p_find_other',
        condition: (v) => !!v.names?.otherName,
        lockedEn: 'Find The Other first',
        lockedAr: 'اجد الآخر أولًا',
        effects: { realityScore: 2 },
      },
      {
        id: 'p_pr_confront',
        en: (v) => `Show the list to Dr. ${v.names?.doctorName ?? 'Elias'}`,
        ar: (v) => `أرِ القائمة للدكتور ${v.names?.doctorName ?? 'إلياس'}`,
        next: 'p_doctor_confrontation',
        effects: { realityScore: 2, trust: -1 },
      },
      {
        id: 'p_pr_continue',
        en: () => 'Keep the list safe and keep observing',
        ar: () => 'ابقِ القائمة آمنة واستمر في الملاحظة',
        next: 'p_morning_two',
        effects: { realityScore: 1 },
      },
    ],
  },

  {
    id: 'p_nurse_summoned',
    en: (v) =>
      `The nurse who comes is not the quiet medication nurse. This one is larger, competent-looking, with an expression of measured concern.\n\n"Can't sleep?" they ask.\n\n"Someone was at my door." A pause. "Did you see anyone in the corridor just now?"\n\nThey look left. Look right. "No one. Just me."\n\nThey say this immediately. Without actually taking time to look.`,
    ar: (v) =>
      `الممرض الذي يأتي ليس الممرض الهادئ للدواء. هذا أضخم، يبدو كفؤًا، بتعبير قلق مُحكم.\n\n"لا تستطيع النوم؟" يسأل.\n\n"كان هناك شخص ما عند بابي." توقف. "هل رأيت أحدًا في الممر للتو؟"\n\nينظر يسارًا. ينظر يمينًا. "لا أحد. أنا فقط."\n\nيقول هذا فورًا. دون أن يأخذ وقتًا فعليًا للنظر.`,
    choices: [
      {
        id: 'p_ns_pressed',
        en: () => '"You didn\'t actually look. Check again."',
        ar: () => '"لم تنظر فعليًا. تحقق مجددًا."',
        next: 'p_midnight_corridor',
        effects: { realityScore: 1, trust: -1 },
      },
      {
        id: 'p_ns_accept',
        en: () => 'Accept this and go back to sleep',
        ar: () => 'اقبل هذا وارجع للنوم',
        next: 'p_morning_two',
        effects: { trust: 1 },
      },
      {
        id: 'p_ns_fake',
        en: () => 'Say you\'re fine — but note what just happened',
        ar: () => 'قل إنك بخير — لكن سجّل ما حدث للتو',
        next: 'p_private_record',
        effects: { realityScore: 1 },
      },
      {
        id: 'p_ns_corridor',
        en: () => 'Step into the corridor yourself — look both ways',
        ar: () => 'ادخل الممر بنفسك — انظر في كلا الاتجاهين',
        next: 'p_midnight_corridor',
        effects: { realityScore: 1 },
      },
    ],
  },

  {
    id: 'p_watched_confrontation',
    en: (v) =>
      `Dr. ${v.names?.doctorName ?? 'Elias'} says they fell asleep in the chair. "I often work late. I was reviewing notes." A pause. "I apologize if it disturbed you."\n\nThey were reviewing notes. In the dark. Without reading glasses. Without a notepad.\n\nThe session that follows is gentle. They ask about dreams. They don't mention the watching.`,
    ar: (v) =>
      `الدكتور ${v.names?.doctorName ?? 'إلياس'} يقول إنهم ناموا في الكرسي. "كثيرًا ما أعمل حتى متأخر. كنت أراجع ملاحظات." توقف. "أعتذر إذا أزعجك ذلك."\n\nكانوا يراجعون ملاحظات. في الظلام. بلا نظارات للقراءة. بلا دفتر ملاحظات.\n\nالجلسة التي تليها لطيفة. يسألون عن الأحلام. لا يذكرون المراقبة.`,
    choices: [
      {
        id: 'p_wc_push',
        en: () => 'Push back — document this in your private record',
        ar: () => 'ادفع للخلف — وثّق هذا في سجلك الخاص',
        next: 'p_private_record',
        effects: { realityScore: 1 },
      },
      {
        id: 'p_wc_dream',
        en: () => 'Tell them about the dream — the hallway, the nameplate',
        ar: () => 'أخبرهم عن الحلم — الممر، لافتة الاسم',
        next: 'p_fragment_memory',
        effects: { memories: 1, trust: 1 },
      },
      {
        id: 'p_wc_cooperate',
        en: () => 'Accept the apology and cooperate',
        ar: () => 'اقبل الاعتذار وتعاون',
        next: 'p_first_session',
        effects: { trust: 2 },
      },
      {
        id: 'p_wc_meds',
        en: () => 'Take the medication — you need real sleep',
        ar: () => 'خذ الدواء — تحتاج نومًا حقيقيًا',
        next: 'p_medicated',
        effects: { trust: 1, medicationTaken: 1 },
      },
    ],
  },

  {
    id: 'p_watched_observation',
    en: (v) =>
      `You remain still. Thirty-two minutes.\n\nDr. ${v.names?.doctorName ?? 'Elias'} sits in the chair the entire time. They do not sleep. They do not move. They watch.\n\nAt exactly 3:00 AM, they stand — silently — and leave the room. The door closes without a sound.\n\nYou have just spent thirty-two minutes being watched by the person responsible for your care. Without your knowledge. Without your consent.\n\nThis is not monitoring. This is observation.`,
    ar: (v) =>
      `تبقى ساكنًا. اثنتان وثلاثون دقيقة.\n\nالدكتور ${v.names?.doctorName ?? 'إلياس'} يجلس في الكرسي طوال ذلك الوقت. لا ينامون. لا يتحركون. يراقبون.\n\nعند الساعة 3:00 صباحًا بالضبط، يقفون — في صمت — ويغادرون الغرفة. الباب يُغلق بلا صوت.\n\nأنت قضيت للتو اثنتين وثلاثين دقيقة تحت مراقبة الشخص المسؤول عن رعايتك. دون علمك. دون موافقتك.\n\nهذا ليس رصدًا. هذه مراقبة.`,
    choices: [
      {
        id: 'p_wo_confront',
        en: () => 'Confront Dr. Elias about this in the morning',
        ar: () => 'واجه الدكتور بهذا في الصباح',
        next: 'p_doctor_confrontation',
        effects: { realityScore: 2, trust: -2 },
      },
      {
        id: 'p_wo_record',
        en: () => 'Document this — evidence',
        ar: () => 'وثّق هذا — دليل',
        next: 'p_private_record',
        effects: { realityScore: 2 },
      },
      {
        id: 'p_wo_room412',
        en: () => 'Now — go to room 412 while the corridor is clear',
        ar: () => 'الآن — اذهب للغرفة 412 بينما الممر صافٍ',
        next: 'p_midnight_corridor',
        effects: { realityScore: 2 },
      },
      {
        id: 'p_wo_dream',
        en: () => 'Try to sleep — process the dream-memory instead',
        ar: () => 'حاول النوم — عالج ذكرى الحلم بدلًا من ذلك',
        next: 'p_dream_memory',
        effects: { memories: 1 },
      },
    ],
  },

  {
    id: 'p_dream_memory',
    en: () =>
      `You focus on the dream. The hallway. The numbered doors. The nameplate at the end.\n\nYou remember more now: the nameplate has a university logo in the corner. Institutional. Research-grade.\n\nYou were walking toward it from the other end. Not visiting. Returning. Like someone who belongs there walking back to their desk.\n\nOne more detail: in your hand, as you walk, you are carrying a coffee cup. Not from a vending machine. From a specific coffee shop. You can feel the texture of the cup.\n\nYou LIVED near this place, or frequently went there. This was routine.`,
    ar: () =>
      `تركز على الحلم. الممر. الأبواب المرقّمة. لافتة الاسم في النهاية.\n\nتتذكر أكثر الآن: لافتة الاسم تحمل شعار جامعة في الزاوية. مؤسسي. درجة بحثية.\n\nكنت تمشي نحوها من الطرف الآخر. ليس زيارة. عودة. مثل شخص ينتمي لهناك يعود إلى مكتبه.\n\nتفصيل أخير: في يدك، وأنت تمشي، تحمل كوب قهوة. ليس من ماكينة. من مقهى محدد. تستطيع الشعور بملمس الكوب.\n\nكنت تعيش بالقرب من هذا المكان، أو كثيرًا ما تذهب إليه. كان روتينًا.`,
    choices: [
      {
        id: 'p_dm_room',
        en: () => 'Room 412 — it\'s a research office. Find it.',
        ar: () => 'الغرفة 412 — إنها مكتب بحثي. اجده.',
        next: 'p_room412',
        effects: { memories: 2, realityScore: 2 },
      },
      {
        id: 'p_dm_professional',
        en: () => 'You are a professional. A researcher. Process this.',
        ar: () => 'أنت متخصص. باحث. عالج هذا.',
        next: 'p_professional_memory',
        effects: { memories: 2 },
      },
      {
        id: 'p_dm_elias',
        en: (v) => `Tell Dr. ${v.names?.doctorName ?? 'Elias'} — share the memory`,
        ar: (v) => `أخبر الدكتور ${v.names?.doctorName ?? 'إلياس'} — شارك الذكرى`,
        next: 'p_fragment_memory',
        effects: { trust: 1, memories: 1 },
      },
      {
        id: 'p_dm_other',
        en: (v) => `Find ${v.names?.otherName ?? 'The Other'} — they said they worked here`,
        ar: (v) => `اجد ${v.names?.otherName ?? 'الآخر'} — قالوا إنهم عملوا هنا`,
        next: 'p_find_other',
        condition: (v) => !!v.names?.otherName,
        lockedEn: 'Find The Other first',
        lockedAr: 'اجد الآخر أولًا',
        effects: { memories: 1 },
      },
    ],
  },

  {
    id: 'p_researcher_reveal',
    en: (v) =>
      `You sit with it.\n\nYou were a researcher. Not just at a university. HERE. At St. Adalyn's, in the ARES wing.\n\nYou were the one who designed the thing that is now being used on you.\n\nAnd you put yourself in it. Voluntarily.\n\nWhy?\n\nThe answer forms slowly, like developing film: you saw what you were doing to other people. You needed to know it from the inside. And you needed someone to be able to stop you — even from yourself.`,
    ar: (v) =>
      `تجلس مع هذا.\n\nكنت باحثًا. ليس فقط في جامعة. هنا. في سانت أدالِن، في جناح آريس.\n\nكنت من صمم الشيء المُستخدم عليك الآن.\n\nوأدخلت نفسك فيه. طوعيًا.\n\nلماذا؟\n\nالإجابة تتشكل ببطء، كفيلم يتحمض: رأيت ما كنت تفعله بأشخاص آخرين. احتجت معرفته من الداخل. واحتجت من يستطيع إيقافك — حتى من نفسك.`,
    choices: [
      {
        id: 'p_rr2_accept',
        en: () => 'You understand everything now. Leave.',
        ar: () => 'أنت تفهم كل شيء الآن. غادر.',
        next: 'p_departure_process',
        effects: { doctorMode: true, memories: 3 },
      },
      {
        id: 'p_rr2_other',
        en: (v) => `But ${v.names?.otherName ?? 'The Other'} — they weren\'t voluntary`,
        ar: (v) => `لكن ${v.names?.otherName ?? 'الآخر'} — لم يتطوعوا`,
        next: 'p_demand_freedom',
        effects: { doctorMode: true },
      },
      {
        id: 'p_rr2_elias',
        en: (v) => `Face Dr. ${v.names?.doctorName ?? 'Elias'} with everything`,
        ar: (v) => `واجه الدكتور ${v.names?.doctorName ?? 'إلياس'} بكل شيء`,
        next: 'p_doctor_confrontation',
        effects: { doctorMode: true, memories: 2 },
      },
      {
        id: 'p_rr2_accept2',
        en: () => 'Sit with the weight. Then leave.',
        ar: () => 'اجلس مع الثقل. ثم غادر.',
        next: 'p_acceptance',
        effects: { doctorMode: true },
      },
    ],
  },

  {
    id: 'p_escape_attempt',
    en: () =>
      `You try to leave.\n\nThe front doors are not locked — this is a voluntary facility. But the exit code for the outer gate is not posted anywhere. The guard station is staffed. When you approach, the guard asks for your exit authorization from the attending physician.\n\nYou don't have one. You're a patient. You're voluntary. But you don't have a signed release.\n\n"I can call Dr. ${`[Elias]`} to authorize," the guard says pleasantly. "Just give me a moment."\n\nYou have minutes.`,
    ar: () =>
      `تحاول المغادرة.\n\nالأبواب الأمامية غير مقفلة — هذه منشأة طوعية. لكن كود الخروج للبوابة الخارجية غير مُعلَّق في أي مكان. محطة الحارس ذات طاقم. حين تقترب، يطلب الحارس تفويض خروجك من الطبيب المعالج.\n\nليس لديك واحد. أنت مريض. أنت طوعي. لكن ليس لديك إفراج موقّع.\n\n"يمكنني الاتصال بالدكتور ${`[إلياس]`} للتفويض،" يقول الحارس بلطف. "فقط أمهلني لحظة."\n\nأمامك دقائق.`,
    choices: [
      {
        id: 'p_ea_wait',
        en: () => 'Wait for the authorization — let them call',
        ar: () => 'انتظر التفويض — دعهم يتصلون',
        next: 'p_departure_process',
        effects: { trust: 1 },
      },
      {
        id: 'p_ea_insist',
        en: () => '"I am leaving voluntarily. This is a voluntary facility."',
        ar: () => '"أنا أغادر طوعيًا. هذه منشأة طوعية."',
        next: 'p_departure_process',
        effects: { trust: -1, realityScore: 1 },
      },
      {
        id: 'p_ea_elias',
        en: (v) => `Go find Dr. ${v.names?.doctorName ?? 'Elias'} yourself`,
        ar: (v) => `اذهب وأجد الدكتور ${v.names?.doctorName ?? 'إلياس'} بنفسك`,
        next: 'p_doctor_confrontation',
        effects: {},
      },
      {
        id: 'p_ea_window',
        en: () => 'Find another way out — a window, a back exit',
        ar: () => 'اجد طريقًا آخر للخروج — نافذة، مخرج خلفي',
        next: 'p_ending_death',
        effects: { trust: -3, realityScore: 1 },
      },
    ],
  },

  // ── ENDINGS ───────────────────────────────────────────────────────────────────
  {
    id: 'p_ending_success',
    en: (v) =>
      `You walk out of St. Adalyn's at 11:23 AM on a Tuesday.\n\nThe light outside is sharper than you expected. The air is different — not cleaner exactly, just less controlled.\n\nYou stand on the pavement with your discharge papers and the memory of eight months rebuilt from fragments. You are not the researcher who went in. But you have all of their knowledge and none of their certainty.\n\n${v.names?.otherName ?? 'The Other'} is already outside. They had their own discharge twenty minutes ago.\n\nThey look at you. You look at them.\n\n"Now what?" they ask.\n\nYou think of the files. The program. The eight subjects before you who recovered in three weeks while you took eight months and came out the other side knowing exactly why.\n\n"I write it up," you say. "All of it. And I publish it."`,
    ar: (v) =>
      `تخرج من سانت أدالِن عند الساعة 11:23 صباحًا يوم الثلاثاء.\n\nالضوء في الخارج أحد مما توقعت. الهواء مختلف — ليس أنقى بالضبط، فقط أقل سيطرة.\n\nتقف على الرصيف مع أوراق خروجك وذاكرة ثمانية أشهر مُعادة البناء من شظايا. لست الباحث الذي دخل. لكن لديك كل معرفتهم ولا شيء من يقينهم.\n\n${v.names?.otherName ?? 'الآخر'} بالفعل في الخارج. حصلوا على خروجهم قبل عشرين دقيقة.\n\nينظرون إليك. تنظر إليهم.\n\n"ماذا الآن؟" يسألون.\n\nتفكر في الملفات. البرنامج. الموضوعات الثماني قبلك الذين تعافوا في ثلاثة أسابيع بينما أخذت أنت ثمانية أشهر وخرجت من الطرف الآخر تعرف بالضبط السبب.\n\n"سأكتبها،" تقول. "كلها. وأنشرها."`,
    isEnding: true,
    endingType: 'success',
  },

  {
    id: 'p_ending_failure',
    en: (v) =>
      `Six weeks later, you are still at St. Adalyn's.\n\nThe medication is smoother now. The edges of questions you used to have are rounded down, manageable. You attend sessions. You talk about your childhood (mostly blank, but less distressing). You make progress.\n\nDr. ${v.names?.doctorName ?? 'Elias'} says you're integrating well.\n\nYou believe them.\n\nThe room 412 is just a supply closet, they explain one day when you ask. You must have misread the panel. That's okay.\n\n${v.names?.otherName ?? 'The Other'} is moved to a different wing. You don't ask why.\n\nThe mark on your wrist fades. Your body knows it should. The slot where your name lives fills in — with the name they give you on the new ID card they prepare for "reintegration into society."\n\nIt's not your name. But it fits. Eventually.`,
    ar: (v) =>
      `بعد ستة أسابيع، لا تزال في سانت أدالِن.\n\nالدواء أكثر سلاسة الآن. حواف الأسئلة التي كانت لديك مُنعّمة، قابلة للإدارة. تحضر الجلسات. تتحدث عن طفولتك (فارغة في معظمها، لكن أقل ضائقة). تحرز تقدمًا.\n\nالدكتور ${v.names?.doctorName ?? 'إلياس'} يقول إنك تتكامل بشكل جيد.\n\nتصدّقهم.\n\nالغرفة 412 مجرد خزانة لوازم، يفسرون يومًا حين تسأل. يجب أنك قرأت اللوحة خطأ. لا بأس.\n\n${v.names?.otherName ?? 'الآخر'} ينتقل إلى جناح مختلف. لا تسأل لماذا.\n\nالعلامة على معصمك تتلاشى. جسدك يعرف أنه يجب ذلك. الفتحة التي يعيش فيها اسمك تُملأ — بالاسم الذي يعطونك إياه على بطاقة الهوية الجديدة التي يُعدّونها لـ"إعادة الاندماج في المجتمع."\n\nليس اسمك. لكنه مناسب. في نهاية المطاف.`,
    isEnding: true,
    endingType: 'failure',
  },

  {
    id: 'p_ending_death',
    en: () =>
      `You try to climb out a window at the back of the facility.\n\nYou fall.\n\nNot far — the ground floor window opens onto a gravel path. You twist your ankle badly. The alarm sounds.\n\nThey bring you back inside. A different kind of quiet now — clinical, efficient. You are transferred that evening: involuntary commitment, your consistent refusal of medication as evidence of a psychiatric crisis.\n\nThe new protocol is not the gentle haloperidol. It's something heavier. Something that removes the part of you that noticed the badge was on the wrong side, that the clipboard was face-down, that the key didn't match.\n\nYou still exist. But the you that was piecing things together — that person is gone.\n\nFrom the clinical notes: "Patient has responded well to adjusted treatment protocol. Short-term agitation resolved. Long-term prognosis: manageable."`,
    ar: () =>
      `تحاول التسلق من نافذة في الجزء الخلفي من المنشأة.\n\nتسقط.\n\nليس بعيدًا — نافذة الطابق الأرضي تفتح على درب حصوي. تلوي كاحلك بشدة. يرن الإنذار.\n\nيعيدونك للداخل. نوع مختلف من الهدوء الآن — سريري، فعال. تُنقل في تلك المساء: إيداع قسري، رفضك المتسق للدواء دليل على أزمة نفسية.\n\nالبروتوكول الجديد ليس الهالوبيريدول اللطيف. إنه شيء أثقل. شيء يُزيل الجزء منك الذي لاحظ أن الشارة كانت على الجانب الخاطئ، أن الحافظة كانت مواجهة للأسفل، أن المفتاح لم يتطابق.\n\nأنت لا تزال موجودًا. لكن أنت الذي كان يُجمّع الأشياء — ذلك الشخص ذهب.\n\nمن الملاحظات السريرية: "المريض استجاب بشكل جيد لبروتوكول العلاج المُعدَّل. الهياج قصير الأمد تم حله. توقعات طويلة الأمد: قابلة للإدارة."`,
    isEnding: true,
    endingType: 'death',
  },

  {
    id: 'p_ending_secret',
    en: (v) =>
      `You leave St. Adalyn's.\n\nBut as you stand outside, the full memory finally completes — the part that was still blurred. The moment before you went under.\n\nYou sitting at your desk in room 412. The consent form signed. Dr. ${v.names?.doctorName ?? 'Elias'} standing across from you — not as your subordinate, but as your colleague, the one you trusted to monitor your case.\n\nYou handed them a sealed envelope. "Only open this if I remember who I am and ask to leave. It contains instructions."\n\n"And if you never remember?"\n\n"Then the ethics board will find everything they need in the unsealed files. Either way, the program ends."\n\nYou designed it so that the researcher becoming the patient was the kill switch for the whole program.\n\nThe reporter was the insurance policy. You sent the tip yourself.\n\nAnd ${v.names?.otherName ?? 'The Other'} — who wasn't a journalist before they arrived — is now going to write the most important piece of their career.\n\nUsing a story you planned, from inside a study you designed, about a program you built to destroy itself.`,
    ar: (v) =>
      `تغادر سانت أدالِن.\n\nلكن حين تقف في الخارج، تكتمل الذاكرة أخيرًا — الجزء الذي كان لا يزال ضبابيًا. اللحظة قبل خضوعك.\n\nأنت جالس على مكتبك في الغرفة 412. استمارة الموافقة موقّعة. الدكتور ${v.names?.doctorName ?? 'إلياس'} واقف أمامك — ليس كمساعدك، بل كزميلك، الذي وثقت به لمراقبة حالتك.\n\nناولتهم مظروفًا مختومًا. "افتح هذا فقط إذا تذكرت من أنا وطلبت المغادرة. فيه تعليمات."\n\n"وإذا لم تتذكر أبدًا؟"\n\n"إذن فإن لجنة الأخلاقيات ستجد كل ما تحتاجه في الملفات غير المقفلة. في كلتا الحالتين، البرنامج ينتهي."\n\nصممتها بحيث كان تحوّل الباحث إلى مريض هو مفتاح القتل لكامل البرنامج.\n\nالصحفي كان بوليصة التأمين. أرسلت التلميحة بنفسك.\n\nو${v.names?.otherName ?? 'الآخر'} — الذي لم يكن صحفيًا قبل وصوله — سيكتب الآن أهم مقال في مسيرته المهنية.\n\nباستخدام قصة خططتها، من داخل دراسة صممتها، عن برنامج بنيته ليدمّر نفسه.`,
    isEnding: true,
    endingType: 'secret',
  },
];

const story_psychological = {
  id: 'psychological',
  theme: 'psychological',
  startNode: 'p_start',
  initialVars: {
    trust: 0,
    memories: 0,
    realityScore: 0,
    medicationTaken: 0,
    doctorMode: false,
    identityKnown: false,
    names: {},
  },
  nameRequests: {
    doctorName: {
      promptEn: 'A doctor enters. What name does their badge read?',
      promptAr: 'يدخل طبيب. ما الاسم المكتوب على شارتهم؟',
    },
    otherName: {
      promptEn: 'You see another patient in the corridor. You decide to call them something. What name do you give them?',
      promptAr: 'ترى مريضًا آخر في الممر. تقرر تسميتهم. ما الاسم الذي تعطيهم؟',
    },
  },
  nodes,
};

export default story_psychological;
