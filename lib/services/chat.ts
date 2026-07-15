import type { ChatMessage, ChatRequest, ChatResponse, Language } from '@/lib/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ─── Mock Response Generator ──────────────────────────────────────────────

const mockResponses: Record<string, Record<Language, string>> = {
  resume: {
    en: `Great question! Let me help you with your resume. Here are some key tips to make your resume stand out:

**1. Tailor Your Resume for Each Job**
Customize your resume to match the specific job description. Highlight relevant skills and experiences that align with the role.

**2. Use Action Verbs**
Start bullet points with strong action verbs like "developed," "managed," "led," "implemented," and "achieved."

**3. Quantify Your Achievements**
Instead of saying "Improved sales," say "Increased sales by 35% in 6 months through targeted marketing campaigns."

**4. Keep It ATS-Friendly**
- Use standard section headings (Experience, Education, Skills)
- Avoid images, tables, and complex formatting
- Include relevant keywords from the job description
- Save as PDF format

**5. Structure It Well**
- Contact information at the top
- Professional summary (2-3 sentences)
- Work experience (most recent first)
- Education and certifications
- Skills section

Would you like me to review your specific resume or help you with a particular section?`,
    ha: `Tambaya mai kyau! Bari in taimake ka game da resume ɗinka. Ga wasu mahimman shawarwari don sanya resume ɗinka ya fice:

**1. Keɓance Resume ɗinka ga Kowane Aiki**
Keɓance resume ɗinka don dacewa da takamaiman bayanin aikin. Nuna ƙwarewar da ta dace da gogewar da ta dace da matsayin.

**2. Yi Amfani da Kalmomin Aiki**
Fara layuka da kalmomin aiki masu ƙarfi kamar "haɓaka," "sarrafa," "jagoranci," "aiwatar," da "cimma."

**3. Ƙididdige Nasarorin Ka**
Maimakon cewa "Inganta tallace-tallace," ka ce "Ƙara tallace-tallace da kashi 35% a cikin watanni 6 ta hanyar kamfen ɗin tallace-tallace."

**4. Kiyaye Shi Daidai da ATS**
- Yi amfani da taken sashe na yau da kullun
- Guji hotuna da teburi
- Haɗa kalmomin da suka dace daga bayanin aikin
- Ajiye azaman PDF

**5. Tsara Shi Da Kyau**
- Bayanin tuntuɓar a sama
- Taƙaitaccen ƙwararru
- Ƙwarewar aiki (na kwanan nan farko)
- Ilimi da takaddun shaida
- Sashen ƙwarewa

Kana son in sake duba takamaiman resume ɗinka ko in taimaka maka da wani sashe?`,
    yo: `Ibeere ti o dara! Jẹ ki n ran ọ lọwọ pẹlu resume rẹ. Eyi ni awọn imọran pataki lati jẹ ki resume rẹ dara julọ:

**1. Ṣe Atunṣe Resume Rẹ Fun Iṣẹ Kọọkan**
Ṣe atunṣe resume rẹ lati baamu apejuwe iṣẹ pato. Fi awọn ọgbọn ati iriri ti o yẹ han.

**2. Lo Awọn Ọrọ Iṣe**
Bẹrẹ awọn ila pẹlu awọn ọrọ iṣe ti o lagbara bi "dagbasoke," "ṣakoso," "ṣiwaju," "ṣe imuse," ati "ṣe aṣeyọri."

**3. Ṣe Iṣiro Awọn Aṣeyọri Rẹ**
Dipo sisọ "Mu awọn tita dara," sọ "Mu awọn tita pọ si nipasẹ 35% ni oṣu mẹfa nipasẹ awọn ipolongo titaja."

**4. Jẹ Ki O Jẹ Ọrẹ ATS**
- Lo awọn akọle apakan boṣewa
- Yago fun awọn aworan ati awọn tabili
- Fi awọn ọrọ pataki lati apejuwe iṣẹ kun
- Fipamọ bi PDF

**5. Ṣeto Rẹ Daradara**
- Alaye olubasọrọ ni oke
- Akopọ ọjọgbọn
- Iriri iṣẹ (ti o ṣẹṣẹ julọ ni akọkọ)
- Ẹkọ ati awọn iwe-ẹri
- Apakan awọn ọgbọn

Ṣe o fẹ ki n ṣayẹwo resume rẹ pato tabi ran ọ lọwọ pẹlu apakan kan pato?`,
    ig: `Ajụjụ dị mma! Ka m nyere gị aka gbasara resume gị. Nke a bụ ụfọdụ ndụmọdụ dị mkpa iji mee ka resume gị pụta ìhè:

**1. Hazie Resume Gị Maka Ọrụ Ọ Bụla**
Hazie resume gị ka ọ dabaa na nkọwa ọrụ ahụ. Gosi nkà na ahụmịhe ndị dị mkpa.

**2. Jiri Okwu Omume**
Bido ahịrịokwu na okwu omume siri ike dịka "mepụtara," "jikwaa," "duzie," "mejuputa," na "nweta."

**3. Gụpụta Ihe Ndị Ị Rụzuru**
Kama ịsị "Mere ka ahịa ka mma," sị "Mụbara ahịa site na 35% n'ime ọnwa isii site na mkpọsa ahịa."

**4. Mee Ka Ọ Bụrụ Enyi ATS**
- Jiri isiokwu ngalaba ọkọlọtọ
- Zere ihe oyiyi na tebụl
- Tinye okwu ndị dị mkpa site na nkọwa ọrụ
- Chekwaa dị ka PDF

**5. Hazie Ya Nke Ọma**
- Ozi kọntaktị n'elu
- Nchịkọta ọkachamara
- Ahụmịhe ọrụ (nke kachasị ọhụrụ na mbụ)
- Agụmakwụkwọ na asambodo
- Ngalaba nkà

Ị chọrọ ka m nyochaa resume gị kpọmkwem ma ọ bụ nyere gị aka na otu ngalaba?`,
  },
  skills: {
    en: `Excellent question! Based on current job market trends in Nigeria and across Africa, here are the most in-demand skills you should consider:

**Tech Skills:**
- **Cloud Computing** (AWS, Azure, GCP) — Huge demand across fintech and enterprises
- **Data Analysis & AI** (Python, SQL, Machine Learning) — Growing rapidly
- **Cybersecurity** — Critical as digital adoption increases
- **Full-Stack Development** (React, Node.js, TypeScript) — Always in demand
- **UI/UX Design** (Figma, user research) — Companies are prioritizing great experiences

**Soft Skills:**
- **Communication** — Written and verbal clarity
- **Problem-Solving** — Critical thinking and analytical reasoning
- **Adaptability** — The ability to learn new tools quickly
- **Leadership** — Even at junior levels, initiative matters

**Free Platforms to Learn:**
- **ALX Africa** — Free tech programs for African youth
- **Coursera** (audit mode) — Courses from top universities
- **freeCodeCamp** — Comprehensive coding curriculum
- **Google Digital Skills for Africa** — Free certifications
- **Udemy** (free courses section) — Various topics

Would you like me to create a personalized learning plan based on your career goals?`,
    ha: `Tambaya mai kyau! Dangane da yanayin kasuwar aiki na yanzu a Najeriya da Afirka, ga ƙwarewar da ake buƙata da ya kamata ka yi la'akari:

**Ƙwarewar Fasaha:**
- **Cloud Computing** (AWS, Azure, GCP) — Babban buƙata a fintech da kamfanoni
- **Data Analysis & AI** (Python, SQL, Machine Learning) — Girma cikin sauri
- **Cybersecurity** — Mai mahimmanci yayin da karɓar dijital ke ƙaruwa
- **Full-Stack Development** (React, Node.js, TypeScript) — Koyaushe ana buƙata
- **UI/UX Design** (Figma, binciken mai amfani) — Kamfanoni suna ba da fifiko ga ƙwarewa mai kyau

**Ƙwarewa Mai Laushi:**
- **Sadarwa** — Bayyananniyar rubutu da magana
- **Warware Matsala** — Tunani mai zurfi da tunani na nazari
- **Daidaitawa** — Ikon koyon sababbin kayan aiki cikin sauri
- **Jagoranci** — Ko da a matakin ƙarami, himma na da mahimmanci

**Dandamalin Kyauta don Koyo:**
- **ALX Africa** — Shirye-shiryen fasaha kyauta ga matasan Afirka
- **Coursera** (yanayin dubawa) — Darussan daga manyan jami'o'i
- **freeCodeCamp** — Cikakken tsarin koyon coding
- **Google Digital Skills for Africa** — Takaddun shaida kyauta

Kana son in ƙirƙira maka tsarin koyo na musamman bisa ga burin aikin ka?`,
    yo: `Ibeere ti o dara julọ! Da lori awọn aṣa ọja iṣẹ lọwọlọwọ ni Nigeria ati Afirika, eyi ni awọn ọgbọn ti a nilo julọ ti o yẹ ki o ronu:

**Awọn Ọgbọn Imọ-ẹrọ:**
- **Cloud Computing** (AWS, Azure, GCP) — Ibeere nla ni fintech ati awọn ile-iṣẹ
- **Data Analysis & AI** (Python, SQL, Machine Learning) — N dagba ni kiakia
- **Cybersecurity** — Pataki bi isọdọmọ oni-nọmba ṣe n pọ si
- **Full-Stack Development** (React, Node.js, TypeScript) — Nigbagbogbo ni ibeere
- **UI/UX Design** (Figma, iwadii olumulo) — Awọn ile-iṣẹ n fi pataki fun awọn iriri ti o dara

**Awọn Ọgbọn Rirọ:**
- **Ibaraẹnisọrọ** — Iṣalaye kikọ ati ọrọ sisọ
- **Ipinnu Iṣoro** — Ironu pataki ati ironu onínọmbà
- **Imudọgba** — Agbara lati kọ awọn irinṣẹ tuntun ni kiakia
- **Olori** — Paapaa ni awọn ipele kekere, ipilẹṣẹ ṣe pataki

**Awọn Ipele Ọfẹ Lati Kọ:**
- **ALX Africa** — Awọn eto imọ-ẹrọ ọfẹ fun awọn ọdọ Afirika
- **Coursera** — Awọn ẹkọ lati awọn ile-ẹkọ giga
- **freeCodeCamp** — Eto ẹkọ koodu pipe
- **Google Digital Skills for Africa** — Awọn iwe-ẹri ọfẹ

Ṣe o fẹ ki n ṣẹda eto ẹkọ ti ara ẹni ti o da lori awọn ibi-afẹde iṣẹ rẹ?`,
    ig: `Ajụjụ magburu onwe ya! Dabere na ọnọdụ ahịa ọrụ ugbu a na Naịjirịa na Africa, nke a bụ nkà ndị kachasị achọ ka ị tụlee:

**Nkà Nkà na ụzụ:**
- **Cloud Computing** (AWS, Azure, GCP) — Nnukwu ọchịchọ n'ofe fintech na ụlọ ọrụ
- **Data Analysis & AI** (Python, SQL, Machine Learning) — Na-eto ngwa ngwa
- **Cybersecurity** — Dị mkpa ka nnabata dijitalụ na-abawanye
- **Full-Stack Development** (React, Node.js, TypeScript) — A na-achọ mgbe niile
- **UI/UX Design** (Figma, nyocha onye ọrụ) — Ụlọ ọrụ na-ebute ahụmịhe dị mma ụzọ

**Nkà Dị Nro:**
- **Nkwurịta Okwu** — Ido anya ederede na ọnụ
- **Ngwọta Nsogbu** — Echiche dị egwu na echiche nyocha
- **Imegbanwe** — Ikike ịmụ ngwaọrụ ọhụrụ ngwa ngwa
- **Onye Nduzi** — Ọbụna na ọkwa dị ala, ụzọ dị mkpa

**Nyìrì Ígwè N'efu Maka Ịmụ:**
- **ALX Africa** — Mmemme teknụzụ n'efu maka ndị ntorobịa Africa
- **Coursera** — Ọmụmụ sitere na mahadum ndị dị elu
- **freeCodeCamp** — Usoro mmụta koodu zuru oke
- **Google Digital Skills for Africa** — Asambodo n'efu

Ị chọrọ ka m mepụtara gị atụmatụ mmụta nkeonwe dabere na ebumnuche ọrụ gị?`,
  },
  interview: {
    en: `Preparing for interviews is crucial! Here's a comprehensive guide to help you succeed:

**Before the Interview:**

1. **Research the Company**
   - Understand their products, mission, and recent news
   - Check their LinkedIn page and company website
   - Know their competitors and market position

2. **Review the Job Description**
   - Identify key required skills and prepare examples
   - Match your experience to each requirement
   - Prepare 3-4 strong stories using the STAR method

3. **Practice Common Questions**
   - "Tell me about yourself" — Keep it professional, 60-90 seconds
   - "Why do you want to work here?" — Show research and genuine interest
   - "What are your strengths/weaknesses?" — Be honest, show growth

**The STAR Method:**
- **S**ituation — Set the context
- **T**ask — What was your responsibility?
- **A**ction — What did you do specifically?
- **R**esult — What was the outcome? Use numbers!

**During the Interview:**
- Arrive 10-15 minutes early (or join video call early)
- Dress professionally, even for video calls
- Have questions ready for the interviewer
- Send a thank-you email within 24 hours

Would you like me to conduct a mock interview practice session with you?`,
    ha: `Shirye-shiryen hirarraki yana da mahimmanci! Ga cikakken jagora don taimaka maka yin nasara:

**Kafin Hira:**

1. **Bincika Kamfanin**
   - Fahimci samfurorinsu, manufa, da labarai na kwanan nan
   - Duba shafin LinkedIn ɗinsu da gidan yanar gizon kamfanin
   - San masu fafatawa da matsayin kasuwa

2. **Bincika Bayanin Aikin**
   - Gano mahimman ƙwarewar da ake buƙata kuma shirya misalai
   - Daidaita gogewar ka da kowane buƙata
   - Shirya labarai 3-4 masu ƙarfi ta amfani da hanyar STAR

3. **Yi Aiki da Tambayoyin Gama Gari**
   - "Gaya mini game da kanka" — Kasance ƙwararre, daƙiƙa 60-90
   - "Me ya sa kake son aiki a nan?" — Nuna bincike da sha'awa ta gaske
   - "Mene ne ƙarfin ka/raunin ka?" — Kasance mai gaskiya, nuna ci gaba

**Hanyar STAR:**
- **S** yanayi — Saita mahallin
- **T** aiki — Menene alhakin ka?
- **A** aiki — Me ka yi musamman?
- **R** sakamako — Menene sakamakon? Yi amfani da lambobi!

**A Lokacin Hira:**
- Iso mintuna 10-15 da wuri
- Yi ado da ƙwarewa, ko da don kiran bidiyo
- Shirya tambayoyi ga mai hira
- Aika imel ɗin godiya a cikin awanni 24

Kana son in gudanar da zaman gwajin hira tare da kai?`,
    yo: `Imurasilẹ fun awọn ibeere jẹ pataki! Eyi ni itọsọna pipe lati ran ọ lọwọ lati ṣaṣeyọri:

**Ṣaaju Ibeere:**

1. **Ṣewadii Ile-iṣẹ naa**
   - Loye awọn ọja wọn, iṣẹ apinfunni, ati awọn iroyin aipẹ
   - Ṣayẹwo oju-iwe LinkedIn wọn ati oju opo wẹẹbu ile-iṣẹ
   - Mọ awọn oludije wọn ati ipo ọja

2. **Ṣayẹwo Apejuwe Iṣẹ**
   - Ṣe idanimọ awọn ọgbọn pataki ti a nilo ki o mura awọn apẹẹrẹ
   - Mu iriri rẹ baamu si ibeere kọọkan
   - Mura awọn itan 3-4 ti o lagbara nipa lilo ọna STAR

3. **Ṣe Adaṣe Awọn Ibeere Ti o Wọpọ**
   - "Sọ fun mi nipa ara rẹ" — Jẹ ki o jẹ alamọdaju, iṣẹju 60-90
   - "Kí nìdí tí o fẹ ṣiṣẹ nibi?" — Ṣe afihan iwadii ati ifẹ gidi
   - "Kí ni awọn agbara/ailagbara rẹ?" — Jẹ oloootitọ, ṣe afihan idagbasoke

**Ọna STAR:**
- **S** ipo — Ṣeto ọrọ-ọrọ
- **T** iṣẹ-ṣiṣe — Kí ni ojuse rẹ?
- **A** igbese — Kí ni o ṣe ni pato?
- **R** esi — Kí ni abajade? Lo awọn nọmba!

**Lakoko Ibeere:**
- De iṣẹju 10-15 ni kutukutu
- Wọ aṣọ alamọdaju, paapaa fun awọn ipe fidio
- Ni awọn ibeere ti o ṣetan fun olubẹwo
- Fi imeeli ọpẹ ranṣẹ laarin wakati 24

Ṣe o fẹ ki n ṣe igba adaṣe ibeere pẹlu rẹ?`,
    ig: `Ịkwadebe maka ajụjụ ọnụ dị oké mkpa! Nke a bụ ntụziaka zuru oke iji nyere gị aka ịga nke ọma:

**Tupu Ajụjụ Ọnụ:**

1. **Nyochaa Ụlọ Ọrụ Ahụ**
   - Ghọta ngwaahịa ha, ebumnuche, na akụkọ na-adịbeghị anya
   - Lelee ibe LinkedIn ha na weebụsaịtị ụlọ ọrụ
   - Mara ndị asọmpi ha na ọnọdụ ahịa

2. **Nyochaa Nkọwa Ọrụ**
   - Chọpụta nkà ndị dị mkpa achọrọ ma kwadebe ihe atụ
   - Mee ka ahụmịhe gị dabaa na ihe ọ bụla achọrọ
   - Kwadebe akụkọ 3-4 siri ike site na iji usoro STAR

3. **Mee Omume Ajụjụ Ndị A Na-ajụkarị**
   - "Gwa m banyere onwe gị" — Mee ya ọkachamara, 60-90 sekọnd
   - "Gịnị mere ịchọrọ ịrụ ọrụ ebe a?" — Gosi nyocha na mmasị n'ezie
   - "Kedu ike / adịghị ike gị?" — Bụrụ onye eziokwu, gosi uto

**Usoro STAR:**
- **S** ọnọdụ — Tọọ ọnọdụ
- **T** ọrụ — Gịnị bụ ọrụ gị?
- **A** omume — Gịnị ka i mere kpọmkwem?
- **R** nsonaazụ — Gịnị bụ ihe si na ya pụta? Jiri ọnụọgụ!

**N'oge Ajụjụ Ọnụ:**
- Bịa nkeji 10-15 n'isi
- Yiri uwe ọkachamara, ọbụna maka oku vidiyo
- Nwee ajụjụ dị njikere maka onye na-agba ajụjụ
- Ziga ozi-e ekele n'ime awa 24

Ị chọrọ ka m mee mmemme ajụjụ ọnụ na gị?`,
  },
  careerPath: {
    en: `Finding the right career path is an exciting journey! Let me help you think through this systematically:

**Step 1: Self-Assessment**
Ask yourself:
- What do I genuinely enjoy doing?
- What am I naturally good at?
- What kind of work environment suits me?
- What impact do I want to make?

**Step 2: Explore Options**
Based on your interests, consider these growing fields in Nigeria:
- **Tech** — Software development, data science, cybersecurity, cloud engineering
- **Finance** — Fintech, investment banking, financial analysis
- **Creative** — Product design, content creation, digital marketing
- **Healthcare** — Health tech, public health, telemedicine
- **Agriculture** — Agritech, supply chain, food processing

**Step 3: Research & Validate**
- Talk to professionals in your target field
- Take online assessments (Myers-Briggs, career aptitude tests)
- Try short projects or internships
- Follow industry leaders on LinkedIn and Twitter

**Step 4: Build Your Roadmap**
- Set 3-month, 6-month, and 1-year goals
- Identify skills to learn
- Find mentors and communities
- Build a portfolio

What field are you most interested in? I can create a more specific roadmap for you!`,
    ha: `Neman hanyar aiki da ta dace tafiya ce mai ban sha'awa! Bari in taimake ka ka yi tunani game da wannan cikin tsari:

**Mataki 1: Ƙimar Kai**
Tambayi kanka:
- Me nake jin daɗin yi da gaske?
- Me nake iyawa a zahiri?
- Wane irin yanayin aiki ya dace da ni?
- Wane irin tasiri nake son yi?

**Mataki 2: Bincika Zaɓuɓɓuka**
Dangane da sha'awar ka, yi la'akari da waɗannan fannoni masu girma a Najeriya:
- **Fasaha** — Haɓaka software, kimiyyar bayanai, cybersecurity, injiniyan cloud
- **Kuɗi** — Fintech, banki na saka jari, nazarin kuɗi
- **Ƙirƙira** — Zanen samfur, ƙirƙirar abun ciki, tallan dijital
- **Kiwon Lafiya** — Fasahar kiwon lafiya, lafiyar jama'a, magani ta wayar tarho
- **Noma** — Agritech, sarkar samarwa, sarrafa abinci

**Mataki 3: Bincike & Tabbatarwa**
- Yi magana da ƙwararru a fannin da kake so
- Ɗauki ƙima ta kan layi (Myers-Briggs, gwaje-gwajen ƙwarewar aiki)
- Gwada gajerun ayyuka ko horo na ɗan lokaci
- Bi shugabannin masana'antu a LinkedIn da Twitter

**Mataki 4: Gina Taswirar Ka**
- Saita manufofin watanni 3, 6, da shekara 1
- Gano ƙwarewar da za a koya
- Nemo masu ba da shawara da al'ummomi
- Gina portfolio

Wane fanni kake da sha'awa? Zan iya ƙirƙira maka takamaiman taswira!`,
    yo: `Wiwa ọna iṣẹ ti o tọ jẹ irin-ajo ti o dun! Jẹ ki n ran ọ lọwọ lati ronu nipa eyi ni ọna eto:

**Igbesẹ 1: Iṣayẹwo Ara Ẹni**
Beere lọwọ ara rẹ:
- Kí ni mo gbadun ni gidi?
- Kí ni mo dara si ni ti ẹda?
- Iru agbegbe iṣẹ wo ni o ba mi mu?
- Ipa wo ni mo fẹ ṣe?

**Igbesẹ 2: Ṣawari Awọn Aṣayan**
Da lori awọn ifẹ rẹ, ronu nipa awọn aaye wọnyi ti n dagba ni Nigeria:
- **Imọ-ẹrọ** — Idagbasoke software, sayẹnsì data, cybersecurity, imọ-ẹrọ cloud
- **Isuna** — Fintech, ifowopamọ idoko-owo, itupalẹ owo
- **Ṣiṣẹda** — Apẹrẹ ọja, ṣiṣẹda akoonu, titaja oni-nọmba
- **Ilera** — Imọ-ẹrọ ilera, ilera gbogbogbo, telemedicine
- **Iṣẹ-ogbin** — Agritech, pq ipese, ṣiṣe ounjẹ

**Igbesẹ 3: Ṣewadii & Fọwọsi**
- Ba awọn alamọdaju sọrọ ni aaye ti o fẹ
- Mu awọn igbelewọn ori ayelujara (Myers-Briggs, awọn idanwo agbara iṣẹ)
- Gbiyanju awọn iṣẹ kukuru tabi awọn ikọṣẹ
- Tẹle awọn oludari ile-iṣẹ lori LinkedIn ati Twitter

**Igbesẹ 4: Kọ Maapu Rẹ**
- Ṣeto awọn ibi-afẹde oṣu 3, 6, ati ọdun 1
- Ṣe idanimọ awọn ọgbọn lati kọ
- Wa awọn oludamọran ati awọn agbegbe
- Kọ portfolio

Aaye wo ni o nifẹ si julọ? Mo le ṣẹda maapu ti o ni pato fun ọ!`,
    ig: `Ịchọta ụzọ ọrụ ziri ezi bụ njem na-akpali akpali! Ka m nyere gị aka iche echiche banyere nke a n'usoro:

**Nzọụkwụ 1: Ntụle Onwe Onye**
Jụọ onwe gị:
- Gịnị ka m na-enwe mmasị n'ezie ime?
- Gịnị ka m na-eme nke ọma?
- Ụdị gburugburu ọrụ dị m mma?
- Mmetụta dị m chọrọ inwe?

**Nzọụkwụ 2: Nyochaa Nhọrọ**
Dabere na mmasị gị, tụlee mpaghara ndị a na-eto eto na Naịjirịa:
- **Nkà na ụzụ** — Mmepe software, sayensị data, cybersecurity, injinia cloud
- **Ego** — Fintech, ụlọ akụ itinye ego, nyocha ego
- **Ihe Okike** — Ime ngwaahịa, imepụta ọdịnaya, ahịa dijitalụ
- **Ahụike** — Teknụzụ ahụike, ahụike ọha, telemedicine
- **Ọrụ Ugbo** — Agritech, agbụ ọkọnọ, nhazi nri

**Nzọụkwụ 3: Nyocha & Kwado**
- Gwa ndị ọkachamara n'ọhịa gị chọrọ
- Were nyocha n'ịntanetị (Myers-Briggs, ule ikike ọrụ)
- Gbalịa obere ọrụ ma ọ bụ ọzụzụ
- Soro ndị isi ụlọ ọrụ na LinkedIn na Twitter

**Nzọụkwụ 4: Wuo Map Gị**
- Tọọ ebumnuche ọnwa 3, 6, na afọ 1
- Chọpụta nkà ị ga-amụ
- Chọta ndị ndụmọdụ na obodo
- Wuo pọtụfoliyo

Kedu mpaghara ị nwere mmasị karịa? Enwere m ike ịmepụtara gị map nke gị!`,
  },
  cv: {
    en: `Let me help you improve your CV! Here are actionable tips to make it stronger:

**1. Professional Summary First**
Start with a powerful 2-3 sentence summary that captures who you are, your key strengths, and what you're looking for. Make it specific to your target role.

**2. Highlight Achievements, Not Duties**
Transform boring job descriptions into achievement statements:
- ❌ "Responsible for managing social media accounts"
- ✅ "Grew Instagram following from 500 to 5,000 in 3 months, increasing engagement by 200%"

**3. Format for Readability**
- Use consistent fonts and spacing
- Keep it to 1-2 pages max
- Use bullet points, not paragraphs
- White space is your friend
- Save as PDF

**4. Add a Skills Matrix**
Create a table or grid showing your technical skills with proficiency levels. This helps both ATS systems and human recruiters quickly assess your capabilities.

**5. Include Relevant Links**
- LinkedIn profile (make sure it's updated!)
- GitHub/Behance/Portfolio
- Any published work or projects

Would you like me to review your current CV and give specific feedback?`,
    ha: `Bari in taimake ka ka inganta CV ɗinka! Ga shawarwari masu amfani don ƙarfafa shi:

**1. Taƙaitaccen Ƙwararru da Farko**
Fara da taƙaitaccen jimloli 2-3 masu ƙarfi waɗanda ke ɗauke da kai, manyan ƙarfinka, da abin da kake nema. Sanya shi takamaiman ga matsayin da kake so.

**2. Nuna Nasarori, Ba Ayyuka Ba**
Canja bayanin aiki mai ban sha'awa zuwa bayanin nasarori:
- ❌ "Alhakin sarrafa asusun社交媒体"
- ✅ "Ƙara mabiyan Instagram daga 500 zuwa 5,000 a cikin watanni 3, ƙara yawan hulɗa da kashi 200%"

**3. Tsara Don Sauƙin Karatu**
- Yi amfani da rubutu da tazara masu dacewa
- Kiyaye shi zuwa shafuka 1-2 kawai
- Yi amfani da layuka, ba sakin layi ba
- Farin sarari abokinka ne
- Ajiye azaman PDF

**4. Ƙara Matrix ɗin Ƙwarewa**
Ƙirƙiri tebur ko grid wanda ke nuna ƙwarewar fasaha tare da matakan ƙwarewa. Wannan yana taimaka wa tsarin ATS da masu ɗaukar ma'aikata su tantance iyawarka cikin sauri.

**5. Haɗa Hanyoyin da suka dace**
- Bayanin martaba na LinkedIn (tabbatar an sabunta shi!)
- GitHub/Behance/Portfolio
- Duk wani aiki da aka buga ko ayyuka

Kana son in sake duba CV ɗinka na yanzu in ba da takamaiman ra'ayi?`,
    yo: `Jẹ ki n ran ọ lọwọ lati mu CV rẹ dara! Eyi ni awọn imọran iṣe lati jẹ ki o lagbara:

**1. Akopọ Ọjọgbọn Ni Akọkọ**
Bẹrẹ pẹlu akopọ ti o lagbara ti awọn gbolohun 2-3 ti o mu ẹni ti o jẹ, awọn agbara pataki rẹ, ati ohun ti o n wa. Jẹ ki o jẹ pato si ipo ti o fẹ.

**2. Ṣe Afihan Awọn Aṣeyọri, Kii Ṣe Awọn Iṣẹ**
Yi awọn apejuwe iṣẹ ti ko nira pada si awọn alaye aṣeyọri:
- ❌ "Ojuse fun ṣiṣakoso awọn akọọlẹ media awujọ"
- ✅ "Dagba awọn ọmọlẹhin Instagram lati 500 si 5,000 ni oṣu mẹta, mu ifaramọ pọ si nipasẹ 200%"

**3. Ṣeto Fun Kika**
- Lo awọn fonti ati aye ti o dọgba
- Jẹ ki o jẹ oju-iwe 1-2 ni o pọju
- Lo awọn isamisi, kii ṣe awọn ìpínrọ̀
- Aaye funfun jẹ ọrẹ rẹ
- Fipamọ bi PDF

**4. Fi Matrix Ọgbọn Kun**
Ṣẹda tabili ti o n ṣe afihan awọn ọgbọn imọ-ẹrọ rẹ pẹlu awọn ipele oye. Eyi ṣe iranlọwọ fun awọn eto ATS ati awọn agbanisiṣẹ eniyan lati ṣe ayẹwo awọn agbara rẹ ni kiakia.

**5. Fi Awọn Ọna Asopọ Ti O Yẹ Kun**
- Profaili LinkedIn (rii daju pe o ti ni imudojuiwọn!)
- GitHub/Behance/Portfolio
- Iṣẹ tabi awọn iṣẹ akanṣe eyikeyi ti a ti gbejade

Ṣe o fẹ ki n ṣayẹwo CV rẹ lọwọlọwọ ki n fun ọ ni esi pato?`,
    ig: `Ka m nyere gị aka imeziwanye CV gị! Nke a bụ ndụmọdụ iji mee ka ọ sie ike:

**1. Nchịkọta Ọkachamara Na Mbụ**
Bido na nchịkọta ahịrịokwu 2-3 siri ike nke na-egosipụta onye ị bụ, ike gị, na ihe ị na-achọ. Mee ya ka ọ bụrụ nke gị maka ọrụ ịchọrọ.

**2. Gosi Ihe Ndị Ị Rụzuru, Ọ Bụghị Ọrụ**
Gbanwee nkọwa ọrụ na-agwụ ike ka ọ bụrụ nkwupụta mmezu:
- ❌ "Ọrụ maka ijikwa akaụntụ mgbasa ozi"
- ✅ "Mụbara ndị na-eso Instagram site na 500 ruo 5,000 n'ime ọnwa 3, na-amụbawanye ntinye aka site na 200%"

**3. Hazie Maka Ịgụ**
- Jiri mkpụrụedemede na oghere na-adịgide adịgide
- Debe ya na ibe 1-2 kacha
- Jiri akara mgbọ, ọ bụghị paragraf
- Oghere ọcha bụ enyi gị
- Chekwaa dị ka PDF

**4. Tinye Matrix Nkà**
Mepụta tebụl na-egosi nkà teknụzụ gị na ọkwa nka. Nke a na-enyere ma usoro ATS na ndị na-ewe mmadụ aka ịtụle ikike gị ngwa ngwa.

**5. Tinye Njikọ Ndị Dị Mkpa**
- Profaịlụ LinkedIn (gbaa mbọ na emelitere ya!)
- GitHub/Behance/Pọtụfoliyo
- Ọrụ ọ bụla e bipụtara ma ọ bụ ọrụ

Ị chọrọ ka m nyochaa CV gị ugbu a ma nye gị nzaghachi kpọmkwem?`,
  },
  courses: {
    en: `I'd be happy to recommend free courses! Here are some excellent resources:

**For Tech Careers:**
- **ALX Africa** — Free 8-month software engineering program (fully sponsored)
- **freeCodeCamp** — Complete web development, data science, and machine learning curricula
- **CS50 by Harvard** (on edX) — World-class introduction to computer science
- **Google Africa Developer Scholarship** — Android, web, and cloud tracks with certifications
- **AWS Cloud Practitioner Essentials** — Free cloud computing fundamentals

**For Business & Professional Skills:**
- **Google Digital Skills for Africa** — Digital marketing, data analytics, career development
- **HP LIFE** — Business, marketing, and entrepreneurship courses
- **Coursera Financial Aid** — Apply for free access to any course (including certificates)

**For Design:**
- **Figma Learn** — Free design tool tutorials
- **Canva Design School** — Graphic design fundamentals
- **Google UX Design** (via Coursera financial aid)

**Nigerian-Specific Resources:**
- **NITDA Academy** — Free digital skills training
- **3MTT Program** — Government-sponsored tech talent development

Would you like me to create a personalized learning plan for a specific career path?`,
    ha: `Zan yi farin cikin ba da shawarar darussan kyauta! Ga wasu albarkatu masu kyau:

**Don Ayyukan Fasaha:**
- **ALX Africa** — Shirin injiniyan software na kyauta na watanni 8 (cikakken tallafi)
- **freeCodeCamp** — Cikakken haɓaka yanar gizo, kimiyyar bayanai, da tsarin koyon injin
- **CS50 ta Harvard** (a edX) — Gabatarwa mai daraja ta duniya ga kimiyyar kwamfuta
- **Google Africa Developer Scholarship** — Hanyoyin Android, yanar gizo, da cloud tare da takaddun shaida
- **AWS Cloud Practitioner Essentials** — Tushen ilimin cloud computing kyauta

**Don Ƙwarewar Kasuwanci & Ƙwararru:**
- **Google Digital Skills for Africa** — Tallan dijital, nazarin bayanai, haɓaka aiki
- **HP LIFE** — Darussan kasuwanci, tallace-tallace, da kasuwanci
- **Taimakon Kuɗi na Coursera** — Nemi damar kyauta ga kowane darasi

**Don Zane:**
- **Figma Learn** — Koyarwar kayan aikin zane kyauta
- **Canva Design School** — Tushen zanen hoto
- **Google UX Design** (ta hanyar taimakon kuɗi na Coursera)

**Albarkatun Musamman na Najeriya:**
- **NITDA Academy** — Horon ƙwarewar dijital kyauta
- **Shirin 3MTT** — Haɓaka ƙwarewar fasaha ta gwamnati

Kana son in ƙirƙiri tsarin koyo na musamman don takamaiman hanyar aiki?`,
    yo: `Ina yọ lati daba awọn ẹkọ ọfẹ! Eyi ni diẹ ninu awọn orisun to dara julọ:

**Fun Awọn Iṣẹ Imọ-ẹrọ:**
- **ALX Africa** — Eto imọ-ẹrọ software ọfẹ fun oṣu mẹjọ (igbowo ni kikun)
- **freeCodeCamp** — Idagbasoke wẹẹbu pipe, sayẹnsì data, ati awọn iwe-ẹkọ ẹkọ ẹrọ
- **CS50 nipasẹ Harvard** (lori edX) — Ifihan kilasi agbaye si imọ-ẹrọ kọnputa
- **Google Africa Developer Scholarship** — Android, wẹẹbu, ati awọn ọna cloud pẹlu awọn iwe-ẹri
- **AWS Cloud Practitioner Essentials** — Awọn ipilẹ iṣiro cloud ọfẹ

**Fun Iṣowo & Awọn Ọgbọn Ọjọgbọn:**
- **Google Digital Skills for Africa** — Titaja oni-nọmba, itupalẹ data, idagbasoke iṣẹ
- **HP LIFE** — Awọn ẹkọ iṣowo, titaja, ati iṣowo
- **Iranlọwọ Owo Coursera** — Waye fun iraye si ọfẹ si eyikeyi ẹkọ

**Fun Apẹrẹ:**
- **Figma Learn** — Awọn ikẹkọ irinṣẹ apẹrẹ ọfẹ
- **Canva Design School** — Awọn ipilẹ apẹrẹ ayaworan
- **Google UX Design** (nipasẹ iranlọwọ owo Coursera)

**Awọn Orisun Pataki Ni Nigeria:**
- **NITDA Academy** — Ikẹkọ awọn ọgbọn oni-nọmba ọfẹ
- **Eto 3MTT** — Idagbasoke talenti imọ-ẹrọ ti ijọba ṣe onigbọwọ

Ṣe o fẹ ki n ṣẹda eto ẹkọ ti ara ẹni fun ọna iṣẹ kan pato?`,
    ig: `Ọ ga-adị m ụtọ ịtụ aro ọmụmụ n'efu! Nke a bụ ụfọdụ ebe mmụta magburu onwe ya:

**Maka Ọrụ Nkà na ụzụ:**
- **ALX Africa** — Mmemme injinia software n'efu nke ọnwa 8 (nkwado zuru oke)
- **freeCodeCamp** — Mmepe weebụ zuru oke, sayensị data, na usoro mmụta igwe
- **CS50 nke Harvard** (na edX) — Ntinye ụwa maka sayensị kọmputa
- **Google Africa Developer Scholarship** — Android, weebụ, na ụzọ cloud na asambodo
- **AWS Cloud Practitioner Essentials** — Ihe ndabere nke igwe ojii n'efu

**Maka Azụmahịa & Nkà Ọkachamara:**
- **Google Digital Skills for Africa** — Ahịa dijitalụ, nyocha data, mmepe ọrụ
- **HP LIFE** — Azụmahịa, ahịa, na ọmụmụ ịzụ ahịa
- **Enyemaka Ego Coursera** — Tinye akwụkwọ maka ohere n'efu na ọmụmụ ọ bụla

**Maka Ime:**
- **Figma Learn** — Nkuzi ngwaọrụ ime n'efu
- **Canva Design School** — Ihe ndabere nke ime eserese
- **Google UX Design** (site na enyemaka ego Coursera)

**Ebe Mmụta Ndị Dị na Naịjirịa:**
- **NITDA Academy** — Ọzụzụ nkà dijitalụ n'efu
- **Mmemme 3MTT** — Mmepe talenti teknụzụ nke gọọmentị na-akwado

Ị chọrọ ka m mepụtara gị atụmatụ mmụta nkeonwe maka ụzọ ọrụ a kapịrị ọnụ?`,
  },
  default: {
    en: `Thanks for your question! As your AI career companion, I'm here to help with:

📄 **Resume & CV Reviews** — Get feedback on structure, content, and ATS optimization

🎯 **Career Path Guidance** — Discover roles that match your skills and interests

💬 **Interview Preparation** — Practice questions, STAR method tips, and mock interviews

📚 **Learning Resources** — Free courses, certifications, and skill-building recommendations

💼 **Job Search Strategy** — Tips for applying, networking, and negotiating offers

🌍 **Nigerian Job Market Insights** — Local trends, in-demand skills, and salary benchmarks

What would you like to focus on today? I'm here to support your career journey!`,
    ha: `Na gode da tambayar ka! A matsayina na abokin taimakon aikin AI, ina nan don taimakawa da:

📄 **Bita na Resume & CV** — Samu ra'ayi game da tsari, abun ciki, da inganta ATS

🎯 **Jagorar Hanyar Aiki** — Gano matsayin da suka dace da ƙwarewa da sha'awarka

💬 **Shirye-shiryen Hira** — Tambayoyin gwaji, shawarwarin hanyar STAR, da hirarrakin gwaji

📚 **Albarkatun Koyo** — Darussan kyauta, takaddun shaida, da shawarwarin gina ƙwarewa

💼 **Dabarun Neman Aiki** — Shawarwari don nema, sadarwa, da tattaunawar tayin aiki

🌍 **Bayani game da Kasuwar Aiki ta Najeriya** — Abubuwan gida, ƙwarewar da ake buƙata, da ma'aunin albashi

Me kake son mayar da hankali a kai a yau? Ina nan don tallafawa tafiyar aikin ka!`,
    yo: `O ṣeun fun ibeere rẹ! Gẹgẹbi alabaṣiṣẹpọ iṣẹ AI rẹ, Mo wa nibi lati ṣe iranlọwọ pẹlu:

📄 **Awọn Atunwo Resume & CV** — Gba esi lori igbekalẹ, akoonu, ati iṣapeye ATS

🎯 **Itọsọna Ọna Iṣẹ** — Ṣawari awọn ipo ti o baamu awọn ọgbọn ati awọn ifẹ rẹ

💬 **Igbaradi Ibeere** — Awọn ibeere adaṣe, awọn imọran ọna STAR, ati awọn ibeere adaṣe

📚 **Awọn Ohun-elo Ẹkọ** — Awọn ẹkọ ọfẹ, awọn iwe-ẹri, ati awọn iṣeduro ikọle ọgbọn

💼 **Ilana Wiwa Iṣẹ** — Awọn imọran fun wiwa, nẹtiwọọki, ati idunadura awọn ipese

🌍 **Awọn Oye Ọja Iṣẹ Nigeria** — Awọn aṣa agbegbe, awọn ọgbọn ti a nilo, ati awọn itọka owo oya

Kí ni o fẹ dojukọ loni? Mo wa nibi lati ṣe atilẹyin fun irin-ajo iṣẹ rẹ!`,
    ig: `Daalụ maka ajụjụ gị! Dịka onye enyemaka ọrụ AI gị, anọ m ebe a iji nyere aka na:

📄 **Ntụle Resume & CV** — Nweta nzaghachi maka nhazi, ọdịnaya, na nhazi ATS

🎯 **Ntụziaka Ụzọ Ọrụ** — Chọpụta ọrụ ndị dabara na nkà na mmasị gị

💬 **Nkwadebe Ajụjụ Ọnụ** — Ajụjụ omume, ndụmọdụ usoro STAR, na ajụjụ ọnụ mock

📚 **Ihe Mmụta** — Ọmụmụ n'efu, asambodo, na ndụmọdụ iwulite nkà

💼 **Atụmatụ Ịchọ Ọrụ** — Ndụmọdụ maka itinye akwụkwọ, ịkparịta ụka, na ịkparịta ụka maka onyinye

🌍 **Nghọta Ahịa Ọrụ Naịjirịa** — Ọnọdụ mpaghara, nkà ndị a na-achọ, na nha ụgwọ ọnwa

Gịnị ka ịchọrọ ilekwasị anya taa? Anọ m ebe a ịkwado njem ọrụ gị!`,
  },
};

function detectTopic(message: string): string {
  const lower = message.toLowerCase();
  if (/resume|resumé|cv|curriculum vitae/i.test(lower)) return 'resume';
  if (/skill|learn|course|study|train/i.test(lower)) return 'skills';
  if (/interview|mock|question|prep/i.test(lower)) return 'interview';
  if (/career path|roadmap|direction|field|role|career change/i.test(lower)) return 'careerPath';
  if (/improve.*cv|cv.*improve|fix.*cv|make.*cv/i.test(lower)) return 'cv';
  if (/free.*course|recommend.*course|best.*course|online.*course/i.test(lower)) return 'courses';
  return 'default';
}

export async function chatWithAI(request: ChatRequest): Promise<ChatResponse> {
  const topic = detectTopic(request.message);
  const response = mockResponses[topic] ?? mockResponses.default;
  const reply = response[request.language] ?? response.en;

  // Simulate realistic typing delay
  await delay(800 + Math.random() * 1500);

  return {
    reply,
    conversationId: `conv_${Date.now()}`,
  };
}

// Real backend API call (to be connected when FastAPI backend is ready)
export async function chatWithAIBackend(request: ChatRequest): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Chat API error: ${response.status}`);
  }

  return response.json();
}
