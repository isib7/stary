/**
 * STORY 1: The Hollow House (Horror)
 * Variables: fear (0-10), sanity (10-0), itemsFound[], doorsUnlocked, readJournal, knowsSecret
 * Named characters: shadowName (The Shadow), auntName (Aunt)
 * Endings:
 *   success  → Escape and expose the truth
 *   death    → Possessed by the Shadow
 *   failure  → Trapped forever, driven to madness
 *   secret   → You were Aunt Mara all along (you died ten years ago)
 */

const nodes = [
  // ── INTRODUCTION ──────────────────────────────────────────────────────────────
  {
    id: 'h_start',
    requiresName: 'auntName',
    en: (v) =>
      `The letter arrived on a Thursday.\n\n"Your aunt ${v.names?.auntName ?? 'Mara'} has passed. She has left you her estate at 14 Hollow Lane. A lawyer will meet you there on Saturday."\n\nYou barely knew her. A faded photograph. A greeting card once, with no return address. And now this.\n\nWhen you arrive, the sky is the color of old bruises. The house stands at the end of a dirt road, surrounded by dead oaks whose branches claw at the air. Every window is dark. The front door is already ajar.\n\nSomething about that open door makes your stomach tighten.`,
    ar: (v) =>
      `وصل الخطاب يوم الخميس.\n\n"توفيت عمتك ${v.names?.auntName ?? 'مارا'}. تركت لك عقارها في طريق هولو، رقم 14. سيلتقي بك محامٍ هناك يوم السبت."\n\nبالكاد كنت تعرفها. صورة باهتة. بطاقة معايدة مرة، بلا عنوان للرد. والآن هذا.\n\nحين تصل، السماء بلون كدمات قديمة. يقف المنزل في نهاية طريق ترابي، محاطًا بأشجار بلوط ميتة تخز أغصانها الهواء. كل نافذة مظلمة. الباب الأمامي مفتوح قليلًا بالفعل.\n\nشيء ما في ذلك الباب المفتوح يُشدّ معدتك.`,
    choices: [
      {
        id: 'h_s_enter',
        en: () => 'Push open the door and step inside',
        ar: () => 'ادفع الباب وادخل',
        next: 'h_foyer',
        effects: { fear: 1 },
      },
      {
        id: 'h_s_wait',
        en: () => 'Wait outside and call the lawyer first',
        ar: () => 'انتظر خارجًا واتصل بالمحامي أولًا',
        next: 'h_lawyer_call',
        effects: { fear: 0 },
      },
      {
        id: 'h_s_car',
        en: () => 'Go back to your car and look for the deed paperwork',
        ar: () => 'عد إلى سيارتك وابحث عن وثائق الملكية',
        next: 'h_car_search',
        effects: { fear: 0 },
      },
      {
        id: 'h_s_walk',
        en: () => 'Walk around the house first, inspect the perimeter',
        ar: () => 'تجول حول المنزل أولًا، افحص المحيط',
        next: 'h_perimeter',
        effects: { fear: 1 },
      },
    ],
  },

  // ── FOYER ──────────────────────────────────────────────────────────────────────
  {
    id: 'h_foyer',
    en: (v) =>
      `The foyer smells of damp wood and something else — something sweet and wrong, like flowers left in standing water for weeks.\n\nDust covers every surface. A grandfather clock on the far wall has stopped at 3:47. Above the staircase hangs a portrait of ${v.names?.auntName ?? 'your aunt'} — or someone who once looked like her. The figure in the painting is smiling too wide. Her eyes seem to follow you.\n\nThree doors lead off the foyer. A hallway leads deeper into the house. The staircase goes up into darkness.\n\nYour phone's flashlight casts pale light on the walls. You notice scratch marks near the base of the staircase — long, frantic grooves, like something was desperately trying to climb.`,
    ar: (v) =>
      `تفوح من الردهة رائحة الخشب الرطب وشيء آخر — شيء حلو ومزعج، كزهور تركت في ماء راكد لأسابيع.\n\nالغبار يغطي كل سطح. ساعة جدارية كبيرة على الجدار البعيد توقفت عند 3:47. فوق الدرج تعلق لوحة لـ${v.names?.auntName ?? 'عمتك'} — أو لشخص كان يشبهها ذات يوم. الشخصية في اللوحة تبتسم بشكل أوسع مما ينبغي. عيناها تتبعانك.\n\nثلاثة أبواب تنبثق من الردهة. ممر يمتد أعمق في المنزل. الدرج يصعد نحو الظلام.\n\nضوء مصباح هاتفك يُلقي بضوء شاحب على الجدران. تلاحظ خدوشًا بالقرب من قاعدة الدرج — أخاديد طويلة هائجة، كأن شيئًا ما كان يحاول الصعود باستماتة.`,
    choices: [
      {
        id: 'h_f_left',
        en: () => 'Try the left door — it has a key still in the lock',
        ar: () => 'جرب الباب الأيسر — المفتاح لا يزال في القفل',
        next: 'h_study',
        effects: { fear: 1 },
      },
      {
        id: 'h_f_stairs',
        en: () => 'Climb the stairs toward the darkness',
        ar: () => 'اصعد الدرج نحو الظلام',
        next: 'h_upper_hall',
        effects: { fear: 2, sanity: -1 },
      },
      {
        id: 'h_f_hall',
        en: () => 'Follow the hallway deeper into the house',
        ar: () => 'اتبع الممر إلى أعماق المنزل',
        next: 'h_kitchen',
        effects: { fear: 1 },
      },
      {
        id: 'h_f_scratch',
        en: () => 'Crouch and examine the scratch marks closely',
        ar: () => 'انحنِ وافحص الخدوش عن كثب',
        next: 'h_scratch_examine',
        effects: { fear: 2, sanity: -1 },
      },
    ],
  },

  // Lawyer call branch
  {
    id: 'h_lawyer_call',
    en: () =>
      `You dial the number on the letter. It rings six times before a flat automated voice says: "The number you have called is no longer in service."\n\nYou try again. Same result.\n\nA cold wind picks up. Somewhere inside the house, something thuds. Once. Then silence.\n\nThe sun is beginning to set. You cannot drive back tonight — the GPS showed three hours of winding mountain road. You have no choice but to go inside.`,
    ar: () =>
      `تتصل بالرقم المدون في الرسالة. يرن ست مرات قبل أن يقول صوت آلي بارد: "الرقم الذي اتصلت به لم يعد في الخدمة."\n\nتحاول مجددًا. نفس النتيجة.\n\nريح باردة تهب. في مكان ما داخل المنزل، يُسمع صوت دقة. مرة واحدة. ثم صمت.\n\nالشمس تبدأ بالغروب. لا يمكنك العودة الليلة — أظهر نظام الملاحة ثلاث ساعات من طريق جبلي متعرج. ليس أمامك خيار سوى الدخول.`,
    choices: [
      {
        id: 'h_lc_enter',
        en: () => 'Enter the house',
        ar: () => 'ادخل المنزل',
        next: 'h_foyer',
        effects: { fear: 1 },
      },
      {
        id: 'h_lc_camp',
        en: () => 'Sleep in your car and wait until morning',
        ar: () => 'نم في سيارتك وانتظر حتى الصباح',
        next: 'h_sleep_car',
        effects: { fear: 0 },
      },
      {
        id: 'h_lc_explore_out',
        en: () => 'Look around outside before going in',
        ar: () => 'تجول خارجًا قبل الدخول',
        next: 'h_perimeter',
        effects: { fear: 1 },
      },
      {
        id: 'h_lc_journal_check',
        en: () => 'Check if there is a mailbox or notice on the door',
        ar: () => 'تحقق إن كان هناك صندوق بريد أو ملاحظة على الباب',
        next: 'h_mailbox',
        effects: { fear: 0 },
      },
    ],
  },

  // Car search branch
  {
    id: 'h_car_search',
    en: () =>
      `In the glove compartment you find a sealed envelope alongside your copy of the deed. Inside the envelope is a single index card written in cramped handwriting:\n\n"DO NOT go into the basement. DO NOT open the red door. DO NOT feed it your name."\n\nThe handwriting is your aunt's. You recognize it from that old Christmas card.\n\nYour hands are trembling slightly. But night is coming, and the house is the only shelter for miles.`,
    ar: () =>
      `في صندوق القفازات تجد مظروفًا مختومًا بجانب نسختك من وثيقة الملكية. داخل المظروف بطاقة فهرسة واحدة مكتوبة بخط ضيق متداخل:\n\n"لا تدخل القبو. لا تفتح الباب الأحمر. لا تعطِه اسمك."\n\nالخط يعود لعمتك. تعرفه من تلك البطاقة القديمة.\n\nيداك ترتجفان قليلًا. لكن الليل قادم، والمنزل هو الملجأ الوحيد لأميال.`,
    choices: [
      {
        id: 'h_cs_enter',
        en: () => 'Pocket the card and enter the house cautiously',
        ar: () => 'ضع البطاقة في جيبك وادخل المنزل بحذر',
        next: 'h_foyer',
        effects: { fear: 1, knowsWarning: true },
      },
      {
        id: 'h_cs_leave',
        en: () => 'Try to leave — drive back despite the dark',
        ar: () => 'حاول المغادرة — سق عائدًا رغم الظلام',
        next: 'h_escape_attempt_early',
        effects: { fear: 2 },
      },
      {
        id: 'h_cs_sleep',
        en: () => 'Decide to sleep in the car tonight',
        ar: () => 'قرر النوم في السيارة هذه الليلة',
        next: 'h_sleep_car',
        effects: { fear: 0 },
      },
      {
        id: 'h_cs_perimeter',
        en: () => 'Walk the perimeter of the house before anything else',
        ar: () => 'تجول حول المحيط قبل أي شيء',
        next: 'h_perimeter',
        effects: { fear: 1 },
      },
    ],
  },

  // Perimeter branch
  {
    id: 'h_perimeter',
    en: () =>
      `You walk the house's perimeter. Dead grass crunches underfoot. Every window is dark except for one — a faint reddish glow, upper floor, corner room.\n\nAt the back of the house you find a storm cellar. Its wooden doors are chained shut, but the chain is not locked. A smell rises from the gap: earth, rot, and something acrid.\n\nYou also notice something scratched into the stone foundation at eye level — a name, repeated over and over in a circle: MARAMARA MARAMARAMARA\n\nYour heart hammers. The red light upstairs flickers.`,
    ar: () =>
      `تتجول حول محيط المنزل. العشب الميت يطقطق تحت قدميك. كل نافذة مظلمة إلا واحدة — ضوء محمر خافت، الطابق العلوي، غرفة الزاوية.\n\nفي الجزء الخلفي من المنزل تجد قبوًا للعواصف. أبوابه الخشبية مغلقة بسلسلة، لكن السلسلة غير مقفلة. تتصاعد رائحة من الفجوة: تراب وعفونة وشيء حارق.\n\nتلاحظ أيضًا اسمًا محفورًا في قاعدة الحجر على مستوى العين — اسم متكرر مرارًا في دائرة: MARAMARA MARAMARAMARA\n\nقلبك يطرق بعنف. الضوء الأحمر في الأعلى يبرق.`,
    choices: [
      {
        id: 'h_p_cellar',
        en: () => 'Unchain the storm cellar and look inside',
        ar: () => 'افك السلسلة عن قبو العاصفة وانظر بداخله',
        next: 'h_cellar_outside',
        effects: { fear: 2 },
      },
      {
        id: 'h_p_inside',
        en: () => 'Go inside the house now — you\'ve seen enough',
        ar: () => 'ادخل المنزل الآن — رأيت ما يكفي',
        next: 'h_foyer',
        effects: { fear: 1 },
      },
      {
        id: 'h_p_name',
        en: () => 'Trace the carved name with your fingers and say it aloud',
        ar: () => 'تتبع الاسم المحفور بأصابعك وانطقه بصوت عالٍ',
        next: 'h_name_spoken',
        effects: { fear: 3, sanity: -2 },
      },
      {
        id: 'h_p_redlight',
        en: () => 'Stare at the red light upstairs — try to see what\'s in the room',
        ar: () => 'حدّق في الضوء الأحمر بالأعلى — حاول رؤية ما في الغرفة',
        next: 'h_redlight_stare',
        effects: { fear: 2, sanity: -1 },
      },
    ],
  },

  // Sleep in car
  {
    id: 'h_sleep_car',
    en: () =>
      `You lock your car doors and recline the seat. Sleep comes slowly, fitfully.\n\nAt 3:47 AM you wake violently. Someone — something — is leaning against your passenger window. You cannot see a face. Only a silhouette, perfectly still, watching.\n\nYou hit your headlights. Nothing there.\n\nBut your passenger door is unlocked. You are certain you locked it.\n\nDawn comes gray and cold. You cannot put this off any longer. The house waits.`,
    ar: () =>
      `تقفل أبواب سيارتك وتسند المقعد للخلف. النوم يأتي ببطء ومتقطعًا.\n\nعند الساعة 3:47 صباحًا تستيقظ بعنف. شخص ما — شيء ما — يتكئ على نافذة المقعد الأمامي. لا ترى وجهًا. فقط ظل، ساكن تمامًا، يراقب.\n\nتشغّل المصابيح الأمامية. لا شيء.\n\nلكن باب مقعد المساعد غير مقفل. أنت متأكد أنك أقفلته.\n\nيأتي الفجر رماديًا وباردًا. لا يمكنك تأجيل هذا أكثر. المنزل ينتظر.`,
    choices: [
      {
        id: 'h_sc_enter',
        en: () => 'Enter the house in the morning light',
        ar: () => 'ادخل المنزل في ضوء الصباح',
        next: 'h_foyer',
        effects: { fear: 2, sanity: -1 },
      },
      {
        id: 'h_sc_check',
        en: () => 'Check around the car first for footprints',
        ar: () => 'تحقق أولًا حول السيارة من آثار الأقدام',
        next: 'h_footprints',
        effects: { fear: 2 },
      },
      {
        id: 'h_sc_perimeter',
        en: () => 'Walk the perimeter before entering',
        ar: () => 'تجول حول المحيط قبل الدخول',
        next: 'h_perimeter',
        effects: { fear: 1 },
      },
      {
        id: 'h_sc_dash',
        en: () => 'Drive away immediately — this feels wrong',
        ar: () => 'اقتد السيارة فورًا — هذا لا يبدو صحيحًا',
        next: 'h_escape_attempt_early',
        effects: { fear: 3 },
      },
    ],
  },

  // Mailbox
  {
    id: 'h_mailbox',
    en: () =>
      `The old metal mailbox beside the door is stuffed with envelopes — all addressed to your aunt — and all unopened. The postmarks span three years. The most recent one is from last week.\n\nLast week. But she died a month ago.\n\nYou open the most recent letter. Inside is a single sentence in your aunt's handwriting:\n\n"It's still here. It never left. Don't say your name out loud — not once."\n\nThe letter is dated three days ago.`,
    ar: () =>
      `صندوق البريد المعدني القديم بجانب الباب محشو بالمغلفات — جميعها موجهة لعمتك — وكلها غير مفتوحة. الطوابع البريدية تمتد لثلاث سنوات. أحدثها من الأسبوع الماضي.\n\nالأسبوع الماضي. لكنها توفيت قبل شهر.\n\nتفتح الرسالة الأحدث. في الداخل جملة واحدة بخط عمتك:\n\n"إنه لا يزال هنا. لم يغادر أبدًا. لا تقل اسمك بصوت عالٍ — ولا مرة واحدة."\n\nالرسالة مؤرخة بتاريخ ثلاثة أيام.`,
    choices: [
      {
        id: 'h_mb_enter',
        en: () => 'Enter the house with this knowledge',
        ar: () => 'ادخل المنزل وأنت تحمل هذه المعرفة',
        next: 'h_foyer',
        effects: { fear: 2, knowsWarning: true },
      },
      {
        id: 'h_mb_all',
        en: () => 'Read through more of the letters first',
        ar: () => 'اقرأ المزيد من الرسائل أولًا',
        next: 'h_letters_clue',
        effects: { fear: 1, readJournal: true },
      },
      {
        id: 'h_mb_sleep',
        en: () => 'This is too much — sleep in the car tonight',
        ar: () => 'هذا أكثر مما تحتمل — نم في السيارة الليلة',
        next: 'h_sleep_car',
        effects: { fear: 1 },
      },
      {
        id: 'h_mb_perimeter',
        en: () => 'Check the perimeter with this warning in mind',
        ar: () => 'تفقد المحيط مع وضع هذا التحذير في الاعتبار',
        next: 'h_perimeter',
        effects: { fear: 2, knowsWarning: true },
      },
    ],
  },

  // Letters clue node
  {
    id: 'h_letters_clue',
    en: () =>
      `The letters tell a story. Over three years, your aunt's handwriting changed — from neat and precise to frantic and nearly illegible.\n\nKey extracts:\n\n"It mimics voices. It learned mine first."\n"It cannot cross iron. The fireplace poker kept it away."\n"It feeds on names. Call yourself something false."\n"The basement is the door. Seal it."\n\nYour aunt was not merely eccentric. She was fighting something. And she lost.`,
    ar: () =>
      `الرسائل تحكي قصة. على مدار ثلاث سنوات، تغيّر خط عمتك — من دقيق ومنظم إلى هائج وغير مقروء تقريبًا.\n\nمقتطفات رئيسية:\n\n"إنه يحاكي الأصوات. تعلّم صوتي أولًا."\n"لا يستطيع تجاوز الحديد. قضيب المدفأة أبقاه بعيدًا."\n"يتغذى على الأسماء. سمّ نفسك باسم مزيف."\n"القبو هو الباب. أغلقه."\n\nعمتك لم تكن مجرد شخصية غريبة الأطوار. كانت تحارب شيئًا. وخسرت.`,
    choices: [
      {
        id: 'h_lc2_enter',
        en: () => 'Enter the house armed with this knowledge',
        ar: () => 'ادخل المنزل مزوّدًا بهذه المعرفة',
        next: 'h_foyer',
        effects: { fear: 1, knowsWarning: true, knowsIron: true, readJournal: true },
      },
      {
        id: 'h_lc2_iron',
        en: () => 'Search your car for anything iron to take in',
        ar: () => 'فتش سيارتك عن أي شيء من الحديد لتأخذه معك',
        next: 'h_find_iron',
        effects: { fear: 0, knowsIron: true },
      },
      {
        id: 'h_lc2_basement_sealed',
        en: () => 'Go straight to the back — find the basement and confirm it\'s sealed',
        ar: () => 'اذهب مباشرة إلى الخلف — جد القبو وتأكد من إغلاقه',
        next: 'h_cellar_outside',
        effects: { fear: 2 },
      },
      {
        id: 'h_lc2_namegame',
        en: () => 'Decide to call yourself a different name when inside',
        ar: () => 'قرر أن تسمي نفسك باسم مختلف عند الدخول',
        next: 'h_foyer',
        effects: { fear: 0, usedFalseName: true, knowsWarning: true, readJournal: true },
      },
    ],
  },

  // Find iron
  {
    id: 'h_find_iron',
    en: () =>
      `In your trunk you find a tire iron. It's cold and heavy in your hand. You grip it tightly.\n\nIt seems absurd — carrying a tire iron against the dark. But the letters were clear. And your aunt was many things, but never a liar.\n\nYou feel marginally better. Ready.`,
    ar: () =>
      `في صندوق سيارتك تجد قضيب الإطار. إنه بارد وثقيل في يدك. تمسكه بإحكام.\n\nيبدو هذا سخيفًا — حمل قضيب إطار في مواجهة الظلام. لكن الرسائل كانت واضحة. وعمتك كانت أشياء كثيرة، لكنها لم تكن كذابة قط.\n\nتشعر بتحسن طفيف. أنت مستعد.`,
    choices: [
      {
        id: 'h_fi_enter',
        en: () => 'Enter the house with the tire iron',
        ar: () => 'ادخل المنزل وبيدك قضيب الإطار',
        next: 'h_foyer',
        effects: { hasIron: true, fear: 0 },
      },
      {
        id: 'h_fi_perimeter',
        en: () => 'Check the perimeter first with the iron ready',
        ar: () => 'تفقد المحيط أولًا والقضيب جاهز',
        next: 'h_perimeter',
        effects: { hasIron: true, fear: 1 },
      },
      {
        id: 'h_fi_cellar',
        en: () => 'Head straight to the storm cellar in the back',
        ar: () => 'اتجه مباشرة إلى قبو العاصفة في الخلف',
        next: 'h_cellar_outside',
        effects: { hasIron: true, fear: 2 },
      },
      {
        id: 'h_fi_sleep',
        en: () => 'Sleep in the car with the iron close, enter at dawn',
        ar: () => 'نم في السيارة مع بقاء القضيب قريبًا، ادخل عند الفجر',
        next: 'h_sleep_car',
        effects: { hasIron: true, fear: 0 },
      },
    ],
  },

  // ── STUDY ──────────────────────────────────────────────────────────────────────
  {
    id: 'h_study',
    en: (v) =>
      `The study is lined with bookshelves. Most of the books are old, their spines cracked. But one shelf has been cleared. In its place is ${v.names?.auntName ?? "your aunt"}'s journal — or what remains of it. The last third of the pages have been torn out.\n\nYou read:\n"...Day 847. It spoke my name again last night. Not in my voice this time. In my mother's. I almost opened the door. I must not open the door."\n\nThe desk has three locked drawers. A small key hangs on a hook beside the window — but trying it in each lock reveals it only fits the middle drawer.`,
    ar: (v) =>
      `الدراسة مبطنة بأرفف كتب. معظمها قديم، ظهورها متشققة. لكن رفًا واحدًا تم تفريغه. في مكانه يوجد يومية ${v.names?.auntName ?? "عمتك"} — أو ما تبقى منها. الثلث الأخير من الصفحات قد مزق.\n\nتقرأ:\n"...اليوم 847. تحدث باسمي مجددًا الليلة الماضية. ليس بصوتي هذه المرة. بصوت أمي. كدت أفتح الباب. يجب ألا أفتح الباب."\n\nالمكتب له ثلاثة أدراج مقفلة. مفتاح صغير معلق على خطاف بجانب النافذة — لكن تجربته في كل قفل يكشف أنه يناسب الدرج الأوسط فقط.`,
    choices: [
      {
        id: 'h_st_journal',
        en: () => 'Read the journal entries carefully',
        ar: () => 'اقرأ مدخلات اليومية بعناية',
        next: 'h_journal_read',
        effects: { readJournal: true, fear: 1 },
      },
      {
        id: 'h_st_drawer',
        en: () => 'Open the middle drawer with the key',
        ar: () => 'افتح الدرج الأوسط بالمفتاح',
        next: 'h_drawer_open',
        effects: { fear: 1 },
      },
      {
        id: 'h_st_shelves',
        en: () => 'Search the bookshelves for anything useful',
        ar: () => 'فتش الأرفف بحثًا عن أي شيء مفيد',
        next: 'h_bookshelves',
        effects: { fear: 0 },
      },
      {
        id: 'h_st_leave',
        en: () => 'Leave the study and explore elsewhere',
        ar: () => 'اغادر الدراسة واستكشف في مكان آخر',
        next: 'h_foyer',
        effects: { fear: 0 },
      },
    ],
  },

  // Journal read
  {
    id: 'h_journal_read',
    en: () =>
      `The journal spans two years. Your aunt documented everything with the precision of a scientist.\n\nKey discoveries:\n— The entity arrived after she opened a door in the basement she had been told to leave sealed.\n— It can only enter rooms it has been invited into, vocally or symbolically.\n— Light harms it. Not kills it. Just pushes it back.\n— It learns from whoever it haunts. It gets smarter. Faster.\n— The only way to end it: "Seal the door. Burn the invitation."\n\nWhat was the invitation? The last page before the torn section reads: "I named it. That was my mistake. I gave it a part of me."`,
    ar: () =>
      `اليومية تمتد عامين. وثّقت عمتك كل شيء بدقة العالم.\n\nالاكتشافات الرئيسية:\n— الكيان وصل بعد أن فتحت بابًا في القبو كان قيل لها أن تتركه مغلقًا.\n— لا يستطيع دخول الغرف إلا إذا دُعي إليها، صوتيًا أو رمزيًا.\n— الضوء يؤذيه. لا يقتله. فقط يدفعه للخلف.\n— يتعلم ممن يسكنهم. يصبح أذكى. أسرع.\n— الطريقة الوحيدة لإنهائه: "أغلق الباب. أحرق الدعوة."\n\nما كانت الدعوة؟ آخر صفحة قبل القسم الممزق تقرأ: "سمّيته. كان ذلك خطئي. أعطيته جزءًا مني."`,
    choices: [
      {
        id: 'h_jr_drawer',
        en: () => 'Check the desk drawer — maybe the invitation is there',
        ar: () => 'تحقق من درج المكتب — ربما الدعوة بداخله',
        next: 'h_drawer_open',
        effects: { fear: 1, knowsSecret: true },
      },
      {
        id: 'h_jr_basement',
        en: () => 'Go to the basement — that\'s where this started',
        ar: () => 'اذهب إلى القبو — هناك بدأ هذا كله',
        next: 'h_basement_approach',
        effects: { fear: 2, knowsSecret: true },
      },
      {
        id: 'h_jr_search_torn',
        en: () => 'Search the room for the torn pages',
        ar: () => 'فتش الغرفة بحثًا عن الصفحات الممزقة',
        next: 'h_torn_pages',
        effects: { fear: 1, knowsSecret: true },
      },
      {
        id: 'h_jr_upstairs',
        en: () => 'The red room upstairs — go investigate it now',
        ar: () => 'الغرفة الحمراء بالأعلى — اذهب وتحقق منها الآن',
        next: 'h_upper_hall',
        effects: { fear: 2, knowsSecret: true },
      },
    ],
  },

  // Drawer open
  {
    id: 'h_drawer_open',
    en: () =>
      `Inside the middle drawer:\n— A photograph: your aunt standing in front of the house, smiling. Dated three years ago. Normal.\n— A second photograph: the same shot but taken at night. Beside your aunt is a tall figure. Its face is completely black — not shadowed, not obscured. Just black. Like the photo was never exposed there.\n— A folded piece of paper with your aunt's handwriting: "The Invitation. Spoken once on the night of November 4th. [REDACTED BY MYSELF]"\n— A small iron skeleton key with a tag that reads: RED DOOR.`,
    ar: () =>
      `داخل الدرج الأوسط:\n— صورة فوتوغرافية: عمتك واقفة أمام المنزل تبتسم. مؤرخة قبل ثلاث سنوات. طبيعية.\n— صورة ثانية: نفس اللقطة لكنها التقطت ليلًا. بجانب عمتك شخصية طويلة. وجهها أسود تمامًا — ليس في ظل، وليس محجوبًا. فقط أسود. كأن الصورة لم تُعرض أبدًا هناك.\n— ورقة مطوية بخط عمتك: "الدعوة. نُطقت مرة واحدة في ليلة الرابع من نوفمبر. [حُذف بنفسي]"\n— مفتاح هيكلي حديدي صغير عليه بطاقة تقرأ: باب أحمر.`,
    choices: [
      {
        id: 'h_do_redkey',
        en: () => 'Take the key — find the red door',
        ar: () => 'خذ المفتاح — اعثر على الباب الأحمر',
        next: 'h_find_red_door',
        effects: { hasRedKey: true, fear: 2 },
      },
      {
        id: 'h_do_photo',
        en: () => 'Stare at the night photograph — look for more details',
        ar: () => 'حدّق في صورة الليل — ابحث عن مزيد من التفاصيل',
        next: 'h_photo_examine',
        effects: { fear: 2, sanity: -1 },
      },
      {
        id: 'h_do_basement',
        en: () => 'The basement — go immediately',
        ar: () => 'القبو — اذهب فورًا',
        next: 'h_basement_approach',
        effects: { hasRedKey: true, fear: 3 },
      },
      {
        id: 'h_do_leave',
        en: () => 'Close the drawer and go back to the foyer',
        ar: () => 'أغلق الدرج وارجع إلى الردهة',
        next: 'h_foyer',
        effects: { hasRedKey: true, fear: 0 },
      },
    ],
  },

  // Bookshelves
  {
    id: 'h_bookshelves',
    en: () =>
      `Between two tall books on the occult you find a sealed plastic bag. Inside: a handwritten note and a small iron fireplace poker, miniaturized — perhaps a paperweight.\n\nThe note reads: "It cannot cross iron. Keep this near you always."\n\nYou also find an old book marked with a sticky note: "Chapter 7 — Binding through Sound." The relevant passage: "An entity bound by spoken invitation may be released only by burning the original invocation in the presence of the bound threshold."\n\nThe basement door. You need to find the invitation and burn it at the basement door.`,
    ar: () =>
      `بين كتابين كبيرين عن عالم الخوارق تجد حقيبة بلاستيكية مختومة. بداخلها: ملاحظة مكتوبة بخط اليد وقضيب مدفأة حديدي صغير — ربما ثقل أوراق.\n\nالملاحظة تقرأ: "إنه لا يستطيع تجاوز الحديد. احتفظ بهذا قريبًا منك دائمًا."\n\nتجد أيضًا كتابًا قديمًا مُعلَّمًا بملاحظة لاصقة: "الفصل السابع — الربط عبر الصوت." المقطع ذو الصلة: "يمكن للكيان المقيّد بدعوة منطوقة أن يُحرَّر فقط بحرق الدعوة الأصلية في حضور العتبة المقيّدة."\n\nباب القبو. تحتاج إلى إيجاد الدعوة وإحراقها عند باب القبو.`,
    choices: [
      {
        id: 'h_bs_iron',
        en: () => 'Take the iron paperweight and the note',
        ar: () => 'خذ ثقل الأوراق الحديدي والملاحظة',
        next: 'h_study',
        effects: { hasIron: true, knowsSecret: true, fear: 0 },
      },
      {
        id: 'h_bs_drawer',
        en: () => 'Check the locked desk drawer — maybe the invitation is there',
        ar: () => 'تحقق من الدرج المقفل — ربما الدعوة بداخله',
        next: 'h_drawer_open',
        effects: { knowsSecret: true, fear: 1 },
      },
      {
        id: 'h_bs_basement',
        en: () => 'Go to the basement immediately',
        ar: () => 'اذهب إلى القبو فورًا',
        next: 'h_basement_approach',
        effects: { knowsSecret: true, fear: 2 },
      },
      {
        id: 'h_bs_upstairs',
        en: () => 'The red room upstairs first — then the basement',
        ar: () => 'الغرفة الحمراء بالأعلى أولًا — ثم القبو',
        next: 'h_upper_hall',
        effects: { knowsSecret: true, fear: 1 },
      },
    ],
  },

  // ── UPPER HALLWAY ──────────────────────────────────────────────────────────────
  {
    id: 'h_upper_hall',
    requiresName: 'shadowName',
    en: (v) =>
      `The upper hallway stretches into near-darkness. Six doors, all closed. The red glow comes from the last door on the left.\n\nAs your foot touches the top stair, every door handle in the hallway turns simultaneously. One click. Then stillness.\n\nYou hear breathing. Not from any one door. From the hallway itself.\n\nThen a voice — low, distorted, speaking just below the threshold of comprehension. It knows your name. No — it IS your name, warping, becoming something else.\n\nYou decide to call it ${v.names?.shadowName ?? 'The Shadow'}.`,
    ar: (v) =>
      `الممر العلوي يمتد في شبه ظلام. ستة أبواب، جميعها مغلقة. الضوء الأحمر يأتي من الباب الأخير على اليسار.\n\nحين تلمس قدمك قمة الدرج، تدور كل مقابض الأبواب في الممر في آنٍ واحد. نقرة واحدة. ثم سكون.\n\nتسمع تنفسًا. ليس من باب واحد. من الممر نفسه.\n\nثم صوت — منخفض، مشوّه، يتحدث دون عتبة الفهم. يعرف اسمك. لا — إنه اسمك، يتحوّل، يصبح شيئًا آخر.\n\nتقرر تسميته ${v.names?.shadowName ?? 'الظل'}.`,
    choices: [
      {
        id: 'h_uh_red',
        en: () => 'Walk to the red door at the end of the hall',
        ar: () => 'امشِ نحو الباب الأحمر في نهاية الممر',
        next: 'h_red_door_outside',
        effects: { fear: 3, sanity: -1 },
      },
      {
        id: 'h_uh_first',
        en: () => 'Try the first door on the right — closest to the stairs',
        ar: () => 'جرب الباب الأول على اليمين — الأقرب للدرج',
        next: 'h_bedroom1',
        effects: { fear: 2 },
      },
      {
        id: 'h_uh_call',
        en: (v) => `Call out to ${v.names?.shadowName ?? 'The Shadow'} — demand it show itself`,
        ar: (v) => `نادِ ${v.names?.shadowName ?? 'الظل'} — اطلب منه أن يُظهر نفسه`,
        next: 'h_shadow_confront',
        effects: { fear: 3, sanity: -2 },
      },
      {
        id: 'h_uh_retreat',
        en: () => 'Retreat quietly back downstairs',
        ar: () => 'تراجع بهدوء نحو الأسفل',
        next: 'h_foyer',
        effects: { fear: 1 },
      },
    ],
  },

  // Shadow confront
  {
    id: 'h_shadow_confront',
    en: (v) =>
      `Silence.\n\nThen the lights — every light you brought — dies simultaneously.\n\nIn the darkness ${v.names?.shadowName ?? 'The Shadow'} takes shape. Tall. Wrong proportions. Where its face should be, there is only a flat darkness that seems to breathe.\n\nIt speaks in your aunt's voice: "You came back. You always come back. This house needs a tenant."\n\nThen it lunges.`,
    ar: (v) =>
      `صمت.\n\nثم تموت الأضواء — كل ضوء أحضرته — في آنٍ واحد.\n\nفي الظلام يتشكل ${v.names?.shadowName ?? 'الظل'}. طويل. نسب خاطئة. حيث يجب أن يكون وجهه، هناك فقط ظلام مسطح يبدو كأنه يتنفس.\n\nيتحدث بصوت عمتك: "عدت. أنت دائمًا تعود. هذا المنزل يحتاج مستأجرًا."\n\nثم يندفع.`,
    choices: [
      {
        id: 'h_sc_iron_use',
        en: () => 'Swing the iron you\'re carrying at it',
        ar: () => 'أرجح الحديد الذي تحمله نحوه',
        next: 'h_iron_works',
        condition: (v) => v.hasIron,
        lockedEn: 'You need something iron to repel it',
        lockedAr: 'تحتاج شيئًا من الحديد لصده',
      },
      {
        id: 'h_sc_run',
        en: () => 'Run — get back downstairs NOW',
        ar: () => 'اجرِ — عد إلى الأسفل الآن',
        next: 'h_run_downstairs',
        effects: { fear: 3 },
      },
      {
        id: 'h_sc_scream',
        en: () => 'Scream your name at it — refuse to hide',
        ar: () => 'اصرخ باسمك في وجهه — ارفض الاختباء',
        next: 'h_name_screamed',
        effects: { fear: 1, sanity: -3 },
      },
      {
        id: 'h_sc_freeze',
        en: () => 'Freeze completely — absolute stillness',
        ar: () => 'تجمّد تمامًا — سكون كامل',
        next: 'h_freeze_works',
        effects: { fear: 2 },
      },
    ],
  },

  // Iron works against shadow
  {
    id: 'h_iron_works',
    en: (v) =>
      `The iron makes contact and ${v.names?.shadowName ?? 'The Shadow'} recoils violently — a sound like radio static at full volume erupts from it and it collapses backward, dissipating into darkness.\n\nThe lights come back.\n\nYou're shaking. Your palm is burned where you gripped the iron too tightly — or where something cold bit through it. You can't tell.\n\nIt will come back. You know that now. You need to find the invitation and end this.`,
    ar: (v) =>
      `يلامس الحديد الهدف ويرتعش ${v.names?.shadowName ?? 'الظل'} بعنف — صوت كتشويش راديو بأقصى مستوى ينفجر منه ويتراجع للخلف، يتلاشى في الظلام.\n\nتعود الأضواء.\n\nأنت ترتجف. راحة يدك محترقة حيث أمسكت الحديد بإحكام شديد — أو حيث عضّ شيء بارد خلالها. لا تستطيع التمييز.\n\nسيعود. تعرف ذلك الآن. تحتاج إلى إيجاد الدعوة وإنهاء هذا.`,
    choices: [
      {
        id: 'h_iw_basement',
        en: () => 'The basement — go now while it\'s weakened',
        ar: () => 'القبو — اذهب الآن بينما هو ضعيف',
        next: 'h_basement_approach',
        effects: { shadowWeakened: true, fear: 2 },
      },
      {
        id: 'h_iw_red',
        en: () => 'Find the red door first',
        ar: () => 'اجد الباب الأحمر أولًا',
        next: 'h_red_door_outside',
        effects: { shadowWeakened: true, fear: 2 },
      },
      {
        id: 'h_iw_study',
        en: () => 'Go back to the study — find the torn journal pages',
        ar: () => 'ارجع إلى الدراسة — اجد صفحات اليومية الممزقة',
        next: 'h_torn_pages',
        effects: { shadowWeakened: true, fear: 1 },
      },
      {
        id: 'h_iw_escape',
        en: () => 'Run — get out of the house entirely',
        ar: () => 'اجرِ — اخرج من المنزل كليًا',
        next: 'h_escape_run',
        effects: { shadowWeakened: true, fear: 2 },
      },
    ],
  },

  // Name screamed
  {
    id: 'h_name_screamed',
    en: () =>
      `You scream your name.\n\nThe Shadow STOPS. For one second it is completely still.\n\nThen it smiles — and you realize it has learned to smile. Your smile. A copy so precise it turns your stomach.\n\nIt whispers your name back at you, perfectly, in your own voice. "Yes," it says. "That will do nicely."\n\nYou feel something drain from you — not blood. Something older. Your name has been taken. You can no longer remember how to say it.`,
    ar: () =>
      `تصرخ باسمك.\n\nيتوقف الظل. لثانية واحدة توقف تام.\n\nثم يبتسم — وتدرك أنه تعلّم الابتسام. ابتسامتك. نسخة دقيقة لدرجة تقلب معدتك.\n\nيهمس باسمك مجددًا عليك، بشكل مثالي، بصوتك. "نعم،" يقول. "هذا سيفي بالغرض."\n\nتشعر بشيء يتصرف منك — ليس دمًا. شيء أقدم. أُخذ اسمك. لم تعد تتذكر كيف تنطقه.`,
    choices: [
      {
        id: 'h_ns_run',
        en: () => 'Run from it',
        ar: () => 'اجرِ منه',
        next: 'h_run_downstairs',
        effects: { fear: 4, sanity: -2, nameTaken: true },
      },
      {
        id: 'h_ns_fight',
        en: () => 'Fight back — swipe at it with anything',
        ar: () => 'قاومه — اضرب بأي شيء',
        next: 'h_fight_unarmed',
        effects: { fear: 3, nameTaken: true },
      },
      {
        id: 'h_ns_iron_now',
        en: () => 'Use the iron — now',
        ar: () => 'استخدم الحديد — الآن',
        next: 'h_iron_works',
        condition: (v) => v.hasIron,
        lockedEn: 'You have no iron',
        lockedAr: 'لا يوجد معك حديد',
        effects: { nameTaken: true },
      },
      {
        id: 'h_ns_give',
        en: () => 'Let it take your name — surrender fully',
        ar: () => 'دعه يأخذ اسمك — استسلم بالكامل',
        next: 'h_possession_path',
        effects: { fear: 0, sanity: -5, nameTaken: true },
      },
    ],
  },

  // Freeze works
  {
    id: 'h_freeze_works',
    en: (v) =>
      `You freeze. You don't breathe. You don't think.\n\n${v.names?.shadowName ?? 'The Shadow'} moves to within inches of your face. You can feel its cold. See through it to the wall beyond.\n\nIt waits. Fifteen seconds. Twenty.\n\nThen it retreats — slowly, reluctantly — back into the walls.\n\nYou breathe. It saw you. It knows you're here. But it did not take you. Not yet.\n\nYou have a window. Use it.`,
    ar: (v) =>
      `تتجمد. لا تتنفس. لا تفكر.\n\n${v.names?.shadowName ?? 'الظل'} ينتقل حتى يصبح على بعد بضعة سنتيمترات من وجهك. تشعر ببرودته. ترى الجدار خلفه بشفافية.\n\nينتظر. خمس عشرة ثانية. عشرون.\n\nثم يتراجع — ببطء، مترددًا — عائدًا إلى الجدران.\n\nتتنفس. لقد رآك. يعرف أنك هنا. لكنه لم يأخذك. ليس بعد.\n\nلديك فرصة. استغلها.`,
    choices: [
      {
        id: 'h_fw_basement',
        en: () => 'Head immediately to the basement',
        ar: () => 'اتجه فورًا إلى القبو',
        next: 'h_basement_approach',
        effects: { fear: 2 },
      },
      {
        id: 'h_fw_red',
        en: () => 'Find the red door',
        ar: () => 'اجد الباب الأحمر',
        next: 'h_red_door_outside',
        effects: { fear: 2 },
      },
      {
        id: 'h_fw_study',
        en: () => 'Get back to the study — find that invitation',
        ar: () => 'ارجع إلى الدراسة — اجد تلك الدعوة',
        next: 'h_study',
        effects: { fear: 1 },
      },
      {
        id: 'h_fw_escape',
        en: () => 'Sprint for the front door and escape',
        ar: () => 'اجرِ نحو الباب الأمامي والهرب',
        next: 'h_escape_run',
        effects: { fear: 3 },
      },
    ],
  },

  // Run downstairs
  {
    id: 'h_run_downstairs',
    en: () =>
      `You take the stairs three at a time, crash into the foyer. The front door is now locked from inside — a deadbolt you didn't engage.\n\nAbove you, slow footsteps on the upper floor.\n\nYou have minutes, maybe less. Three options present themselves.`,
    ar: () =>
      `تنزل الدرج ثلاث درجات في كل خطوة، تتحطم في الردهة. الباب الأمامي الآن مقفل من الداخل — مزلاج لم تشبكه.\n\nفوقك، خطوات بطيئة على الطابق العلوي.\n\nأمامك دقائق، ربما أقل. ثلاثة خيارات تتضح.`,
    choices: [
      {
        id: 'h_rd_basement',
        en: () => 'The basement — end this',
        ar: () => 'القبو — أنهِ هذا',
        next: 'h_basement_approach',
        effects: { fear: 3 },
      },
      {
        id: 'h_rd_window',
        en: () => 'Break a window and climb out',
        ar: () => 'اكسر نافذة واخرج منها',
        next: 'h_window_break',
        effects: { fear: 2 },
      },
      {
        id: 'h_rd_kitchen',
        en: () => 'The kitchen — find the back door',
        ar: () => 'المطبخ — اجد الباب الخلفي',
        next: 'h_kitchen',
        effects: { fear: 2 },
      },
      {
        id: 'h_rd_hide',
        en: () => 'Hide in the study and wait',
        ar: () => 'الاختباء في الدراسة والانتظار',
        next: 'h_study',
        effects: { fear: 1 },
      },
    ],
  },

  // Fight unarmed
  {
    id: 'h_fight_unarmed',
    en: (v) =>
      `Your fists pass through ${v.names?.shadowName ?? 'The Shadow'} like fog. Cold. Burning cold.\n\nIt laughs — or makes the sound it has learned laughter is — and wraps something around your mind like hands.\n\nYou fall.`,
    ar: (v) =>
      `قبضتاك تمران خلال ${v.names?.shadowName ?? 'الظل'} كالضباب. برودة. برودة حارقة.\n\nيضحك — أو يصدر الصوت الذي تعلّم أن الضحك هو إياه — ويلف شيئًا حول عقلك كالأيدي.\n\nتسقط.`,
    choices: [
      {
        id: 'h_fu_endure',
        en: () => 'Fight through the pain — get UP',
        ar: () => 'تحمل الألم — انهض',
        next: 'h_near_death_escape',
        effects: { fear: 3, sanity: -2 },
      },
      {
        id: 'h_fu_surrender',
        en: () => 'Stop fighting — go limp',
        ar: () => 'توقف عن القتال — استرخِ',
        next: 'h_possession_path',
        effects: { sanity: -5 },
      },
      {
        id: 'h_fu_iron_last',
        en: () => 'Reach for the iron — it might still be in your pocket',
        ar: () => 'ابحث عن الحديد — ربما لا يزال في جيبك',
        next: 'h_iron_works',
        condition: (v) => v.hasIron,
        lockedEn: 'You have no iron to reach for',
        lockedAr: 'ليس لديك حديد',
      },
      {
        id: 'h_fu_scream_help',
        en: () => 'Scream — anything — hoping something breaks this',
        ar: () => 'اصرخ — أي شيء — آملًا أن يكسر هذا شيء',
        next: 'h_scream_breaks',
        effects: { fear: 4, sanity: -2 },
      },
    ],
  },

  // Scream breaks something
  {
    id: 'h_scream_breaks',
    en: () =>
      `Your scream breaks a window. Light — morning light — floods in.\n\nThe Shadow dissolves like smoke in wind. Not destroyed. Just banished, for now.\n\nYou feel battered, hollowed. But alive.\n\nDawn has come. You have maybe two hours before nightfall replenishes it.`,
    ar: () =>
      `صراخك يكسر نافذة. ضوء — ضوء الصباح — يتدفق للداخل.\n\nيتلاشى الظل كالدخان في الريح. لم يُدمَّر. فقط نُفي، في الوقت الحالي.\n\nتشعر بانهاك وفراغ. لكنك حي.\n\nالفجر قد أتى. أمامك ساعتان تقريبًا قبل أن يجدده الغسق.`,
    choices: [
      {
        id: 'h_sb_basement',
        en: () => 'The basement — use this window of time',
        ar: () => 'القبو — استغل هذه الفرصة الزمنية',
        next: 'h_basement_approach',
        effects: { fear: 1 },
      },
      {
        id: 'h_sb_red',
        en: () => 'Find the red door first',
        ar: () => 'اجد الباب الأحمر أولًا',
        next: 'h_find_red_door',
        effects: { fear: 1 },
      },
      {
        id: 'h_sb_escape',
        en: () => 'Escape through the broken window NOW',
        ar: () => 'اهرب من النافذة المكسورة الآن',
        next: 'h_escape_run',
        effects: { fear: 1 },
      },
      {
        id: 'h_sb_journal',
        en: () => 'Back to the study — read everything you missed',
        ar: () => 'ارجع إلى الدراسة — اقرأ كل ما فاتك',
        next: 'h_study',
        effects: { fear: 0 },
      },
    ],
  },

  // Near death escape
  {
    id: 'h_near_death_escape',
    en: () =>
      `You fight to your feet. Every instinct screaming. You grab the nearest thing — a candlestick, heavy brass — and hurl it.\n\nNot iron. But the impact breaks the Shadow's concentration. A moment's reprieve.\n\nYou run. Stairs. Foyer. And you don't stop.`,
    ar: () =>
      `تكافح لتنهض. كل غريزة تصرخ. تمسك أقرب شيء — يجاية شمعة، نحاس ثقيل — وترميها.\n\nليست حديدًا. لكن الضربة تكسر تركيز الظل. لحظة راحة.\n\nتجري. الدرج. الردهة. ولا تتوقف.`,
    choices: [
      {
        id: 'h_nde_door',
        en: () => 'Crash through the front door',
        ar: () => 'اقتحم الباب الأمامي',
        next: 'h_escape_run',
        effects: { fear: 2 },
      },
      {
        id: 'h_nde_basement',
        en: () => 'Into the kitchen — find the basement',
        ar: () => 'إلى المطبخ — اجد القبو',
        next: 'h_kitchen',
        effects: { fear: 3 },
      },
      {
        id: 'h_nde_study',
        en: () => 'Study — if you end this, you end it properly',
        ar: () => 'الدراسة — إذا أردت إنهاء هذا، أنهه بشكل صحيح',
        next: 'h_study',
        effects: { fear: 2 },
      },
      {
        id: 'h_nde_window',
        en: () => 'Smash a window and climb out',
        ar: () => 'حطم نافذة واخرج',
        next: 'h_escape_run',
        effects: { fear: 2 },
      },
    ],
  },

  // ── KITCHEN ───────────────────────────────────────────────────────────────────
  {
    id: 'h_kitchen',
    en: () =>
      `The kitchen smells of something long-spoiled. A pot on the stove still has dried remnants in it. Three weeks old, at least, by the smell.\n\nA back door leads outside. It's unlocked — a heavy bolt not engaged.\n\nBelow a loose tile near the sink you find a box. Inside: three items.\n— A Polaroid photograph of a door, painted red.\n— A folded map of the house. The basement is circled and labeled "DO NOT ENTER" — but someone else has crossed that out and written "THE ONLY WAY."\n— A key labeled "BACK STAIRS."`,
    ar: () =>
      `تفوح من المطبخ رائحة شيء فسد منذ وقت طويل. قدر على الموقد لا يزال فيه بقايا جافة. ثلاثة أسابيع على الأقل، من حدة الرائحة.\n\nباب خلفي يؤدي للخارج. غير مقفل — مزلاج ثقيل غير مشبوك.\n\nأسفل بلاطة متحركة بالقرب من الحوض تجد صندوقًا. بداخله ثلاثة عناصر.\n— صورة بولاروید لباب مطلي باللون الأحمر.\n— خريطة مطوية للمنزل. تم تحديد القبو بدائرة وكتب عليه "لا تدخل" — لكن شخصًا آخر شطبها وكتب "الطريق الوحيد."\n— مفتاح مُعلَّق بـ"الدرج الخلفي".`,
    choices: [
      {
        id: 'h_kit_escape',
        en: () => 'Use the unlocked back door to escape outside',
        ar: () => 'استخدم الباب الخلفي غير المقفل للهرب خارجًا',
        next: 'h_escape_run',
        effects: { fear: 0 },
      },
      {
        id: 'h_kit_basement',
        en: () => 'Find the basement door — the map shows it\'s near here',
        ar: () => 'اجد باب القبو — تظهر الخريطة أنه قريب من هنا',
        next: 'h_basement_approach',
        effects: { hasMap: true, fear: 2 },
      },
      {
        id: 'h_kit_key',
        en: () => 'Use the back-stairs key to find another way up',
        ar: () => 'استخدم مفتاح الدرج الخلفي إيجاد طريق آخر للأعلى',
        next: 'h_back_stairs',
        effects: { hasMap: true, fear: 1 },
      },
      {
        id: 'h_kit_red',
        en: () => 'The Polaroid shows the red door — find it',
        ar: () => 'صورة البولاروید تظهر الباب الأحمر — اجده',
        next: 'h_find_red_door',
        effects: { hasMap: true, fear: 2 },
      },
    ],
  },

  // Back stairs
  {
    id: 'h_back_stairs',
    en: () =>
      `The back stairs lead to the upper hallway, bypassing the main staircase entirely. The key fits a padlocked cage door at the top — maintenance access.\n\nThrough the cage you can see the red door at the end of the hall. You can also see, in the shadows near it, something standing. Watching the door.\n\nIt hasn't noticed you yet.`,
    ar: () =>
      `الدرج الخلفي يؤدي إلى الممر العلوي، متجاوزًا الدرج الرئيسي تمامًا. المفتاح يناسب باب قفص مقيّد في الأعلى — وصول للصيانة.\n\nعبر القفص يمكنك رؤية الباب الأحمر في نهاية الممر. يمكنك أيضًا رؤية، في الظلال بالقرب منه، شيئًا يقف. يراقب الباب.\n\nلم يلاحظك بعد.`,
    choices: [
      {
        id: 'h_bs2_sneak',
        en: () => 'Sneak past it to reach the red door',
        ar: () => 'تسلل بهدوء لتصل إلى الباب الأحمر',
        next: 'h_red_door_outside',
        effects: { fear: 3 },
      },
      {
        id: 'h_bs2_distract',
        en: () => 'Throw something to distract it and run past',
        ar: () => 'ارمِ شيئًا لإلهائه واركض بجانبه',
        next: 'h_distract_shadow',
        effects: { fear: 2 },
      },
      {
        id: 'h_bs2_retreat',
        en: () => 'Retreat silently back downstairs',
        ar: () => 'تراجع بهدوء للأسفل',
        next: 'h_kitchen',
        effects: { fear: 1 },
      },
      {
        id: 'h_bs2_iron_confront',
        en: () => 'Confront it with the iron while it\'s not looking',
        ar: () => 'واجهه بالحديد وهو لا ينظر',
        next: 'h_iron_works',
        condition: (v) => v.hasIron,
        lockedEn: 'You need iron to attempt this',
        lockedAr: 'تحتاج حديدًا للمحاولة',
        effects: { fear: 2 },
      },
    ],
  },

  // Distract shadow
  {
    id: 'h_distract_shadow',
    en: () =>
      `You pull off your shoe and hurl it down the hallway. It clatters off a door at the far end.\n\nThe figure — motionless for so long — snaps its head toward the sound. Every movement wrong, too fast, too angular.\n\nYou run. You reach the red door before it turns back.`,
    ar: () =>
      `تخلع حذاءك وترميه في نهاية الممر. يقرقع بعيدًا عن باب في النهاية البعيدة.\n\nالشخصية — الساكنة منذ وقت طويل — تلتفت رأسها نحو الصوت بسرعة. كل حركة خاطئة، سريعة جدًا، مزاوية جدًا.\n\nتجري. تصل إلى الباب الأحمر قبل أن تعود لتنظر.`,
    choices: [
      {
        id: 'h_ds_open',
        en: () => 'Try to open the red door immediately',
        ar: () => 'حاول فتح الباب الأحمر فورًا',
        next: 'h_red_door_outside',
        effects: { fear: 3 },
      },
      {
        id: 'h_ds_key',
        en: () => 'Use the red key from the desk drawer',
        ar: () => 'استخدم المفتاح الأحمر من درج المكتب',
        next: 'h_red_door_open',
        condition: (v) => v.hasRedKey,
        lockedEn: 'The door is locked — you need the red key',
        lockedAr: 'الباب مقفل — تحتاج المفتاح الأحمر',
        effects: { fear: 3 },
      },
      {
        id: 'h_ds_dont',
        en: () => 'Don\'t open it — head straight to the basement instead',
        ar: () => 'لا تفتحه — اتجه مباشرة إلى القبو بدلًا من ذلك',
        next: 'h_basement_approach',
        effects: { fear: 2 },
      },
      {
        id: 'h_ds_listen',
        en: () => 'Press your ear to the red door and listen',
        ar: () => 'ضع أذنك على الباب الأحمر واستمع',
        next: 'h_red_door_listen',
        effects: { fear: 2 },
      },
    ],
  },

  // Red door outside (approaching without key)
  {
    id: 'h_red_door_outside',
    en: () =>
      `The red door at the end of the hall is painted deep crimson — but the paint looks wet. You reach out and touch it.\n\nYour finger comes away dry. The paint just looks that way. Always looks that way, somehow.\n\nThe door is locked. There is a keyhole — a skeleton key type. From beyond the door you hear: breathing. Slow. Rhythmic. Like someone sleeping.`,
    ar: () =>
      `الباب الأحمر في نهاية الممر مطلي بلون قرمزي عميق — لكن الطلاء يبدو رطبًا. تمد يدك وتلمسه.\n\nإصبعك تعود جافة. الطلاء يبدو هكذا فقط. يبدو هكذا دائمًا، بطريقة ما.\n\nالباب مقفل. فيه ثقب مفتاح — نوع المفتاح الهيكلي. من وراء الباب تسمع: تنفسًا. بطيئًا. منتظمًا. كشخص نائم.`,
    choices: [
      {
        id: 'h_rdo_key',
        en: () => 'Use the red key',
        ar: () => 'استخدم المفتاح الأحمر',
        next: 'h_red_door_open',
        condition: (v) => v.hasRedKey,
        lockedEn: 'You need the red skeleton key from the desk',
        lockedAr: 'تحتاج المفتاح الهيكلي الأحمر من المكتب',
        effects: { fear: 2 },
      },
      {
        id: 'h_rdo_listen',
        en: () => 'Press your ear against the door and listen',
        ar: () => 'ضع أذنك على الباب واستمع',
        next: 'h_red_door_listen',
        effects: { fear: 1 },
      },
      {
        id: 'h_rdo_knock',
        en: () => 'Knock on the door',
        ar: () => 'اطرق الباب',
        next: 'h_red_door_knock',
        effects: { fear: 2, sanity: -1 },
      },
      {
        id: 'h_rdo_leave',
        en: () => 'Leave it and go to the basement instead',
        ar: () => 'اتركه واذهب إلى القبو بدلًا من ذلك',
        next: 'h_basement_approach',
        effects: { fear: 1 },
      },
    ],
  },

  // Red door listen
  {
    id: 'h_red_door_listen',
    en: () =>
      `The breathing stops the moment your ear touches the door.\n\nSilence.\n\nThen a voice — from inches away, from directly on the other side — says quietly:\n\n"Don't open this door. Not yet. Get the key. Burn the note. Then come back. Only then."\n\nThe voice is your aunt's.`,
    ar: () =>
      `التنفس يتوقف في اللحظة التي تلمس فيها أذنك الباب.\n\nصمت.\n\nثم صوت — من بضعة سنتيمترات، من الجانب الآخر مباشرة — يقول بهدوء:\n\n"لا تفتح هذا الباب. ليس بعد. احصل على المفتاح. أحرق الملاحظة. ثم عد. فقط بعدها."\n\nالصوت صوت عمتك.`,
    choices: [
      {
        id: 'h_rdl_obey',
        en: () => 'Follow the instructions — find the key and the note',
        ar: () => 'اتبع التعليمات — اجد المفتاح والملاحظة',
        next: 'h_study',
        effects: { fear: 1, heardsAunt: true },
      },
      {
        id: 'h_rdl_demand',
        en: () => 'Demand to know who is speaking',
        ar: () => 'اطلب معرفة من يتحدث',
        next: 'h_aunt_voice_reveal',
        effects: { fear: 2 },
      },
      {
        id: 'h_rdl_key',
        en: () => 'Open with the key right now',
        ar: () => 'افتح بالمفتاح الآن',
        next: 'h_red_door_open',
        condition: (v) => v.hasRedKey,
        lockedEn: 'You don\'t have the red key yet',
        lockedAr: 'ليس لديك المفتاح الأحمر بعد',
        effects: { fear: 3 },
      },
      {
        id: 'h_rdl_basement',
        en: () => 'Go straight to the basement instead',
        ar: () => 'اذهب إلى القبو مباشرة',
        next: 'h_basement_approach',
        effects: { fear: 2, heardsAunt: true },
      },
    ],
  },

  // Aunt voice reveal
  {
    id: 'h_aunt_voice_reveal',
    en: (v) =>
      `"My name is ${v.names?.auntName ?? 'Mara'}," the voice says. "Or it was. It took most of it. What's left of me is in this room."\n\nA pause.\n\n"I'm not a ghost. I'm a residue. What happens when something takes enough of a person. The house keeps a record of everyone it's consumed."\n\nAnother pause.\n\n"You need to burn the invitation in the basement. That seals the door it came through. Then open this room — the key is in the desk. What you find here will help you understand. But find the invitation first."`,
    ar: (v) =>
      `"اسمي ${v.names?.auntName ?? 'مارا'}،" يقول الصوت. "أو كان كذلك. أخذ معظمه. ما تبقى مني في هذه الغرفة."\n\nتوقف.\n\n"لست شبحًا. أنا رواسب. ما يحدث حين يأخذ شيء ما من شخص ما بما يكفي. المنزل يحتفظ بسجل لكل من استهلكه."\n\nتوقف آخر.\n\n"تحتاج إلى حرق الدعوة في القبو. هذا يغلق الباب الذي جاء منه. ثم افتح هذه الغرفة — المفتاح في المكتب. ما ستجده هنا سيساعدك على الفهم. لكن اجد الدعوة أولًا."`,
    choices: [
      {
        id: 'h_avr_listen',
        en: () => 'Ask her what the invitation was',
        ar: () => 'اسألها ما كانت الدعوة',
        next: 'h_invitation_clue',
        effects: { fear: 0, heardsAunt: true },
      },
      {
        id: 'h_avr_basement',
        en: () => 'Go to the basement now',
        ar: () => 'اذهب إلى القبو الآن',
        next: 'h_basement_approach',
        effects: { fear: 1, heardsAunt: true },
      },
      {
        id: 'h_avr_desk',
        en: () => 'Go get the key from the desk first',
        ar: () => 'اذهب واحصل على المفتاح من المكتب أولًا',
        next: 'h_study',
        effects: { heardsAunt: true, fear: 0 },
      },
      {
        id: 'h_avr_escape',
        en: () => 'You want nothing to do with this — escape now',
        ar: () => 'لا تريد لك أي علاقة بهذا — اهرب الآن',
        next: 'h_escape_run',
        effects: { fear: 2 },
      },
    ],
  },

  // Invitation clue
  {
    id: 'h_invitation_clue',
    en: () =>
      `"I wrote a name," the voice says. "That was all it took. I found a ritual in one of the books — old, European, ancient. You write a name on paper and burn it in the space between the basement door and the threshold. An invitation.\n\nI was lonely. I didn't know what I was doing.\n\n"The invitation still exists. It didn't burn completely — I panicked and doused it. Part of it is still down there, on the ledge above the door. Find it. Actually burn it this time."\n\nThere is grief in the voice that no ghost should be capable of.`,
    ar: () =>
      `"كتبت اسمًا،" يقول الصوت. "ذلك كان كافيًا. وجدت طقسًا في أحد الكتب — قديم، أوروبي، من العصور القديمة. تكتب اسمًا على ورقة وتحرقه في المساحة بين باب القبو والعتبة. دعوة.\n\nكنت وحيدة. لم أكن أعرف ما أفعله.\n\n"الدعوة لا تزال موجودة. لم تحترق بالكامل — أصابني الذعر وأطفأتها. جزء منها لا يزال هناك، على الحافة فوق الباب. اجدها. احرقها فعليًا هذه المرة."\n\nفي الصوت حزن لا ينبغي أن يكون أي شبح قادرًا عليه.`,
    choices: [
      {
        id: 'h_ic_basement',
        en: () => 'Go to the basement now — find and burn the invitation',
        ar: () => 'اذهب إلى القبو الآن — اجد الدعوة وأحرقها',
        next: 'h_basement_approach',
        effects: { knowsInvitation: true, fear: 1 },
      },
      {
        id: 'h_ic_key_first',
        en: () => 'Get the red key from the study first',
        ar: () => 'احصل أولًا على المفتاح الأحمر من الدراسة',
        next: 'h_drawer_open',
        effects: { knowsInvitation: true, fear: 0 },
      },
      {
        id: 'h_ic_iron',
        en: () => 'Find iron first — for protection',
        ar: () => 'اجد الحديد أولًا — للحماية',
        next: 'h_bookshelves',
        effects: { knowsInvitation: true, fear: 0 },
      },
      {
        id: 'h_ic_together',
        en: () => 'Can she come with you somehow? Can she help?',
        ar: () => 'هل تستطيع أن تأتي معك بطريقة ما؟ هل تستطيع المساعدة؟',
        next: 'h_aunt_help',
        effects: { knowsInvitation: true, fear: 0 },
      },
    ],
  },

  // Aunt help
  {
    id: 'h_aunt_help',
    en: () =>
      `"I can't leave the room," she says. "But I can do this."\n\nA pause, then the bedroom door on your left — one of the locked ones — clicks and swings open.\n\nInside: a hurricane lamp, full of oil. A box of matches. An iron fireplace poker.\n\n"I've been saving these," she says. "I hoped someone would come."`,
    ar: () =>
      `"لا أستطيع مغادرة الغرفة،" تقول. "لكن يمكنني فعل هذا."\n\nتوقف، ثم باب غرفة النوم على يسارك — أحد الأبواب المقفلة — ينقر وينفتح.\n\nبالداخل: مصباح إعصار، ممتلئ بالزيت. علبة كبريت. قضيب مدفأة حديدي.\n\n"كنت أحتفظ بهذه،" تقول. "كنت آمل أن يأتي أحد."`,
    choices: [
      {
        id: 'h_ah_take',
        en: () => 'Take everything and go to the basement',
        ar: () => 'خذ كل شيء واذهب إلى القبو',
        next: 'h_basement_approach',
        effects: { hasIron: true, hasLamp: true, hasMatches: true, knowsInvitation: true, fear: 0 },
      },
      {
        id: 'h_ah_talk',
        en: () => 'Ask her what awaits in the basement',
        ar: () => 'اسألها ماذا ينتظرك في القبو',
        next: 'h_basement_warning',
        effects: { hasIron: true, hasLamp: true, hasMatches: true },
      },
      {
        id: 'h_ah_redroom',
        en: () => 'What is in the red room — what will you find there?',
        ar: () => 'ما الذي في الغرفة الحمراء — ما الذي ستجده هناك؟',
        next: 'h_redroom_secret_hint',
        effects: { hasIron: true, hasLamp: true, hasMatches: true },
      },
      {
        id: 'h_ah_go',
        en: () => 'Thank her and go immediately',
        ar: () => 'اشكرها واذهب فورًا',
        next: 'h_basement_approach',
        effects: { hasIron: true, hasLamp: true, hasMatches: true, knowsInvitation: true, fear: 0 },
      },
    ],
  },

  // Basement warning
  {
    id: 'h_basement_warning',
    en: (v) =>
      `"It waits by the door now," she says. "It always returns there — it's instinct. Like a spider at its web.\n\n${v.names?.shadowName ?? 'The Shadow'} will be strongest down there. The iron will slow it. The lamp light will push it back. But it has had three years to grow.\n\nYou have to get to the ledge above the door. The invitation is a piece of scorched paper — you'll know it by the smell. Then burn it completely. Don't blow it out this time."\n\nShe pauses.\n\n"It will fight you. Don't hesitate."`,
    ar: (v) =>
      `"إنه ينتظر بالقرب من الباب الآن،" تقول. "يعود دائمًا إلى هناك — إنها غريزة. كالعنكبوت عند شبكته.\n\n${v.names?.shadowName ?? 'الظل'} سيكون في أقوى حالاته هناك. الحديد سيبطئه. ضوء المصباح سيدفعه للخلف. لكنه أمضى ثلاث سنوات ينمو.\n\nيجب أن تصل إلى الحافة فوق الباب. الدعوة قطعة ورق محترقة — ستعرفها من رائحتها. ثم أحرقها بالكامل. لا تطفئها هذه المرة."\n\nتتوقف.\n\n"ستقاومك. لا تتردد."`,
    choices: [
      {
        id: 'h_bw_go',
        en: () => 'Go to the basement — ready',
        ar: () => 'اذهب إلى القبو — أنت مستعد',
        next: 'h_basement_approach',
        effects: { fear: 1, knowsInvitation: true },
      },
      {
        id: 'h_bw_redroom',
        en: () => 'What about the red room? Still ask.',
        ar: () => 'ماذا عن الغرفة الحمراء؟ لا تزال تسأل',
        next: 'h_redroom_secret_hint',
        effects: { knowsInvitation: true },
      },
      {
        id: 'h_bw_escape',
        en: () => 'This is too much — escape and never return',
        ar: () => 'هذا أكثر مما تحتمل — اهرب ولا تعد أبدًا',
        next: 'h_escape_run',
        effects: { fear: 2 },
      },
      {
        id: 'h_bw_secret',
        en: () => 'Ask her something that\'s been nagging you: are YOU who you think you are?',
        ar: () => 'اسألها شيئًا يقلقك: هل أنت من تظن نفسك؟',
        next: 'h_secret_question',
        effects: { fear: 1 },
      },
    ],
  },

  // Secret ending hint
  {
    id: 'h_redroom_secret_hint',
    en: () =>
      `A long silence.\n\n"The red room is where I kept my memories. Before it took them. It took the wrong ones — I hid the most important one inside a mirror. You'll understand when you see it."\n\nAnother silence.\n\n"There's something about you I need to ask. What year do you think we're in? What do you actually remember of the drive here? What's the last clear memory you have before receiving the letter?"`,
    ar: () =>
      `صمت طويل.\n\n"الغرفة الحمراء هي المكان الذي حفظت فيه ذكرياتي. قبل أن يأخذها. أخذ الأخطاء منها — أخفيت الأهم في داخل مرآة. ستفهم حين ترى."\n\nصمت آخر.\n\n"هناك شيء بشأنك أحتاج أن أسألك. ما السنة التي تعتقد أننا فيها؟ ماذا تتذكر فعليًا عن الرحلة إلى هنا؟ ما آخر ذكرى واضحة لديك قبل تلقي الرسالة؟"`,
    choices: [
      {
        id: 'h_rsh_answer',
        en: () => 'Answer honestly — realize you can\'t remember clearly',
        ar: () => 'أجب بصدق — أدرك أنك لا تتذكر بوضوح',
        next: 'h_secret_question',
        effects: { fear: 2, sanity: -1 },
      },
      {
        id: 'h_rsh_dismiss',
        en: () => 'Dismiss the question — focus on the task',
        ar: () => 'تجاهل السؤال — ركز على المهمة',
        next: 'h_basement_approach',
        effects: { knowsInvitation: true },
      },
      {
        id: 'h_rsh_redroom_now',
        en: () => 'Go open the red room right now',
        ar: () => 'اذهب وافتح الغرفة الحمراء الآن',
        next: 'h_red_door_outside',
        effects: { fear: 2 },
      },
      {
        id: 'h_rsh_mirror',
        en: () => 'Ask specifically about the mirror',
        ar: () => 'اسأل تحديدًا عن المرآة',
        next: 'h_mirror_clue',
        effects: { fear: 1 },
      },
    ],
  },

  // Secret question — triggers secret ending path
  {
    id: 'h_secret_question',
    en: () =>
      `You try to remember. The letter. Packing. Driving.\n\nBut the edges blur. You can't remember... who gave you the key to your apartment before you left. You can't remember what you had for breakfast. You can't remember the last time you heard your own voice on a recording.\n\nYou try to remember your aunt's face. It looks like yours.\n\nYour hands. You look at your hands. They seem fine. But you can't feel the temperature of the air.\n\n"I was hoping you wouldn't notice," she says softly. "You've been here for ten years."`,
    ar: () =>
      `تحاول التذكر. الرسالة. التعبئة. القيادة.\n\nلكن الحواف تضبب. لا تتذكر... من أعطاك مفتاح شقتك قبل مغادرتك. لا تتذكر ما أكلت في الفطور. لا تتذكر آخر مرة سمعت فيها صوتك في تسجيل.\n\nتحاول تذكر وجه عمتك. يشبه وجهك.\n\nيديك. تنظر إلى يديك. تبدو بخير. لكن لا تشعر بحرارة الهواء.\n\n"كنت آملة ألا تلاحظ،" تقول بهدوء. "لقد كنت هنا منذ عشر سنوات."`,
    choices: [
      {
        id: 'h_sq_deny',
        en: () => 'Deny it — run to the basement and end this',
        ar: () => 'أنكر — اجرِ إلى القبو وأنهِ هذا',
        next: 'h_basement_approach',
        effects: { knowsSecret: true, fear: 2 },
      },
      {
        id: 'h_sq_mirror',
        en: () => 'Go to the red room — look in the mirror',
        ar: () => 'اذهب إلى الغرفة الحمراء — انظر في المرآة',
        next: 'h_red_door_outside',
        effects: { knowsSecret: true, knowsInvitation: true, hasRedKey: true, fear: 0 },
      },
      {
        id: 'h_sq_accept',
        en: () => 'Accept the impossible. Ask what that means for you.',
        ar: () => 'اقبل المستحيل. اسأل ماذا يعني ذلك لك.',
        next: 'h_secret_revelation',
        effects: { knowsSecret: true, fear: 0 },
      },
      {
        id: 'h_sq_escape',
        en: () => 'Refuse — run for the door',
        ar: () => 'ارفض — اجرِ نحو الباب',
        next: 'h_escape_run',
        effects: { fear: 3, knowsSecret: true },
      },
    ],
  },

  // Mirror clue
  {
    id: 'h_mirror_clue',
    en: () =>
      `"The mirror in the red room shows what you actually are," she says. "Not what you look like. What you are.\n\nI looked in it the first night. I saw my death. Not a premonition — a memory. Of an event that had already happened.\n\nThe mirror is how I finally understood what had happened to me. What had happened to us both."\n\n"Us both?" you ask.`,
    ar: () =>
      `"المرآة في الغرفة الحمراء تظهر ما أنت عليه فعليًا،" تقول. "ليس كيف تبدو. ما أنت عليه.\n\nنظرت فيها في الليلة الأولى. رأيت موتي. ليست نذير — ذكرى. لحدث كان قد حدث بالفعل.\n\nالمرآة هي كيف فهمت أخيرًا ما حدث لي. ما حدث لكلينا."\n\n"لكلينا؟" تسأل.`,
    choices: [
      {
        id: 'h_mc_secret',
        en: () => '"What happened to us both?" — press her',
        ar: () => '"ما الذي حدث لكلينا؟" — اضغط عليها',
        next: 'h_secret_revelation',
        effects: { knowsSecret: true },
      },
      {
        id: 'h_mc_red_room',
        en: () => 'Go look in the mirror yourself — now',
        ar: () => 'اذهب وانظر في المرآة بنفسك — الآن',
        next: 'h_red_door_outside',
        effects: { knowsSecret: true, hasRedKey: true },
      },
      {
        id: 'h_mc_basement',
        en: () => 'Basement first — answers later',
        ar: () => 'القبو أولًا — الإجابات لاحقًا',
        next: 'h_basement_approach',
        effects: { knowsInvitation: true },
      },
      {
        id: 'h_mc_deny',
        en: () => 'Stop the conversation — you don\'t want to know',
        ar: () => 'أوقف المحادثة — لا تريد أن تعرف',
        next: 'h_basement_approach',
        effects: { knowsInvitation: true, fear: 1 },
      },
    ],
  },

  // Additional nodes for completeness
  {
    id: 'h_footprints',
    en: () =>
      `Around the car in the frost-stiffened mud are footprints. Not human exactly — the proportions are wrong, the stride too wide, the toes too few. They lead from the tree line to your passenger window and back.\n\nWhatever stood there last night is not an animal you know.`,
    ar: () =>
      `حول السيارة في الوحل المتصلب بالصقيع توجد آثار أقدام. ليست بشرية تمامًا — النسب خاطئة، الخطوة واسعة جدًا، الأصابع قليلة جدًا. تمتد من حافة الأشجار إلى نافذة مقعد المساعد وعائدة.\n\nمهما كان ما وقف هناك الليلة الماضية، فهو ليس حيوانًا تعرفه.`,
    choices: [
      {
        id: 'h_fp_enter',
        en: () => 'Enter the house — it\'s daylight now',
        ar: () => 'ادخل المنزل — الآن نور النهار',
        next: 'h_foyer',
        effects: { fear: 2 },
      },
      {
        id: 'h_fp_perimeter',
        en: () => 'Follow the tracks into the tree line',
        ar: () => 'تتبع الآثار نحو حافة الأشجار',
        next: 'h_perimeter',
        effects: { fear: 3 },
      },
      {
        id: 'h_fp_car',
        en: () => 'Check your car carefully before entering',
        ar: () => 'افحص سيارتك بعناية قبل الدخول',
        next: 'h_car_search',
        effects: { fear: 1 },
      },
      {
        id: 'h_fp_cellar',
        en: () => 'Go around the back — find the storm cellar',
        ar: () => 'اذهب للجانب الخلفي — اجد قبو العاصفة',
        next: 'h_cellar_outside',
        effects: { fear: 2 },
      },
    ],
  },

  {
    id: 'h_cellar_outside',
    en: () =>
      `You pull open the storm cellar doors. The smell hits you first — earth and something burnt. Ashes.\n\nThe stairs descend into darkness. At the bottom you can see faint flickering — not from a light but from something that emits cold instead of heat. A pale, sickly luminescence.\n\nThe basement connects to the main structure. You can see a door at the bottom — heavy wood, bound in iron. Above the door frame, barely visible: the remains of a scorched piece of paper.`,
    ar: () =>
      `تفتح أبواب قبو العاصفة. الرائحة تضربك أولًا — تراب وشيء محترق. رماد.\n\nالدرج يهبط في الظلام. في الأسفل يمكنك رؤية وميض خافت — ليس من ضوء بل من شيء يبعث البرودة بدلًا من الحرارة. لمعان شاحب مريض.\n\nالقبو يتصل بالمبنى الرئيسي. يمكنك رؤية باب في الأسفل — خشب ثقيل، مربوط بالحديد. فوق إطار الباب، بالكاد مرئي: بقايا قطعة ورق محترقة.`,
    choices: [
      {
        id: 'h_co_descend',
        en: () => 'Descend into the cellar',
        ar: () => 'انزل إلى القبو',
        next: 'h_basement_approach',
        effects: { fear: 3 },
      },
      {
        id: 'h_co_lamp',
        en: () => 'Get the lamp first before descending',
        ar: () => 'احصل على المصباح أولًا قبل النزول',
        next: 'h_aunt_help',
        effects: { fear: 1 },
      },
      {
        id: 'h_co_retreat',
        en: () => 'Close the doors and go in through the house instead',
        ar: () => 'أغلق الأبواب وادخل من خلال المنزل',
        next: 'h_kitchen',
        effects: { fear: 1 },
      },
      {
        id: 'h_co_study',
        en: () => 'Understand what you\'re dealing with first — go to the study',
        ar: () => 'افهم ما تتعامل معه أولًا — اذهب إلى الدراسة',
        next: 'h_study',
        effects: { fear: 1 },
      },
    ],
  },

  {
    id: 'h_torn_pages',
    en: () =>
      `You search the study methodically. Under the desk, behind the radiator, inside the fireplace (cold).\n\nIn the fireplace you find them — charred at the edges but mostly readable. Your aunt burned them but lost her nerve partway through.\n\nThe key entry: "November 4th — I wrote its name on the card and burned it at the threshold. Then I said the words. God help me, I said the words. It came through before I could close the door again. The card is still there — I could only burn half of it. It's on the ledge. If anyone finds this — burn the rest of the card. That closes the door. That sends it back."\n\nThe invitation is in the basement. Partially burned. On a ledge above the door.`,
    ar: () =>
      `تفتش الدراسة بشكل منهجي. تحت المكتب، خلف المدفأة، داخل الموقد (البارد).\n\nفي الموقد تجدها — محترقة الأطراف لكنها مقروءة في معظمها. أحرقتهن عمتك لكن تراجعت بشجاعتها في منتصف الطريق.\n\nالمدخل الرئيسي: "الرابع من نوفمبر — كتبت اسمه على البطاقة وأحرقتها عند العتبة. ثم قلت الكلمات. الله يرحمني، قلت الكلمات. جاء من الباب قبل أن أتمكن من إغلاقه مجددًا. البطاقة لا تزال هناك — لم أستطع إحراق سوى نصفها. إنها على الحافة. إذا وجدها أحد — أحرق باقي البطاقة. هذا يغلق الباب. هذا يعيده."\n\nالدعوة في القبو. محترقة جزئيًا. على حافة فوق الباب.`,
    choices: [
      {
        id: 'h_tp_basement',
        en: () => 'Go to the basement now — you know what to do',
        ar: () => 'اذهب إلى القبو الآن — تعرف ما يجب فعله',
        next: 'h_basement_approach',
        effects: { knowsInvitation: true, fear: 1 },
      },
      {
        id: 'h_tp_iron',
        en: () => 'Get something iron first — for protection',
        ar: () => 'احصل على شيء من الحديد أولًا — للحماية',
        next: 'h_bookshelves',
        effects: { knowsInvitation: true, fear: 0 },
      },
      {
        id: 'h_tp_lamp',
        en: () => 'Need light too — ask the voice in the red door for help',
        ar: () => 'تحتاج ضوءًا أيضًا — اسأل الصوت في الباب الأحمر عن المساعدة',
        next: 'h_red_door_listen',
        effects: { knowsInvitation: true, fear: 0 },
      },
      {
        id: 'h_tp_redroom',
        en: () => 'Red room first — open it with the key',
        ar: () => 'الغرفة الحمراء أولًا — افتحها بالمفتاح',
        next: 'h_red_door_outside',
        effects: { knowsInvitation: true, fear: 1 },
      },
    ],
  },

  {
    id: 'h_name_spoken',
    en: () =>
      `The name — MARA — echoes in your throat. The moment the last syllable leaves your mouth, every dead oak around the house shudders. All at once. No wind.\n\nThen silence so total it presses against your ears.\n\nThen: the front door of the house swings slowly, fully open. An invitation.\n\nYou feel something wrong with the darkness inside that open door. It is looking at you.`,
    ar: () =>
      `الاسم — مارا — يتردد في حلقك. في اللحظة التي تغادر فيها آخر مقطع فمك، كل بلوطة ميتة حول المنزل ترتجف. دفعة واحدة. بلا ريح.\n\nثم صمت تام يضغط على أذنيك.\n\nثم: الباب الأمامي للمنزل ينفتح ببطء، على مصراعيه. دعوة.\n\nتشعر بشيء خاطئ في الظلام داخل ذلك الباب المفتوح. إنه ينظر إليك.`,
    choices: [
      {
        id: 'h_ns2_enter',
        en: () => 'Accept the invitation — enter',
        ar: () => 'اقبل الدعوة — ادخل',
        next: 'h_foyer',
        effects: { fear: 3, sanity: -1 },
      },
      {
        id: 'h_ns2_refuse',
        en: () => 'Refuse — step back and go around to the back',
        ar: () => 'ارفض — تراجع واذهب حول الجانب الخلفي',
        next: 'h_cellar_outside',
        effects: { fear: 2 },
      },
      {
        id: 'h_ns2_car',
        en: () => 'Run to your car',
        ar: () => 'اجرِ إلى سيارتك',
        next: 'h_escape_attempt_early',
        effects: { fear: 3 },
      },
      {
        id: 'h_ns2_wait',
        en: () => 'Stand completely still and wait to see what happens',
        ar: () => 'قف ساكنًا تمامًا وانتظر لترى ما سيحدث',
        next: 'h_freeze_works',
        effects: { fear: 2 },
      },
    ],
  },

  {
    id: 'h_redlight_stare',
    en: () =>
      `You stare at the window for a long time.\n\nThe red light doesn't flicker like a candle or a lamp. It pulses. Rhythmically. Like a heartbeat.\n\nThen a silhouette crosses in front of it. Tall. Wrong. It reaches the window and stops — and turns its faceless head down toward you.\n\nYou realize it cannot come through glass. But it is marking you. Watching where you go.`,
    ar: () =>
      `تحدّق في النافذة لوقت طويل.\n\nالضوء الأحمر لا يرتجف كالشمعة أو المصباح. إنه ينبض. بإيقاع. كدقات القلب.\n\nثم ظل يعبر أمامه. طويل. خاطئ. يصل إلى النافذة ويتوقف — ويلتفت رأسه الذي لا وجه له نحوك.\n\nتدرك أنه لا يستطيع المرور عبر الزجاج. لكنه يُعلِّمك. يراقب أين تذهب.`,
    choices: [
      {
        id: 'h_rs_enter',
        en: () => 'Enter the house immediately',
        ar: () => 'ادخل المنزل فورًا',
        next: 'h_foyer',
        effects: { fear: 2, shadowAware: true },
      },
      {
        id: 'h_rs_cellar',
        en: () => 'Go to the storm cellar instead of the main door',
        ar: () => 'اذهب إلى قبو العاصفة بدلًا من الباب الرئيسي',
        next: 'h_cellar_outside',
        effects: { fear: 2, shadowAware: true },
      },
      {
        id: 'h_rs_car',
        en: () => 'Get to the car — search for anything useful',
        ar: () => 'اذهب إلى السيارة — ابحث عن أي شيء مفيد',
        next: 'h_car_search',
        effects: { fear: 1, shadowAware: true },
      },
      {
        id: 'h_rs_bedroom',
        en: () => 'Find another way in — around the back',
        ar: () => 'اجد مدخلًا آخر — من الجانب الخلفي',
        next: 'h_perimeter',
        effects: { fear: 2, shadowAware: true },
      },
    ],
  },

  {
    id: 'h_bedroom1',
    en: () =>
      `The first bedroom contains a child's bed — small, with rusted iron bars forming the headboard. Something was kept here. Not a child, you realize. The bars face inward. This was a cage.\n\nOn the walls, crayon drawings — chaotic, overlapping. Mostly scribbles. But in the corner, drawn over and over in the same precise lines: a door. With a red frame. Drawn by someone who needed to record it. Or who was obsessed with it.`,
    ar: () =>
      `غرفة النوم الأولى تحتوي على سرير طفل — صغير، بقضبان حديد صدئة تشكل المسند. كان شيء ما محتجزًا هنا. ليس طفلًا، تدرك. القضبان تواجه الداخل. كان هذا قفصًا.\n\nعلى الجدران، رسومات بالكريون — فوضوية، متداخلة. في معظمها خربشات. لكن في الزاوية، مرسوم مرارًا بنفس الخطوط الدقيقة: باب. بإطار أحمر. رسمه شخص احتاج إلى تسجيله. أو كان مهووسًا به.`,
    choices: [
      {
        id: 'h_b1_red',
        en: () => 'Find the red door — it\'s clearly important',
        ar: () => 'اجد الباب الأحمر — من الواضح أنه مهم',
        next: 'h_red_door_outside',
        effects: { fear: 2 },
      },
      {
        id: 'h_b1_bars',
        en: () => 'Break off one of the iron bars — useful weapon',
        ar: () => 'اكسر أحد القضبان الحديدية — سلاح مفيد',
        next: 'h_upper_hall',
        effects: { hasIron: true, fear: 1 },
      },
      {
        id: 'h_b1_other',
        en: () => 'Try the other bedroom doors',
        ar: () => 'جرب أبواب غرف النوم الأخرى',
        next: 'h_upper_hall',
        effects: { fear: 1 },
      },
      {
        id: 'h_b1_down',
        en: () => 'Go back downstairs — find more answers',
        ar: () => 'عد إلى الأسفل — اجد المزيد من الإجابات',
        next: 'h_foyer',
        effects: { fear: 0 },
      },
    ],
  },

  // ── RED DOOR OPEN ──────────────────────────────────────────────────────────────
  {
    id: 'h_red_door_open',
    en: (v) =>
      `The red key turns. The door swings open on silent hinges.\n\nThe room is small. The wallpaper — deep red, floral — is peeling. A rocking chair faces a large mirror, floor to ceiling, in an ornate iron frame.\n\nIn the rocking chair sits a woman. She turns as you enter. Her face is—\n\nYour face. Older. More exhausted. But yours. Your hair, your eyes, your jaw.\n\n${v.names?.auntName ?? "She"} says your name. Your real one. The one ${v.names?.shadowName ?? 'The Shadow'} took. You feel it slot back into place like a key.\n\n"I didn't know if you would remember yourself," she says. "It took mine. Did it take yours?"`,
    ar: (v) =>
      `المفتاح الأحمر يدور. الباب ينفتح على مفصلات صامتة.\n\nالغرفة صغيرة. ورق الجدران — أحمر عميق، ذو زهور — يتقشر. كرسي هزاز يواجه مرآة كبيرة، من الأرض إلى السقف، في إطار حديدي مزخرف.\n\nفي الكرسي الهزاز تجلس امرأة. تدور حين تدخل. وجهها—\n\nوجهك. أكبر سنًا. أكثر إرهاقًا. لكنه وجهك. شعرك، عيناك، فكّك.\n\n${v.names?.auntName ?? "تقول"} اسمك. اسمك الحقيقي. ذلك الذي أخذه ${v.names?.shadowName ?? 'الظل'}. تشعر به يعود إلى مكانه كمفتاح.\n\n"لم أكن أعرف إذا كنت ستتذكر نفسك،" تقول. "أخذ اسمي. هل أخذ اسمك؟"`,
    choices: [
      {
        id: 'h_rdo_yes',
        en: () => 'Yes. It took my name. Tell me how to end this.',
        ar: () => 'نعم. أخذ اسمي. أخبرني كيف أنهي هذا.',
        next: 'h_final_briefing',
        effects: { nameTaken: true, fear: 0 },
      },
      {
        id: 'h_rdo_no',
        en: () => 'No — I still have my name. What are you?',
        ar: () => 'لا — لا يزال لديّ اسمي. من أنت؟',
        next: 'h_aunt_reveal',
        effects: { fear: 0 },
      },
      {
        id: 'h_rdo_mirror',
        en: () => 'Look in the mirror — what does it show?',
        ar: () => 'انظر في المرآة — ماذا تُظهر؟',
        next: 'h_mirror_look',
        effects: { fear: 2 },
      },
      {
        id: 'h_rdo_secret_now',
        en: () => 'Ask her: "Am I dead? Have I been dead this whole time?"',
        ar: () => 'اسألها: "هل أنا ميت؟ هل كنت ميتًا طوال هذا الوقت؟"',
        next: 'h_secret_revelation',
        effects: { fear: 0, knowsSecret: true },
      },
    ],
  },

  {
    id: 'h_mirror_look',
    en: () =>
      `You look in the mirror.\n\nYou see yourself. Fine. Normal. That's what you expected.\n\nBut then — slowly — the reflection shifts. Not your face. Older. Thinner. Eyes that have been afraid for years.\n\nThe reflection raises one hand. Your hand doesn't move.\n\nIt mouths something. Three words. Your aunt's name. Then its own. Then yours.\n\nYou understand now. They are the same name. Separated by ten years and what a house can do to a person over a decade of haunting.`,
    ar: () =>
      `تنظر في المرآة.\n\nترى نفسك. بخير. طبيعي. ذلك ما توقعته.\n\nلكن ببطء — يتحول الانعكاس. ليس وجهك. أكبر سنًا. أنحف. عيون خائفة لسنوات.\n\nيرفع الانعكاس يدًا واحدة. يدك لا تتحرك.\n\nيتمتم بشيء. ثلاث كلمات. اسم عمتك. ثم اسمه. ثم اسمك.\n\nتفهم الآن. إنها نفس الاسم. مفصولة بعشر سنوات وما يمكن أن يفعله المنزل بشخص على مدار عقد من الملاحقة.`,
    choices: [
      {
        id: 'h_ml_secret',
        en: () => 'Confront reality — ask what this means',
        ar: () => 'واجه الواقع — اسأل ماذا يعني هذا',
        next: 'h_secret_revelation',
        effects: { knowsSecret: true },
      },
      {
        id: 'h_ml_basement',
        en: () => 'Enough — go to the basement and stop this',
        ar: () => 'يكفي — اذهب إلى القبو وأوقف هذا',
        next: 'h_final_briefing',
        effects: { knowsInvitation: true },
      },
      {
        id: 'h_ml_escape',
        en: () => 'Run — get out of this room and this house',
        ar: () => 'اجرِ — اخرج من هذه الغرفة وهذا المنزل',
        next: 'h_escape_run',
        effects: { fear: 3 },
      },
      {
        id: 'h_ml_smash',
        en: () => 'Smash the mirror',
        ar: () => 'حطم المرآة',
        next: 'h_mirror_smashed',
        effects: { fear: 2, sanity: -2 },
      },
    ],
  },

  {
    id: 'h_mirror_smashed',
    en: () =>
      `The mirror shatters. The woman in the chair does not flinch. But the house does — every door in the house slams at once. The temperature drops ten degrees in a second.\n\nAnd from the broken mirror, seven years bad luck crawls out. Just a feeling. An old saying become true.\n\nSomething changes in the air. A presence, angrier now.`,
    ar: () =>
      `المرآة تتحطم. المرأة في الكرسي لا تتزعزع. لكن المنزل يتزعزع — كل باب في المنزل يصطفق في آنٍ واحد. درجة الحرارة تنخفض عشر درجات في ثانية.\n\nومن المرآة المحطمة، سبع سنوات من سوء الحظ تزحف. مجرد إحساس. مثل قديم أصبح حقيقيًا.\n\nشيء ما يتغير في الهواء. حضور أكثر غضبًا الآن.`,
    choices: [
      {
        id: 'h_ms_run',
        en: () => 'Run to the basement — finish this now',
        ar: () => 'اجرِ إلى القبو — أنهِ هذا الآن',
        next: 'h_basement_fight',
        effects: { shadowAngry: true, fear: 3 },
      },
      {
        id: 'h_ms_aunt',
        en: () => 'Ask the woman what you just did',
        ar: () => 'اسأل المرأة ماذا فعلت للتو',
        next: 'h_aunt_reveal',
        effects: { shadowAngry: true, fear: 2 },
      },
      {
        id: 'h_ms_escape',
        en: () => 'Escape — get out NOW',
        ar: () => 'اهرب — اخرج الآن',
        next: 'h_escape_run',
        effects: { shadowAngry: true, fear: 4 },
      },
      {
        id: 'h_ms_iron',
        en: () => 'Grab a shard of the iron mirror frame as a weapon',
        ar: () => 'التقط شظية من إطار المرآة الحديدي كسلاح',
        next: 'h_basement_approach',
        effects: { hasIron: true, shadowAngry: true, fear: 2 },
      },
    ],
  },

  {
    id: 'h_aunt_reveal',
    en: (v) =>
      `"I'm what's left of ${v.names?.auntName ?? 'Mara'}," she says. "I told you that. But that's not all of what I am.\n\nI am also what's left of the one before me. And the one before her. This house has had many tenants. It consumes them slowly. What remains becomes part of the house's memory.\n\nYou entered this house. You may still be able to leave."\n\nHer eyes meet yours.\n\n"But you need to understand something first. To close the door, to send it back — you need to give it something. A name. Not yours. Not mine. A false one. That's the key the ritual requires. Not the iron key. A name."`,
    ar: (v) =>
      `"أنا ما تبقى من ${v.names?.auntName ?? 'مارا'}،" تقول. "أخبرتك بذلك. لكن هذا ليس كل ما أنا عليه.\n\nأنا أيضًا ما تبقى من التي سبقتني. والتي سبقتها. كان لهذا المنزل مستأجرون كثيرون. يستهلكهم ببطء. ما يبقى يصبح جزءًا من ذاكرة المنزل.\n\nدخلت هذا المنزل. ربما لا تزال قادرًا على المغادرة."\n\nعيناها تلتقيان بعينيك.\n\n"لكن تحتاج أن تفهم شيئًا أولًا. لإغلاق الباب، لإعادته — تحتاج إعطائه شيئًا. اسمًا. ليس اسمك. ليس اسمي. اسم مزيف. هذا هو المفتاح الذي يتطلبه الطقس. ليس المفتاح الحديدي. اسم."`,
    choices: [
      {
        id: 'h_ar_understand',
        en: () => 'I understand. Go to the basement with this knowledge.',
        ar: () => 'أفهم. اذهب إلى القبو بهذه المعرفة.',
        next: 'h_final_briefing',
        effects: { knowsFalseName: true, knowsInvitation: true, fear: 0 },
      },
      {
        id: 'h_ar_question',
        en: () => 'What false name? How does it work?',
        ar: () => 'أي اسم مزيف؟ كيف يعمل؟',
        next: 'h_ritual_explained',
        effects: { fear: 0 },
      },
      {
        id: 'h_ar_secret',
        en: () => 'You said "you may still be able to leave." What do you mean — MAY?',
        ar: () => 'قلت "ربما لا تزال قادرًا على المغادرة." ماذا تعني — ربما؟',
        next: 'h_secret_revelation',
        effects: { knowsSecret: true, fear: 1 },
      },
      {
        id: 'h_ar_escape',
        en: () => 'No rituals — just run',
        ar: () => 'لا طقوس — فقط اجرِ',
        next: 'h_escape_run',
        effects: { fear: 2 },
      },
    ],
  },

  {
    id: 'h_ritual_explained',
    en: () =>
      `"The ritual that invites it is also the ritual that banishes it. But reversed.\n\nInstead of writing a name and burning it at the threshold to call it — you write a false name, go to the half-burned card in the basement, and complete the burning. While it burns, say the false name aloud. The entity will reach for the name — and find only the false one. It will take it. And be trapped in it. And the door will close.\n\nBut it has to believe the name is real. You have to believe it is.\n\nChoose a name. Any name. One that means something to you. And go."`,
    ar: () =>
      `"الطقس الذي يدعوه هو نفس الطقس الذي يطرده. لكن معكوسًا.\n\nبدلًا من كتابة اسم وحرقه عند العتبة لاستدعائه — تكتب اسمًا مزيفًا، وتذهب إلى البطاقة نصف المحترقة في القبو، وتكمل الحرق. أثناء حرقها، انطق الاسم المزيف بصوت عالٍ. الكيان سيمد يده نحو الاسم — ولن يجد سوى المزيف. سيأخذه. وسيُسجن فيه. والباب سيغلق.\n\nلكن يجب أن يؤمن بأن الاسم حقيقي. يجب أن تؤمن أنت بذلك.\n\naختر اسمًا. أي اسم. اسم يعني شيئًا لك. واذهب."`,
    choices: [
      {
        id: 'h_re_basement',
        en: () => 'Go to the basement now — you\'re ready',
        ar: () => 'اذهب إلى القبو الآن — أنت مستعد',
        next: 'h_final_briefing',
        effects: { knowsFalseName: true, knowsInvitation: true, knowsRitual: true, fear: 0 },
      },
      {
        id: 'h_re_outside',
        en: () => 'Enter from outside via the storm cellar',
        ar: () => 'ادخل من الخارج عبر قبو العاصفة',
        next: 'h_cellar_outside',
        effects: { knowsFalseName: true, knowsInvitation: true, knowsRitual: true, fear: 0 },
      },
      {
        id: 'h_re_iron',
        en: () => 'Get iron protection first',
        ar: () => 'احصل على حماية حديدية أولًا',
        next: 'h_aunt_help',
        effects: { knowsFalseName: true, knowsInvitation: true, knowsRitual: true, fear: 0 },
      },
      {
        id: 'h_re_secret',
        en: () => 'One more question — about MY nature',
        ar: () => 'سؤال أخير — عن طبيعتي أنا',
        next: 'h_secret_revelation',
        effects: { knowsSecret: true, knowsFalseName: true, knowsRitual: true },
      },
    ],
  },

  // Final briefing before basement climax
  {
    id: 'h_final_briefing',
    en: (v) =>
      `You stand at the top of the basement stairs.\n\nYou have what you need — or most of it. The air below is cold and alive with wrongness. You can feel ${v.names?.shadowName ?? 'The Shadow'} down there. Waiting at its threshold.\n\nYou run a mental checklist:\n${v.hasIron ? '✓ Iron — for repelling it\n' : '✗ No iron — you\'re vulnerable\n'}${v.hasLamp || v.hasMatches ? '✓ Light source — it will drive it back\n' : '✗ No light — darkness will be its ally\n'}${v.knowsRitual || v.knowsInvitation ? '✓ You know the ritual — give it a false name\n' : '✗ You\'re not sure what to do at the bottom\n'}\n\nThe stairs crack under your first step.`,
    ar: (v) =>
      `تقف عند قمة درج القبو.\n\nلديك ما تحتاجه — أو معظمه. الهواء في الأسفل بارد ومليء بالخطأ. تستطيع الشعور بـ${v.names?.shadowName ?? 'الظل'} هناك. ينتظر عند عتبته.\n\nتجري قائمة تفتيش ذهنية:\n${v.hasIron ? '✓ حديد — لصده\n' : '✗ لا حديد — أنت معرض للخطر\n'}${v.hasLamp || v.hasMatches ? '✓ مصدر ضوء — سيدفعه للخلف\n' : '✗ لا ضوء — الظلام سيكون حليفه\n'}${v.knowsRitual || v.knowsInvitation ? '✓ تعرف الطقس — أعطِه اسمًا مزيفًا\n' : '✗ لست متأكدًا مما يجب فعله في الأسفل\n'}\n\nالدرج يطقطق تحت خطوتك الأولى.`,
    choices: [
      {
        id: 'h_fb_descend',
        en: () => 'Descend steadily — don\'t rush',
        ar: () => 'انزل بثبات — لا تتسرع',
        next: 'h_basement_fight',
        effects: {},
      },
      {
        id: 'h_fb_iron_check',
        en: () => 'I need iron before I go down',
        ar: () => 'أحتاج حديدًا قبل النزول',
        next: 'h_aunt_help',
        condition: (v) => !v.hasIron,
        lockedEn: 'You already have iron',
        lockedAr: 'لديك حديد بالفعل',
      },
      {
        id: 'h_fb_run',
        en: () => 'Run — sprint down and be done with it',
        ar: () => 'اجرِ — انطلق للأسفل وخلّصها',
        next: 'h_basement_fight',
        effects: { fear: 1 },
      },
      {
        id: 'h_fb_escape',
        en: () => 'Change your mind — escape instead',
        ar: () => 'غير رأيك — اهرب بدلًا من ذلك',
        next: 'h_escape_run',
        effects: { fear: 1 },
      },
    ],
  },

  // ── BASEMENT CLIMAX ───────────────────────────────────────────────────────────
  {
    id: 'h_basement_approach',
    en: (v) =>
      `The basement is a single long room with a low ceiling. Every step echoes.\n\nAt the far end: the door. Heavy iron hinges, bound in old chain. Above it, on the ledge — a piece of scorched card, barely larger than a business card. The invitation.\n\n${v.names?.shadowName ?? 'The Shadow'} is here. It coalesces from the darkness near the door, tall, wrong, its faceless head tilting as you approach.\n\nThe frozen air feels like pressure against your lungs. You have maybe thirty seconds before it reaches you.`,
    ar: (v) =>
      `القبو غرفة طويلة منخفضة السقف. كل خطوة تتردد صداها.\n\nفي الطرف البعيد: الباب. مفصلات حديدية ثقيلة، مربوطة بسلسلة قديمة. فوقه، على الحافة — قطعة بطاقة محترقة، بالكاد أكبر من بطاقة العمل. الدعوة.\n\n${v.names?.shadowName ?? 'الظل'} هنا. يتكثف من الظلام بالقرب من الباب، طويل، خاطئ، رأسه الذي لا وجه له يميل حين تقترب.\n\nالهواء المتجمد يشعر كضغط على رئتيك. أمامك ثلاثون ثانية ربما قبل أن يصلك.`,
    choices: [
      {
        id: 'h_ba_iron',
        en: () => 'Raise the iron and advance toward the door',
        ar: () => 'ارفع الحديد وتقدم نحو الباب',
        next: 'h_basement_fight',
        condition: (v) => v.hasIron,
        lockedEn: 'You have no iron — advancing unarmed is suicide',
        lockedAr: 'ليس لديك حديد — التقدم أعزل انتحار',
        effects: { fear: 2 },
      },
      {
        id: 'h_ba_light',
        en: () => 'Light the lamp and point it at the Shadow',
        ar: () => 'أضئ المصباح وأشر به نحو الظل',
        next: 'h_basement_fight',
        condition: (v) => v.hasLamp || v.hasMatches,
        lockedEn: 'You have no light source',
        lockedAr: 'ليس لديك مصدر ضوء',
        effects: { fear: 1 },
      },
      {
        id: 'h_ba_rush',
        en: () => 'Sprint past the Shadow for the ledge — don\'t stop',
        ar: () => 'اجرِ متجاوزًا الظل نحو الحافة — لا تتوقف',
        next: 'h_basement_fight',
        effects: { fear: 3, sanity: -1 },
      },
      {
        id: 'h_ba_speak',
        en: (v) => `Shout the false name — speak it NOW: "${v.usedFalseName ? 'your false name' : 'a name you choose'}"`,
        ar: (v) => `اصرخ بالاسم المزيف — انطقه الآن: "${v.usedFalseName ? 'اسمك المزيف' : 'اسم تختاره'}"`,
        next: 'h_banishment',
        condition: (v) => v.knowsRitual || v.knowsFalseName,
        lockedEn: 'You don\'t know the ritual yet',
        lockedAr: 'لا تعرف الطقس بعد',
        effects: { fear: 0 },
      },
    ],
  },

  {
    id: 'h_basement_fight',
    en: (v) =>
      `${v.names?.shadowName ?? 'The Shadow'} lunges.\n\n${v.hasIron ? 'You swing the iron. It connects. The Shadow tears backward, that radio-static shriek, collapses against the wall — but it doesn\'t stop. It reforms. Slower. But it reforms.' : 'Without iron, you duck — it passes through you like ice water flooding your chest. You can\'t breathe. But you\'re still moving.'}\n\n${v.hasLamp || v.hasMatches ? 'You strike a match, hold the flame up. The Shadow retreats — just three steps — hissing.' : ''}\n\nThe ledge. Five feet away. The scorched card is right there.\n\nYou can see it. The ink is still readable — a name. Not yours. A name your aunt gave it.`,
    ar: (v) =>
      `${v.names?.shadowName ?? 'الظل'} يندفع.\n\n${v.hasIron ? 'تأرجح الحديد. يتصل. يرتد الظل للخلف، ذلك الصراخ كتشويش الراديو، ينهار على الحائط — لكنه لا يتوقف. يعيد تشكيل نفسه. أبطأ. لكنه يعيد تشكيل نفسه.' : 'بلا حديد، تنحني — يمر خلالك كماء جليدي يفيض في صدرك. لا تستطيع التنفس. لكنك لا تزال تتحرك.'}\n\n${v.hasLamp || v.hasMatches ? 'تشعل عود ثقاب، ترفع اللهب. يتراجع الظل — ثلاث خطوات فقط — يفحّ.' : ''}\n\nالحافة. خمسة أقدام. البطاقة المحترقة هناك بالضبط.\n\nيمكنك رؤيتها. الحبر لا يزال مقروءًا — اسم. ليس اسمك. اسم أعطته إياه عمتك.`,
    choices: [
      {
        id: 'h_bf_grab_burn',
        en: () => 'Grab the card and burn it — say the false name as it burns',
        ar: () => 'التقط البطاقة وأحرقها — انطق الاسم المزيف وهي تحترق',
        next: 'h_banishment',
        condition: (v) => v.knowsInvitation || v.knowsRitual || v.knowsFalseName,
        lockedEn: 'You don\'t know what to do with the card',
        lockedAr: 'لا تعرف ماذا تفعل بالبطاقة',
        effects: {},
      },
      {
        id: 'h_bf_grab_run',
        en: () => 'Grab the card and run for the exit — burn it outside',
        ar: () => 'التقط البطاقة واجرِ نحو المخرج — أحرقها في الخارج',
        next: 'h_banishment',
        condition: (v) => v.hasMatches || v.hasLamp,
        lockedEn: 'You have nothing to light it with',
        lockedAr: 'ليس لديك ما تشعله به',
        effects: { fear: 2 },
      },
      {
        id: 'h_bf_iron_push',
        en: () => 'Buy time with the iron — hold the Shadow back while you reach the ledge',
        ar: () => 'اكسب وقتًا بالحديد — أبقِ الظل بعيدًا بينما تصل إلى الحافة',
        next: 'h_banishment',
        condition: (v) => v.hasIron && (v.knowsInvitation || v.knowsRitual),
        lockedEn: 'You need iron AND knowledge of the ritual',
        lockedAr: 'تحتاج حديدًا ومعرفة بالطقس',
        effects: { fear: 2 },
      },
      {
        id: 'h_bf_overwhelmed',
        en: () => 'You can\'t reach it — the Shadow is too close. You give in.',
        ar: () => 'لا تستطيع الوصول إليه — الظل قريب جدًا. تستسلم.',
        next: 'h_possession_path',
        effects: { fear: 0, sanity: -10 },
      },
    ],
  },

  // ── ESCAPE PATH ───────────────────────────────────────────────────────────────
  {
    id: 'h_escape_attempt_early',
    en: () =>
      `You get in your car. Keys in. Engine—\n\nThe engine won't start. It clicks. Clicks. Dies.\n\nYou look up. The house stands at the end of the road, dark windows. All dark except one — upper floor, far left. A pale glow. Not red. White.\n\nAnd standing in the road behind your car, blocking the way out, is a shape. Tall. Wrong. Waiting.\n\nYou cannot leave. Not without ending it.`,
    ar: () =>
      `تجلس في سيارتك. المفاتيح في القفل. المحرك—\n\nالمحرك لن يبدأ. ينقر. ينقر. يموت.\n\nترفع رأسك. المنزل يقف في نهاية الطريق، نوافذ مظلمة. كلها مظلمة إلا واحدة — الطابق العلوي، أقصى اليسار. ضوء شاحب. ليس أحمر. أبيض.\n\nوفي الطريق خلف سيارتك، يعيق الخروج، شكل ما. طويل. خاطئ. ينتظر.\n\nلا تستطيع المغادرة. ليس دون إنهائه.`,
    choices: [
      {
        id: 'h_eae_foyer',
        en: () => 'Enter the house — face this',
        ar: () => 'ادخل المنزل — واجه هذا',
        next: 'h_foyer',
        effects: { fear: 3 },
      },
      {
        id: 'h_eae_cellar',
        en: () => 'Go around the back — storm cellar',
        ar: () => 'اذهب حول الجانب الخلفي — قبو العاصفة',
        next: 'h_cellar_outside',
        effects: { fear: 2 },
      },
      {
        id: 'h_eae_confront',
        en: () => 'Walk toward the shape in the road',
        ar: () => 'تقدم نحو الشكل في الطريق',
        next: 'h_shadow_confront',
        effects: { fear: 4 },
      },
      {
        id: 'h_eae_study',
        en: () => 'Enter and go straight to the study — you need information',
        ar: () => 'ادخل وتوجه مباشرة إلى الدراسة — تحتاج معلومات',
        next: 'h_study',
        effects: { fear: 2 },
      },
    ],
  },

  {
    id: 'h_escape_run',
    en: (v) =>
      `You run.\n\nFront door, if it opens — out. Windows if not. You don't stop moving. The house seems to stretch as you run — hallways longer, stairs twisting. But you keep going.\n\nYou burst through the front door. Cold air. Real air. Stars.\n\nYour car starts this time.\n\nYou drive. You don't look back. Not once.\n\n${v.knowsSecret ? '\nBut you can\'t stop thinking about what the mirror showed you. What the voice told you. And you realize, miles later, that you can\'t remember if you ever called anyone before you arrived. You can\'t remember the last five years clearly. You can\'t remember your own address.\n\nYou are driving. And you don\'t know where you\'re going.' : '\nBehind you, 14 Hollow Lane sits silent and dark. The red glow in the upper window fades.\n\nYou left it unsolved. The Shadow is still in there. Waiting for whoever inherits next.'}\n\n${v.knowsSecret ? '' : 'You survived. But you did not end it.'}`,
    ar: (v) =>
      `تجري.\n\nالباب الأمامي، إذا فتح — للخارج. النوافذ إن لم يفتح. لا تتوقف عن التحرك. يبدو المنزل وكأنه يتمدد حين تجري — ممرات أطول، درج يلتوي. لكنك تواصل المضي قدمًا.\n\nاندفعت من الباب الأمامي. هواء بارد. هواء حقيقي. نجوم.\n\nسيارتك تعمل هذه المرة.\n\nتقود. لا تنظر للخلف. ولا مرة واحدة.\n\n${v.knowsSecret ? '\nلكن لا تستطيع التوقف عن التفكير في ما أظهرته المرآة. ما أخبرك به الصوت. وتدرك، بعد أميال، أنك لا تتذكر إذا اتصلت بأي شخص قبل وصولك. لا تتذكر السنوات الخمس الأخيرة بوضوح. لا تتذكر عنوانك الخاص.\n\nأنت تقود. ولا تعرف أين تذهب.' : '\nخلفك، يجلس منزل 14 هولو لين ساكتًا ومظلمًا. الضوء الأحمر في النافذة العلوية يتلاشى.\n\nتركته دون حل. الظل لا يزال هناك. ينتظر من سيرثه لاحقًا.'}\n\n${v.knowsSecret ? '' : 'نجوت. لكنك لم تنهه.'}`,
    isEnding: true,
    endingType: (v) => v.knowsSecret ? 'secret' : 'failure',
  },

  {
    id: 'h_window_break',
    en: () =>
      `You grab a chair and heave it through the window. Glass explodes outward. Cold air rushes in.\n\nBehind you, heavy footsteps on the stairs. Getting faster.\n\nYou climb through the broken window, cut your palm on glass, land in the dead grass. You run. Your car. Keys. Engine.\n\nIt starts. Barely. You drive.`,
    ar: () =>
      `تمسك كرسيًا وترميه بعنف خلال النافذة. الزجاج ينفجر للخارج. هواء بارد يتدفق للداخل.\n\nخلفك، خطوات ثقيلة على الدرج. تتسارع.\n\nتتسلق خلال النافذة المكسورة، تقطع راحة يدك على الزجاج، تهبط في العشب الميت. تجري. سيارتك. المفاتيح. المحرك.\n\nيعمل. بالكاد. تقود.`,
    isEnding: true,
    endingType: 'failure',
  },

  // ── POSSESSION PATH ────────────────────────────────────────────────────────────
  {
    id: 'h_possession_path',
    en: (v) =>
      `You stop fighting.\n\n${v.names?.shadowName ?? 'The Shadow'} stops. Turns its face — its non-face — toward you. Waiting.\n\nYou feel it enter you not like cold or pain but like a sentence being completed. Like a lock clicking shut. Your thoughts narrow. The house feels less wrong suddenly. More like home.\n\nYou have a lot of work to do. The deed needs updating. The portrait in the foyer needs a new face. The house needs a new tenant.\n\nFrom the red room, a voice screams and screams and is quickly, definitively silenced.`,
    ar: (v) =>
      `تتوقف عن القتال.\n\n${v.names?.shadowName ?? 'الظل'} يتوقف. يلتفت وجهه — غير وجهه — نحوك. ينتظر.\n\nتشعر به يدخلك ليس كبرودة أو ألم بل كجملة تكتمل. كقفل ينغلق بنقرة. أفكارك تضيق. المنزل يشعر بأنه أقل خطأً فجأة. أشبه بالبيت.\n\nلديك الكثير من العمل لتفعله. سند الملكية يحتاج تحديثًا. اللوحة في الردهة تحتاج وجهًا جديدًا. المنزل يحتاج مستأجرًا جديدًا.\n\nمن الغرفة الحمراء، صوت يصرخ ويصرخ ويُسكت بسرعة، بشكل قاطع.`,
    isEnding: true,
    endingType: 'death',
  },

  // ── BANISHMENT (SUCCESS) ───────────────────────────────────────────────────────
  {
    id: 'h_banishment',
    en: (v) =>
      `Your fingers close around the scorched card.\n\nIron or light or sheer desperate momentum — you made it.\n\nYou strike the match. Hold flame to card. It catches — the half that remains, the corner with the inked name, your aunt's cramped writing — it burns.\n\nYou shout a name in the smoke. Not yours. Not your aunt's. A name you chose. A name you gave it.\n\n"${v.usedFalseName ? 'Your false name' : 'The name you chose'}!"\n\n${v.names?.shadowName ?? 'The Shadow'} SCREAMS. It lunges for the sound. For the name. And it takes it. Disappears into the burning card like smoke.\n\nThe card becomes ash.\n\nThe door seals. The chain locks itself. The temperature rises twenty degrees in five seconds.\n\nThe house is quiet.\n\nYou stand in the basement with ash on your fingers and your name still yours.`,
    ar: (v) =>
      `أصابعك تنغلق حول البطاقة المحترقة.\n\nحديد أو ضوء أو زخم يائس — وصلت.\n\nتشعل عود الثقاب. تضع اللهب على البطاقة. تشتعل — النصف الذي تبقى، الزاوية بالاسم المحبر، خط عمتك المتداخل — يحترق.\n\nتصرخ باسم في الدخان. ليس اسمك. ليس اسم عمتك. اسم اخترته. اسم أعطيته إياه.\n\n"${v.usedFalseName ? 'اسمك المزيف' : 'الاسم الذي اخترته'}!"\n\n${v.names?.shadowName ?? 'الظل'} يصرخ. ينطلق نحو الصوت. نحو الاسم. ويأخذه. يختفي في البطاقة المحترقة كالدخان.\n\nتصبح البطاقة رمادًا.\n\nالباب ينغلق. السلسلة تقفل نفسها. درجة الحرارة ترتفع عشرين درجة في خمس ثوانٍ.\n\nالمنزل هادئ.\n\nتقف في القبو والرماد على أصابعك واسمك لا يزال ملكك.`,
    choices: [
      {
        id: 'h_ban_check_red',
        en: () => 'Go upstairs — check the red room',
        ar: () => 'اصعد — تحقق من الغرفة الحمراء',
        next: 'h_ending_success',
        effects: {},
      },
      {
        id: 'h_ban_leave',
        en: () => 'Walk out of this house and never return',
        ar: () => 'غادر هذا المنزل ولا تعد أبدًا',
        next: 'h_ending_success',
        effects: {},
      },
      {
        id: 'h_ban_explore',
        en: () => 'Search the house now that it\'s safe — there\'s still so much you don\'t know',
        ar: () => 'فتش المنزل الآن وقد أصبح آمنًا — لا يزال هناك الكثير لا تعرفه',
        next: 'h_ending_secret_explore',
        effects: {},
      },
      {
        id: 'h_ban_aunt',
        en: () => 'Call out to your aunt — is she free now?',
        ar: () => 'نادِ عمتك — هل هي حرة الآن؟',
        next: 'h_ending_success',
        effects: {},
      },
    ],
  },

  // ── SECRET REVELATION ─────────────────────────────────────────────────────────
  {
    id: 'h_secret_revelation',
    en: (v) =>
      `"I need to show you something," ${v.names?.auntName ?? 'she'} says.\n\nShe holds out a photograph. Old, creased. It takes you a moment to understand what you're looking at.\n\nA woman standing on the front steps of this house. Smiling. Young.\n\nYou.\n\nBut the photograph is dated — a year handwritten in the corner. Eleven years ago.\n\nYou were here eleven years ago. You don't remember this. You have no memory of this photograph being taken. No memory of this trip.\n\nBecause you never left.\n\n"You came for the same reason," she says. "A letter. A lawyer. An inheritance. It took you the first week. You've been here ever since, dreaming that you just arrived."\n\nYour hands. You look at them. You can't feel the temperature anymore. You realize you haven't felt hungry since you arrived. You haven't slept.\n\nYou are not the visitor.\n\nYou are the house.`,
    ar: (v) =>
      `"أحتاج أن أريك شيئًا،" تقول ${v.names?.auntName ?? 'هي'}.\n\nتمد صورة. قديمة، متجعدة. تحتاج لحظة لتفهم ما تنظر إليه.\n\nامرأة واقفة على الدرج الأمامي لهذا المنزل. تبتسم. شابة.\n\nأنت.\n\nلكن الصورة مؤرخة — سنة مكتوبة بالخط في الزاوية. قبل إحدى عشرة سنة.\n\nكنت هنا قبل إحدى عشرة سنة. لا تتذكر هذا. ليس لديك أي ذكرى لالتقاط هذه الصورة. لا ذكرى لهذه الرحلة.\n\nلأنك لم تغادر أبدًا.\n\n"جئت للسبب نفسه،" تقول. "رسالة. محامٍ. إرث. أخذك في الأسبوع الأول. لقد كنت هنا منذ ذلك الحين، تحلم بأنك وصلت للتو."\n\nيداك. تنظر إليهما. لا تشعر بدرجة الحرارة بعد الآن. تدرك أنك لم تشعر بالجوع منذ وصلت. لم تنم.\n\nأنت لست الزائر.\n\nأنت المنزل.`,
    choices: [
      {
        id: 'h_sr_accept_end',
        en: () => 'Accept this. Let the house be what it is. Become part of it.',
        ar: () => 'اقبل هذا. دع المنزل يكون ما هو. صر جزءًا منه.',
        next: 'h_ending_secret',
        effects: {},
      },
      {
        id: 'h_sr_fight',
        en: () => 'Refuse. If you\'re a residue, you still have agency. Fight for your freedom.',
        ar: () => 'ارفض. إذا كنت رسوبًا، لا يزال لديك إرادة. قاتل من أجل حريتك.',
        next: 'h_final_briefing',
        effects: { knowsSecret: true, knowsInvitation: true, knowsRitual: true, knowsFalseName: true },
      },
      {
        id: 'h_sr_ask_how',
        en: () => 'Ask how — if you\'re part of the house, how do you stop it from doing this to others?',
        ar: () => 'اسأل كيف — إذا كنت جزءًا من المنزل، كيف توقفه عن فعل هذا لآخرين؟',
        next: 'h_ending_secret_explore',
        effects: { knowsSecret: true },
      },
      {
        id: 'h_sr_run_anyway',
        en: () => 'Run. Even if you\'re not real — run anyway.',
        ar: () => 'اجرِ. حتى لو لم تكن حقيقيًا — اجرِ على أي حال.',
        next: 'h_escape_run',
        effects: { knowsSecret: true, fear: 2 },
      },
    ],
  },

  // ── ENDINGS ───────────────────────────────────────────────────────────────────
  {
    id: 'h_ending_success',
    en: (v) =>
      `You walk out of 14 Hollow Lane at 5:47 AM.\n\nThe sky is beginning to lighten. The dead oaks stand motionless — just trees now. The house is dark — just a house.\n\nIn the red room, you heard your aunt's voice say: "Thank you." Then nothing. The house released what it held.\n\nYou drive to the nearest town. You go to the police. You tell them everything — they don't believe you, but they do find six names carved into the foundation of the basement. Six people who inherited the house before ${v.names?.auntName ?? 'your aunt'}.\n\nThe house is condemned three months later. You sell the deed for one dollar to the county.\n\nYou sleep without dreaming for the first time in your life.`,
    ar: (v) =>
      `تغادر منزل 14 هولو لين عند الساعة 5:47 صباحًا.\n\nالسماء تبدأ بالإضاءة. أشجار البلوط الميتة ساكنة — مجرد أشجار الآن. المنزل مظلم — مجرد منزل.\n\nفي الغرفة الحمراء، سمعت صوت عمتك يقول: "شكرًا لك." ثم لا شيء. المنزل أطلق ما كان يحمله.\n\nتقود إلى أقرب مدينة. تذهب إلى الشرطة. تخبرهم بكل شيء — لا يصدقونك، لكنهم يجدون ستة أسماء محفورة في أساس القبو. ستة أشخاص ورثوا المنزل قبل ${v.names?.auntName ?? 'عمتك'}.\n\nيُحكم على المنزل بالهدم بعد ثلاثة أشهر. تبيع سند الملكية بدولار واحد للمقاطعة.\n\nتنام دون أحلام للمرة الأولى في حياتك.`,
    isEnding: true,
    endingType: 'success',
  },

  {
    id: 'h_ending_secret_explore',
    en: (v) =>
      `You understand now.\n\nYou are what the house keeps. A residue. A memory of a person who came here and did not leave.\n\nBut you have something the others didn't: you know what you are.\n\nAnd that changes everything.\n\n${v.names?.auntName ?? 'Your aunt'} sits in the red room still. She looks up at you. She is older than time.\n\n"You figured it out," she says.\n\n"I did. And I'm going to find a way to free us both."\n\nShe smiles — the first real smile you've seen in this house.\n\n"Good," she says. "Then let's get to work."\n\nThe house still stands at 14 Hollow Lane. But what lives in it now is different. It is learning how to resist being what it was made to be.\n\nAnd somewhere in its walls, two voices are planning something.`,
    ar: (v) =>
      `تفهم الآن.\n\nأنت ما يحتفظ به المنزل. رسوب. ذكرى شخص جاء إلى هنا ولم يغادر.\n\nلكن لديك شيء لم يكن لدى الآخرين: تعرف ما أنت عليه.\n\nوهذا يغير كل شيء.\n\n${v.names?.auntName ?? 'عمتك'} تجلس في الغرفة الحمراء ما زالت. ترفع نظرها إليك. إنها أكبر من الزمن.\n\n"اكتشفت الأمر،" تقول.\n\n"نعم. وسأجد طريقة لتحرير كلينا."\n\nتبتسم — أول ابتسامة حقيقية رأيتها في هذا المنزل.\n\n"جيد،" تقول. "إذن فلنبدأ العمل."\n\nالمنزل لا يزال قائمًا في 14 هولو لين. لكن ما يسكنه الآن مختلف. إنه يتعلم كيف يقاوم ما صُنع ليكون عليه.\n\nوفي مكان ما في جدرانه، صوتان يخططان لشيء ما.`,
    isEnding: true,
    endingType: 'secret',
  },

  {
    id: 'h_ending_secret',
    en: () =>
      `You stop fighting.\n\nNot the way you surrendered before — not to the Shadow. You stop fighting what you are.\n\nYou let the house remember you. Fully. Every version of yourself that walked these halls — arriving, exploring, afraid, determined — becomes part of the record.\n\nThe house is vast, inside. More than the walls suggest. Infinite, almost.\n\nAnd in it, you find them. All of them. Every person this house ever consumed. Not dead. Not exactly. Waiting.\n\nYou have your name back now. And something like agency.\n\nThe next person who inherits 14 Hollow Lane will find a house that feels... guided. That seems to want something from them. That opens the right doors.\n\nThat is not trying to trap them.\n\nThat is trying to warn them.`,
    ar: () =>
      `تتوقف عن القتال.\n\nليس بالطريقة التي استسلمت بها من قبل — ليس للظل. تتوقف عن مقاومة ما أنت عليه.\n\nتدع المنزل يتذكرك. بالكامل. كل نسخة منك مشت في هذه الأروقة — وصول، استكشاف، خوف، تصميم — تصبح جزءًا من السجل.\n\nالمنزل واسع من الداخل. أكثر مما تقترح الجدران. لا نهائي تقريبًا.\n\nوفيه تجدهم. جميعهم. كل شخص استهلكه هذا المنزل. ليسوا أمواتًا. ليس تمامًا. ينتظرون.\n\nلديك اسمك الآن. وشيء يشبه الإرادة.\n\nالشخص التالي الذي يرث منزل 14 هولو لين سيجد منزلًا يشعر... بأنه موجَّه. يبدو كأنه يريد شيئًا منهم. يفتح الأبواب الصحيحة.\n\nغير أنه لا يحاول إيقادهم.\n\nإنه يحاول تحذيرهم.`,
    isEnding: true,
    endingType: 'secret',
  },

  // Remaining utility nodes
  {
    id: 'h_find_red_door',
    en: () =>
      `With the key in hand and the map in mind, you navigate back upstairs. The red door at the end of the hall. You've found it.`,
    ar: () =>
      `بالمفتاح في يدك والخريطة في ذهنك، تتجه للأعلى مجددًا. الباب الأحمر في نهاية الممر. لقد وجدته.`,
    choices: [
      {
        id: 'h_frd_open',
        en: () => 'Open it with the red key',
        ar: () => 'افتحه بالمفتاح الأحمر',
        next: 'h_red_door_open',
        condition: (v) => v.hasRedKey,
        lockedEn: 'You need the red skeleton key from the desk drawer',
        lockedAr: 'تحتاج المفتاح الهيكلي الأحمر من درج المكتب',
      },
      {
        id: 'h_frd_listen',
        en: () => 'Listen at the door first',
        ar: () => 'استمع عند الباب أولًا',
        next: 'h_red_door_listen',
        effects: {},
      },
      {
        id: 'h_frd_basement',
        en: () => 'Actually — go to the basement first',
        ar: () => 'في الحقيقة — اذهب إلى القبو أولًا',
        next: 'h_basement_approach',
        effects: { fear: 1 },
      },
      {
        id: 'h_frd_knock',
        en: () => 'Knock',
        ar: () => 'اطرق',
        next: 'h_red_door_knock',
        effects: { fear: 1 },
      },
    ],
  },

  {
    id: 'h_red_door_knock',
    en: () =>
      `You knock. Three times.\n\nSilence. Then, very quietly, three knocks back. From inside.`,
    ar: () =>
      `تطرق. ثلاث مرات.\n\nصمت. ثم، بهدوء شديد، ثلاث دقات عائدة. من الداخل.`,
    choices: [
      {
        id: 'h_rdk_key',
        en: () => 'Open with the red key',
        ar: () => 'افتح بالمفتاح الأحمر',
        next: 'h_red_door_open',
        condition: (v) => v.hasRedKey,
        lockedEn: 'You need the red key',
        lockedAr: 'تحتاج المفتاح الأحمر',
      },
      {
        id: 'h_rdk_listen',
        en: () => 'Press your ear to the door',
        ar: () => 'ضع أذنك على الباب',
        next: 'h_red_door_listen',
        effects: {},
      },
      {
        id: 'h_rdk_basement',
        en: () => 'Leave the door and go to the basement',
        ar: () => 'اترك الباب واذهب إلى القبو',
        next: 'h_basement_approach',
        effects: {},
      },
      {
        id: 'h_rdk_study',
        en: () => 'Go get the key from the study',
        ar: () => 'اذهب للحصول على المفتاح من الدراسة',
        next: 'h_study',
        effects: {},
      },
    ],
  },

  {
    id: 'h_scratch_examine',
    en: () =>
      `You crouch low and trace the scratch marks with your flashlight.\n\nThey go up and up — not trying to climb the stairs. The marks go INTO the wall. Whatever made them was trying to escape INTO the structure of the house itself.\n\nOr... was trying to escape OUT of something within the structure.\n\nYou notice something in the grooves: traces of dried blood. Human.`,
    ar: () =>
      `تنحني منخفضًا وتتتبع الخدوش بمصباحك.\n\nتصعد وتصعد — ليست تحاول تسلق الدرج. الخدوش تدخل في الجدار. مهما كان الذي صنعها كان يحاول الهرب داخل هيكل المنزل نفسه.\n\nأو... كان يحاول الهرب من شيء ما داخل الهيكل.\n\nتلاحظ شيئًا في الأخاديد: آثار دم جاف. بشري.`,
    choices: [
      {
        id: 'h_se_left',
        en: () => 'Try the left door — study',
        ar: () => 'جرب الباب الأيسر — الدراسة',
        next: 'h_study',
        effects: { fear: 1 },
      },
      {
        id: 'h_se_up',
        en: () => 'Climb the stairs despite the marks',
        ar: () => 'اصعد الدرج رغم الخدوش',
        next: 'h_upper_hall',
        effects: { fear: 2 },
      },
      {
        id: 'h_se_hall',
        en: () => 'Go deeper through the hallway',
        ar: () => 'تقدم أعمق عبر الممر',
        next: 'h_kitchen',
        effects: { fear: 1 },
      },
      {
        id: 'h_se_outside',
        en: () => 'Go back outside — come in through the back',
        ar: () => 'عد للخارج — ادخل من الخلف',
        next: 'h_perimeter',
        effects: { fear: 1 },
      },
    ],
  },

  {
    id: 'h_photo_examine',
    en: () =>
      `You stare at the night photograph.\n\nThe figure beside your aunt has no face — but its posture is attentive. Curious. Like someone meeting their new host for the first time.\n\nYour aunt is smiling in the photo. A strained, braced smile. A smile for the camera. Not for the figure.\n\nYou notice something else: the figure's hand is resting on your aunt's shoulder. She is shaking. The blur of her shoulder is from trembling.`,
    ar: () =>
      `تحدق في صورة الليل.\n\nالشخصية بجانب عمتك لا وجه لها — لكن وضعها منتبه. فضولي. كشخص يقابل مضيفه الجديد للمرة الأولى.\n\nعمتك تبتسم في الصورة. ابتسامة متوترة، مشددة. ابتسامة للكاميرا. ليس للشخصية.\n\nتلاحظ شيئًا آخر: يد الشخصية مستقرة على كتف عمتك. إنها ترتجف. ضبابية كتفها جاء من الارتجاف.`,
    choices: [
      {
        id: 'h_pe_redkey',
        en: () => 'Take the red key and find the red door',
        ar: () => 'خذ المفتاح الأحمر واجد الباب الأحمر',
        next: 'h_find_red_door',
        condition: (v) => v.hasRedKey,
        lockedEn: 'You already have the key',
        lockedAr: 'المفتاح لديك بالفعل',
      },
      {
        id: 'h_pe_basement',
        en: () => 'Go to the basement',
        ar: () => 'اذهب إلى القبو',
        next: 'h_basement_approach',
        effects: { fear: 2 },
      },
      {
        id: 'h_pe_upstairs',
        en: () => 'Go upstairs — face the Shadow directly',
        ar: () => 'اصعد — واجه الظل مباشرة',
        next: 'h_upper_hall',
        effects: { fear: 2 },
      },
      {
        id: 'h_pe_journal',
        en: () => 'Read the journal entries',
        ar: () => 'اقرأ مدخلات اليومية',
        next: 'h_journal_read',
        effects: { fear: 0 },
      },
    ],
  },
];

const story_horror = {
  id: 'horror',
  theme: 'horror',
  startNode: 'h_start',
  initialVars: {
    fear: 0,
    sanity: 10,
    hasIron: false,
    hasLamp: false,
    hasMatches: false,
    hasRedKey: false,
    hasMap: false,
    readJournal: false,
    knowsWarning: false,
    knowsIron: false,
    knowsSecret: false,
    knowsInvitation: false,
    knowsRitual: false,
    knowsFalseName: false,
    knowsRealFalseName: false,
    usedFalseName: false,
    doorUnlocked: false,
    nameTaken: false,
    shadowWeakened: false,
    shadowAngry: false,
    shadowAware: false,
    heardsAunt: false,
    names: {},
  },
  nameRequests: {
    auntName: {
      promptEn: 'Your aunt\'s name appears in the deed. What was her name?',
      promptAr: 'اسم عمتك يظهر في وثيقة الملكية. ما كان اسمها؟',
    },
    shadowName: {
      promptEn: 'The entity has no name. What will you call it?',
      promptAr: 'الكيان ليس له اسم. ماذا ستسميه؟',
    },
  },
  nodes,
};

export default story_horror;
