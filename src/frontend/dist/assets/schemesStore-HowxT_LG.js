import { R as React } from "./index-Bx_LFD18.js";
const defaultSchemes = [
  {
    id: "1",
    name: "PM Scholarship Scheme",
    state: "all",
    category: "student",
    benefit: "₹25,000/year scholarship",
    benefit_amount_numeric: 25e3,
    eligibility: "Children of ex-servicemen/ex-coast guard personnel. Minimum 60% marks in 10+2. Age 18-25 years.",
    documents: [
      "Mark sheets",
      "Service certificate of parent",
      "Aadhaar card",
      "Bank account details",
      "Income certificate"
    ],
    apply_link: "https://ksb.gov.in/pm-scholarship.htm",
    description: "Pradhan Mantri Scholarship Scheme provides scholarships to the wards and widows of ex-servicemen and ex-coast guard personnel for pursuing professional degree courses.",
    tags: ["student", "scholarship", "defence", "education"],
    slug: "pm-scholarship-scheme"
  },
  {
    id: "2",
    name: "Bihar Labour Card Scholarship",
    state: "Bihar",
    category: "student",
    benefit: "₹10,000 scholarship",
    benefit_amount_numeric: 1e4,
    eligibility: "Children of registered construction workers in Bihar. Studying in Class 10th onwards. Annual family income below ₹72,000.",
    documents: [
      "Labour card of parent",
      "School/college certificate",
      "Mark sheets",
      "Aadhaar card",
      "Bank passbook"
    ],
    apply_link: "https://bocw.bihar.gov.in/",
    description: "Bihar Building and Other Construction Workers Welfare Board provides scholarships to children of registered construction workers to support their education.",
    tags: ["student", "labour", "bihar", "scholarship", "construction"],
    slug: "bihar-labour-card-scholarship"
  },
  {
    id: "3",
    name: "Skill India Mission (PMKVY)",
    state: "all",
    category: "general",
    benefit: "Free skill training + ₹8,000 stipend",
    benefit_amount_numeric: 8e3,
    eligibility: "Indian nationals aged 15-45 years. Unemployed or school/college dropouts. No prior skill certification.",
    documents: [
      "Aadhaar card",
      "Bank account",
      "Educational certificates",
      "Passport size photo"
    ],
    apply_link: "https://www.pmkvyofficial.org/",
    description: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY) is the flagship scheme of the Ministry of Skill Development & Entrepreneurship to enable Indian youth to take up industry-relevant skill training.",
    tags: ["general", "skill", "employment", "training", "youth"],
    slug: "skill-india-mission-pmkvy"
  },
  {
    id: "4",
    name: "PM Kisan Samman Nidhi",
    state: "all",
    category: "farmer",
    benefit: "₹6,000/year direct income support",
    benefit_amount_numeric: 6e3,
    eligibility: "Small and marginal farmers with landholding up to 2 hectares. Must have valid land records. Excludes institutional landholders and government employees.",
    documents: [
      "Land ownership documents",
      "Aadhaar card",
      "Bank account details",
      "Khasra/Khatauni"
    ],
    apply_link: "https://pmkisan.gov.in/",
    description: "PM-KISAN provides income support of ₹6,000 per year in three equal installments of ₹2,000 each to small and marginal farmer families across India.",
    tags: ["farmer", "income", "agriculture", "direct benefit"],
    slug: "pm-kisan-samman-nidhi"
  },
  {
    id: "5",
    name: "Beti Bachao Beti Padhao",
    state: "all",
    category: "women",
    benefit: "Education incentives + awareness programs",
    benefit_amount_numeric: 15e3,
    eligibility: "Girl child at birth. Parents must open Sukanya Samriddhi account. Applicable in 640 districts.",
    documents: [
      "Birth certificate of girl child",
      "Aadhaar of parents",
      "Bank account for SSA"
    ],
    apply_link: "https://wcd.nic.in/bbbp-schemes",
    description: "Beti Bachao Beti Padhao aims to address declining Child Sex Ratio and promote welfare of girl child through education, awareness, and financial incentives.",
    tags: ["women", "girl child", "education", "awareness", "welfare"],
    slug: "beti-bachao-beti-padhao"
  },
  {
    id: "6",
    name: "Ayushman Bharat PM-JAY",
    state: "all",
    category: "general",
    benefit: "₹5,00,000 health insurance per family/year",
    benefit_amount_numeric: 5e5,
    eligibility: "Socio-economically disadvantaged families as per SECC 2011. No income cap. Covers pre and post hospitalization expenses.",
    documents: ["Aadhaar card", "Ration card", "SECC/RSBY enrollment details"],
    apply_link: "https://pmjay.gov.in/",
    description: "Pradhan Mantri Jan Arogya Yojana is the world's largest health insurance scheme providing coverage of ₹5 lakh per family per year for secondary and tertiary care hospitalization.",
    tags: ["general", "health", "insurance", "hospitalization", "medical"],
    slug: "ayushman-bharat-pm-jay"
  },
  {
    id: "7",
    name: "PM Awas Yojana Urban",
    state: "all",
    category: "general",
    benefit: "₹2,67,000 interest subsidy",
    benefit_amount_numeric: 267e3,
    eligibility: "EWS/LIG/MIG families without pucca house in urban areas. Annual income below ₹18 lakh. First-time home buyers.",
    documents: [
      "Aadhaar card",
      "Income certificate",
      "Bank statements",
      "Property documents",
      "No objection certificate"
    ],
    apply_link: "https://pmaymis.gov.in/",
    description: "PMAY Urban aims to provide housing for all in urban areas by 2022 through interest subsidy on home loans for economically weaker sections and low-income groups.",
    tags: ["general", "housing", "urban", "home loan", "subsidy"],
    slug: "pm-awas-yojana-urban"
  },
  {
    id: "8",
    name: "PM Awas Yojana Rural (PMAY-G)",
    state: "all",
    category: "general",
    benefit: "₹1,20,000 grant for house construction",
    benefit_amount_numeric: 12e4,
    eligibility: "Homeless families and those living in kutcha/damaged houses in rural areas. Priority to SC/ST, minorities, and BPL families.",
    documents: [
      "Aadhaar card",
      "BPL certificate",
      "Land ownership/allotment documents",
      "Bank account"
    ],
    apply_link: "https://pmayg.nic.in/",
    description: "PMAY-Gramin provides financial assistance to rural BPL households for construction of pucca houses with basic amenities including toilets and LPG connection.",
    tags: ["general", "housing", "rural", "construction", "BPL"],
    slug: "pm-awas-yojana-rural"
  },
  {
    id: "9",
    name: "MNREGA (Mahatma Gandhi NREGS)",
    state: "all",
    category: "labour",
    benefit: "₹267/day guaranteed wages (100 days/year)",
    benefit_amount_numeric: 26700,
    eligibility: "Adult members of rural households willing to do unskilled manual work. Must register in Gram Panchayat. No income limit.",
    documents: [
      "Aadhaar card",
      "Job card application",
      "Bank/post office account",
      "Residence proof"
    ],
    apply_link: "https://nrega.nic.in/",
    description: "MGNREGA guarantees 100 days of wage employment per financial year to every rural household whose adult members volunteer to do unskilled manual work.",
    tags: ["labour", "rural", "employment", "wages", "unskilled"],
    slug: "mnrega-mahatma-gandhi-nregs"
  },
  {
    id: "10",
    name: "Sukanya Samriddhi Yojana",
    state: "all",
    category: "women",
    benefit: "8.2% interest rate savings scheme",
    benefit_amount_numeric: 5e4,
    eligibility: "Parents of girl child below 10 years. Maximum 2 accounts per family. Account matures when girl turns 21.",
    documents: [
      "Birth certificate of girl",
      "Parent's Aadhaar",
      "Passport photo",
      "Address proof"
    ],
    apply_link: "https://www.india.gov.in/sukanya-samridhi-yojana",
    description: "Sukanya Samriddhi Yojana is a small savings scheme for girl children offering 8.2% annual interest, tax benefits, and financial security for education and marriage.",
    tags: ["women", "savings", "girl child", "tax benefit", "education"],
    slug: "sukanya-samriddhi-yojana"
  },
  {
    id: "11",
    name: "Pradhan Mantri Mudra Yojana",
    state: "all",
    category: "general",
    benefit: "Loan up to ₹10,00,000",
    benefit_amount_numeric: 1e6,
    eligibility: "Non-farm micro/small enterprises. No collateral required for Shishu/Kishore. Age 18-65 years. Good credit history.",
    documents: [
      "Business plan",
      "Identity proof",
      "Address proof",
      "Business registration",
      "Bank statements"
    ],
    apply_link: "https://www.mudra.org.in/",
    description: "PMMY provides affordable credit to micro-enterprises through Shishu (up to ₹50K), Kishore (₹50K-5L), and Tarun (₹5L-10L) categories without collateral.",
    tags: [
      "general",
      "loan",
      "business",
      "MSME",
      "entrepreneurship",
      "startup"
    ],
    slug: "pradhan-mantri-mudra-yojana"
  },
  {
    id: "12",
    name: "National Scholarship Portal (NSP)",
    state: "all",
    category: "student",
    benefit: "Scholarships from ₹1,000 to ₹50,000",
    benefit_amount_numeric: 25e3,
    eligibility: "Students from Class 1 to PhD level. Various income criteria based on specific scheme. Minorities, SC/ST, OBC eligible for specific schemes.",
    documents: [
      "Income certificate",
      "Mark sheets",
      "Aadhaar card",
      "Bank account",
      "Domicile certificate"
    ],
    apply_link: "https://scholarships.gov.in/",
    description: "NSP is a one-stop platform for students to access 104+ central and state scholarship schemes, offering financial assistance for education from primary to PhD level.",
    tags: ["student", "scholarship", "education", "minority", "portal"],
    slug: "national-scholarship-portal"
  },
  {
    id: "13",
    name: "Post Matric Scholarship for SC/ST",
    state: "all",
    category: "sc-st",
    benefit: "₹3,000 to ₹15,000 per annum",
    benefit_amount_numeric: 12e3,
    eligibility: "SC/ST students studying post-matric or equivalent. Annual family income below ₹2.5 lakh. Must be regular student.",
    documents: [
      "Caste certificate",
      "Income certificate",
      "Mark sheets",
      "Aadhaar card",
      "Bonafide certificate"
    ],
    apply_link: "https://scholarships.gov.in/",
    description: "Post Matric Scholarship for SC/ST students provides financial support to enable them to complete secondary, graduate, and post-graduate education without financial burden.",
    tags: ["sc-st", "scholarship", "education", "post matric", "caste"],
    slug: "post-matric-scholarship-sc-st"
  },
  {
    id: "14",
    name: "Pre Matric Scholarship for SC/ST",
    state: "all",
    category: "sc-st",
    benefit: "₹500 to ₹7,000 per annum",
    benefit_amount_numeric: 5e3,
    eligibility: "SC/ST students in Class 9-10. Annual family income below ₹2 lakh. Must maintain 60% attendance.",
    documents: [
      "Caste certificate",
      "Income certificate",
      "School enrollment proof",
      "Aadhaar card"
    ],
    apply_link: "https://scholarships.gov.in/",
    description: "Pre Matric Scholarship for SC/ST encourages families from SC/ST communities to send their children to school by providing financial support for Class 9 and 10 education.",
    tags: [
      "sc-st",
      "scholarship",
      "pre-matric",
      "school",
      "Class 9",
      "Class 10"
    ],
    slug: "pre-matric-scholarship-sc-st"
  },
  {
    id: "15",
    name: "Kisan Credit Card (KCC)",
    state: "all",
    category: "farmer",
    benefit: "Credit up to ₹3,00,000 at 4% interest",
    benefit_amount_numeric: 3e5,
    eligibility: "Farmers, tenant farmers, oral lessees and sharecroppers. Allied activities like fisheries and animal husbandry also eligible.",
    documents: [
      "Land records",
      "Aadhaar card",
      "PAN card",
      "Bank account",
      "Passport photo"
    ],
    apply_link: "https://www.nabard.org/content1.aspx?id=572&catid=23&mid=530",
    description: "Kisan Credit Card provides farmers with timely and adequate credit for agricultural operations, post-harvest expenses, and maintenance needs at subsidized interest rates.",
    tags: ["farmer", "credit", "loan", "agriculture", "interest subsidy"],
    slug: "kisan-credit-card"
  },
  {
    id: "16",
    name: "PM Fasal Bima Yojana",
    state: "all",
    category: "farmer",
    benefit: "Crop insurance with sum insured up to full crop value",
    benefit_amount_numeric: 5e4,
    eligibility: "All farmers including sharecroppers and tenant farmers growing notified crops. Compulsory for loanee farmers.",
    documents: [
      "Land records/Khasra",
      "Aadhaar card",
      "Bank account",
      "Sowing certificate"
    ],
    apply_link: "https://pmfby.gov.in/",
    description: "PMFBY provides comprehensive insurance coverage against crop failure due to non-preventable natural risks, stabilizing farmers' income and encouraging modern agriculture.",
    tags: ["farmer", "insurance", "crop", "natural disaster", "flood"],
    slug: "pm-fasal-bima-yojana"
  },
  {
    id: "17",
    name: "Stand Up India Scheme",
    state: "all",
    category: "women",
    benefit: "Bank loan from ₹10 lakh to ₹1 crore",
    benefit_amount_numeric: 1e6,
    eligibility: "SC/ST borrowers and women entrepreneurs aged 18+ years. New enterprise in manufacturing, services, or trading sector. Per bank branch: at least one SC/ST and one woman borrower.",
    documents: [
      "Caste/category certificate",
      "Project report",
      "Identity proof",
      "Address proof",
      "Bank account details"
    ],
    apply_link: "https://www.standupmitra.in/",
    description: "Stand Up India facilitates bank loans between ₹10 lakh to ₹1 crore for SC/ST and women entrepreneurs to set up greenfield enterprises in manufacturing, services, or trading.",
    tags: ["women", "sc-st", "business", "loan", "entrepreneurship", "startup"],
    slug: "stand-up-india-scheme"
  },
  {
    id: "18",
    name: "PM SVANidhi (Street Vendor Loan)",
    state: "all",
    category: "labour",
    benefit: "Loan ₹10,000 to ₹50,000",
    benefit_amount_numeric: 5e4,
    eligibility: "Street vendors vending in urban areas prior to March 24, 2020. Must have certificate of vending or letter of recommendation from town vending committee.",
    documents: [
      "Certificate of vending / vendor ID card",
      "Aadhaar card",
      "Mobile number linked to Aadhaar",
      "Bank account"
    ],
    apply_link: "https://pmsvanidhi.mohua.gov.in/",
    description: "PM SVANidhi provides working capital loans to street vendors to restart their businesses disrupted by COVID-19, with interest subsidy and digital transaction rewards.",
    tags: ["labour", "street vendor", "loan", "urban", "working capital"],
    slug: "pm-svanidhi-street-vendor-loan"
  },
  {
    id: "19",
    name: "Atal Pension Yojana",
    state: "all",
    category: "general",
    benefit: "Guaranteed pension ₹1,000-₹5,000/month after 60",
    benefit_amount_numeric: 6e4,
    eligibility: "Indian citizens aged 18-40 years. Not a member of statutory social security scheme. Must have savings bank account.",
    documents: ["Aadhaar card", "Mobile number", "Savings bank account"],
    apply_link: "https://www.npscra.nsdl.co.in/scheme-details.php",
    description: "Atal Pension Yojana provides guaranteed minimum pension of ₹1,000 to ₹5,000 per month from age 60, depending on contribution, with government co-contribution for eligible subscribers.",
    tags: ["general", "pension", "retirement", "savings", "old age"],
    slug: "atal-pension-yojana"
  },
  {
    id: "20",
    name: "PM Jeevan Jyoti Bima Yojana",
    state: "all",
    category: "general",
    benefit: "₹2,00,000 life insurance cover",
    benefit_amount_numeric: 2e5,
    eligibility: "Age 18-50 years with bank account. Premium: ₹436/year. Auto-debit from account.",
    documents: ["Bank account", "Aadhaar card", "Mobile number"],
    apply_link: "https://www.jansuraksha.gov.in/",
    description: "PMJJBY is a government-backed life insurance scheme offering ₹2 lakh coverage for death due to any cause, available at an annual premium of just ₹436.",
    tags: ["general", "insurance", "life", "death benefit", "BPL"],
    slug: "pm-jeevan-jyoti-bima-yojana"
  },
  {
    id: "21",
    name: "PM Suraksha Bima Yojana",
    state: "all",
    category: "general",
    benefit: "₹2,00,000 accidental insurance",
    benefit_amount_numeric: 2e5,
    eligibility: "Age 18-70 years with bank account. Annual premium only ₹20. Covers accidental death and permanent disability.",
    documents: ["Bank account", "Aadhaar card"],
    apply_link: "https://www.jansuraksha.gov.in/",
    description: "PMSBY provides accidental death and disability cover of ₹2 lakh at an annual premium of just ₹20, making it the most affordable accident insurance in India.",
    tags: ["general", "insurance", "accident", "disability", "affordable"],
    slug: "pm-suraksha-bima-yojana"
  },
  {
    id: "22",
    name: "National Social Assistance Programme",
    state: "all",
    category: "senior",
    benefit: "₹200-₹500/month pension assistance",
    benefit_amount_numeric: 6e3,
    eligibility: "Destitute elderly persons aged 60+. No regular income/support. BPL household. Widows and disabled also covered.",
    documents: [
      "Age proof",
      "BPL certificate",
      "Aadhaar card",
      "Bank account",
      "Residence certificate"
    ],
    apply_link: "https://nsap.nic.in/",
    description: "NSAP provides social protection to the aged, widows, and disabled persons who are BPL, offering monthly pension from ₹200 to ₹500 through Panchayats/Municipalities.",
    tags: [
      "senior",
      "pension",
      "BPL",
      "widow",
      "disabled",
      "social protection"
    ],
    slug: "national-social-assistance-programme"
  },
  {
    id: "23",
    name: "Indira Gandhi National Old Age Pension",
    state: "all",
    category: "senior",
    benefit: "₹200-₹500/month pension",
    benefit_amount_numeric: 6e3,
    eligibility: "BPL elderly persons aged 60 and above. ₹200/month for 60-79 years, ₹500/month for 80+ years.",
    documents: [
      "Age proof (Birth certificate/Aadhaar)",
      "BPL certificate",
      "Bank account",
      "Residence proof"
    ],
    apply_link: "https://nsap.nic.in/",
    description: "IGNOAPS provides old age pension under NSAP to senior citizens from BPL households, ensuring basic financial security in their old age.",
    tags: ["senior", "pension", "old age", "BPL", "elderly"],
    slug: "indira-gandhi-national-old-age-pension"
  },
  {
    id: "24",
    name: "Divyangjan Scholarship Scheme",
    state: "all",
    category: "disabled",
    benefit: "₹500 to ₹2,000/month scholarship",
    benefit_amount_numeric: 24e3,
    eligibility: "Students with 40%+ disability. Studying in Class 9 to PhD level. Annual family income below ₹2.5 lakh.",
    documents: [
      "Disability certificate (40%+)",
      "Income certificate",
      "Mark sheets",
      "Aadhaar card",
      "Bank account"
    ],
    apply_link: "https://scholarships.gov.in/",
    description: "Scholarship schemes for Divyangjan (persons with disabilities) under DEPwD provide financial assistance to disabled students from pre-matric to post-doctoral level.",
    tags: ["disabled", "scholarship", "education", "divyangjan", "disability"],
    slug: "divyangjan-scholarship-scheme"
  },
  {
    id: "25",
    name: "ADIP Scheme (Assistive Devices)",
    state: "all",
    category: "disabled",
    benefit: "Free assistive devices worth up to ₹10,000",
    benefit_amount_numeric: 1e4,
    eligibility: "Persons with disabilities with 40%+ disability. Annual family income below ₹20,000 (or ₹45,000 in some cases). Covers prosthetics, wheelchairs, hearing aids, etc.",
    documents: [
      "Disability certificate",
      "Income certificate",
      "Aadhaar card",
      "Medical prescription"
    ],
    apply_link: "https://alimco.in/ADIP/",
    description: "ADIP Scheme assists persons with disabilities by providing them durable, sophisticated, and scientifically manufactured standard aids and appliances to improve their quality of life.",
    tags: [
      "disabled",
      "assistive devices",
      "prosthetics",
      "wheelchair",
      "hearing aid"
    ],
    slug: "adip-scheme-assistive-devices"
  },
  {
    id: "26",
    name: "Rajiv Gandhi National Fellowship (SC/ST)",
    state: "all",
    category: "sc-st",
    benefit: "₹25,000-₹28,000/month fellowship",
    benefit_amount_numeric: 3e5,
    eligibility: "SC/ST students pursuing MPhil/PhD in universities/research institutions. Must have cleared UGC NET. Age below 40 years.",
    documents: [
      "Caste certificate",
      "NET score card",
      "Admission letter",
      "Aadhaar card",
      "Bank account"
    ],
    apply_link: "https://scholarships.gov.in/",
    description: "RGNF provides financial assistance to SC and ST students to pursue higher education up to PhD level, promoting their participation in research and academic activities.",
    tags: [
      "sc-st",
      "fellowship",
      "research",
      "PhD",
      "MPhil",
      "higher education"
    ],
    slug: "rajiv-gandhi-national-fellowship-sc-st"
  },
  {
    id: "27",
    name: "Central Sector Scholarship Scheme",
    state: "all",
    category: "student",
    benefit: "₹10,000-₹20,000/year",
    benefit_amount_numeric: 15e3,
    eligibility: "Students scoring above 80th percentile in 10+2. Annual family income below ₹4.5 lakh. Pursuing full-time graduate/post-graduate courses.",
    documents: [
      "10+2 mark sheet",
      "Income certificate",
      "Aadhaar card",
      "College admission proof",
      "Bank account"
    ],
    apply_link: "https://scholarships.gov.in/",
    description: "Central Sector Scholarship Scheme provides scholarships to meritorious students from low-income families to pursue higher education, bridging financial gaps in college education.",
    tags: ["student", "scholarship", "merit", "higher education", "graduate"],
    slug: "central-sector-scholarship-scheme"
  },
  {
    id: "28",
    name: "Merit cum Means Scholarship (Minorities)",
    state: "all",
    category: "student",
    benefit: "₹25,000/year for professional courses",
    benefit_amount_numeric: 25e3,
    eligibility: "Students from Muslim, Sikh, Christian, Buddhist, Jain, and Zoroastrian communities. 50%+ marks in previous exam. Annual family income below ₹2.5 lakh.",
    documents: [
      "Minority community certificate",
      "Income certificate",
      "Mark sheets",
      "Aadhaar card",
      "Admission letter"
    ],
    apply_link: "https://scholarships.gov.in/",
    description: "Merit cum Means Scholarship for minorities provides financial assistance to meritorious students from minority communities pursuing technical and professional courses.",
    tags: ["student", "minority", "scholarship", "technical", "professional"],
    slug: "merit-cum-means-scholarship-minorities"
  },
  {
    id: "29",
    name: "Begum Hazrat Mahal National Scholarship",
    state: "all",
    category: "women",
    benefit: "₹10,000 to ₹12,000/year",
    benefit_amount_numeric: 11e3,
    eligibility: "Minority girl students from Class 9-12. Annual family income below ₹2 lakh. Minimum 50% marks in previous class.",
    documents: [
      "Minority certificate",
      "Income certificate",
      "Mark sheets",
      "Bank account (girl's name)",
      "Aadhaar card"
    ],
    apply_link: "https://scholarships.gov.in/",
    description: "Begum Hazrat Mahal National Scholarship empowers minority girl students by providing financial support for secondary school education, reducing dropout rates.",
    tags: ["women", "minority", "scholarship", "girl", "secondary school"],
    slug: "begum-hazrat-mahal-national-scholarship"
  },
  {
    id: "30",
    name: "PM Ujjwala Yojana",
    state: "all",
    category: "women",
    benefit: "Free LPG connection + ₹1,600 subsidy",
    benefit_amount_numeric: 1600,
    eligibility: "Women from BPL/SECC households. Must not have existing LPG connection. Adult woman as applicant. Valid Aadhaar.",
    documents: [
      "BPL/SECC certificate",
      "Aadhaar card",
      "Bank account",
      "Ration card",
      "Address proof"
    ],
    apply_link: "https://pmuy.gov.in/",
    description: "PM Ujjwala Yojana provides free LPG connections to women from BPL households to replace unclean cooking fuels, protecting health and empowering women.",
    tags: ["women", "BPL", "LPG", "cooking", "health", "free connection"],
    slug: "pm-ujjwala-yojana"
  },
  {
    id: "31",
    name: "Mahila Shakti Kendra",
    state: "all",
    category: "women",
    benefit: "Free skill development + community support",
    benefit_amount_numeric: 5e3,
    eligibility: "Women in rural areas of 115 aspirational districts. All age groups eligible. Focus on nutrition, health, and skill development.",
    documents: ["Aadhaar card", "Residence proof"],
    apply_link: "https://wcd.nic.in/schemes/mahila-shakti-kendra",
    description: "Mahila Shakti Kendra empowers rural women through community engagement, skill training, digital literacy, and awareness about government schemes and entitlements.",
    tags: ["women", "rural", "skill", "empowerment", "community"],
    slug: "mahila-shakti-kendra"
  },
  {
    id: "32",
    name: "One Stop Centre Scheme (Sakhi)",
    state: "all",
    category: "women",
    benefit: "Free legal, medical, police and welfare services",
    benefit_amount_numeric: 2e4,
    eligibility: "Women affected by violence (domestic, sexual, trafficking, acid attack, etc.). 24x7 helpline available at 181. All women regardless of religion, caste, or income.",
    documents: ["Any ID proof", "FIR/complaint copy if available"],
    apply_link: "https://wcd.nic.in/schemes/one-stop-centre-scheme",
    description: "One Stop Centres (Sakhi) provide integrated support to women affected by violence, offering police, legal, medical, psychological, and shelter support under one roof.",
    tags: ["women", "violence", "legal", "shelter", "protection", "sakhi"],
    slug: "one-stop-centre-scheme"
  },
  {
    id: "33",
    name: "E-Shram Portal Registration",
    state: "all",
    category: "labour",
    benefit: "₹2,00,000 accident insurance + social security",
    benefit_amount_numeric: 2e5,
    eligibility: "Unorganised workers aged 16-59 years. Not a member of EPFO/ESIC. Income below ₹10,000/month from agriculture or any unorganised work.",
    documents: [
      "Aadhaar card",
      "Mobile number (linked to Aadhaar)",
      "Bank account",
      "Self-declaration"
    ],
    apply_link: "https://eshram.gov.in/",
    description: "E-Shram Portal creates a national database of unorganised workers, providing UAN number, ₹2 lakh accident insurance, and access to social security schemes.",
    tags: [
      "labour",
      "unorganised",
      "insurance",
      "registration",
      "social security"
    ],
    slug: "e-shram-portal-registration"
  },
  {
    id: "34",
    name: "Building & Construction Workers Welfare",
    state: "all",
    category: "labour",
    benefit: "Multiple benefits worth ₹50,000+",
    benefit_amount_numeric: 5e4,
    eligibility: "Construction workers registered with state BOCW Board. Working for 90+ days in past year. Age 18-60 years.",
    documents: [
      "BOCW registration card",
      "Aadhaar card",
      "Employer/site certificate",
      "Bank account",
      "Photo"
    ],
    apply_link: "https://labour.gov.in/",
    description: "BOCW welfare schemes for registered construction workers include housing, scholarship, accident benefit, medical assistance, maternity benefit, and pension.",
    tags: ["labour", "construction", "welfare", "BOCW", "housing benefit"],
    slug: "building-construction-workers-welfare"
  },
  {
    id: "35",
    name: "Central Government Health Scheme (CGHS)",
    state: "all",
    category: "general",
    benefit: "Comprehensive health coverage (no monetary limit)",
    benefit_amount_numeric: 1e5,
    eligibility: "Central government employees and pensioners residing in CGHS-covered cities. Family members included. Registered beneficiaries only.",
    documents: [
      "CGHS card",
      "Aadhaar card",
      "Service/pension certificate",
      "Family members' details"
    ],
    apply_link: "https://cghs.gov.in/",
    description: "CGHS provides comprehensive healthcare facilities to central government employees and pensioners and their family members through a network of wellness centres across India.",
    tags: ["general", "health", "government employee", "pensioner", "medical"],
    slug: "central-government-health-scheme"
  }
];
const categoryLabels = {
  student: "Student",
  farmer: "Farmer",
  women: "Women",
  "sc-st": "SC/ST",
  labour: "Labour",
  senior: "Senior Citizen",
  disabled: "Differently Abled",
  general: "General"
};
const categoryEmojis = {
  student: "🎓",
  farmer: "🌾",
  women: "👩",
  "sc-st": "🤝",
  labour: "👷",
  senior: "👴",
  disabled: "♿",
  general: "🇮🇳"
};
const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
  "Puducherry",
  "Chandigarh"
];
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
const identity = (arg) => arg;
function useStore(api, selector = identity) {
  const slice = React.useSyncExternalStore(
    api.subscribe,
    React.useCallback(() => selector(api.getState()), [api, selector]),
    React.useCallback(() => selector(api.getInitialState()), [api, selector])
  );
  React.useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;
function loadFromStorage() {
  try {
    const stored = localStorage.getItem("yojnaai_schemes");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
  }
  return defaultSchemes;
}
function saveToStorage(schemes) {
  try {
    localStorage.setItem("yojnaai_schemes", JSON.stringify(schemes));
  } catch {
  }
}
const useSchemesStore = create((set) => ({
  schemes: loadFromStorage(),
  isLoading: false,
  setSchemes: (schemes) => {
    saveToStorage(schemes);
    set({ schemes });
  },
  addScheme: (scheme) => set((state) => {
    const schemes = [...state.schemes, scheme];
    saveToStorage(schemes);
    return { schemes };
  }),
  updateScheme: (scheme) => set((state) => {
    const schemes = state.schemes.map(
      (s) => s.id === scheme.id ? scheme : s
    );
    saveToStorage(schemes);
    return { schemes };
  }),
  deleteScheme: (id) => set((state) => {
    const schemes = state.schemes.filter((s) => s.id !== id);
    saveToStorage(schemes);
    return { schemes };
  }),
  setLoading: (isLoading) => set({ isLoading })
}));
export {
  categoryEmojis as a,
  categoryLabels as c,
  indianStates as i,
  useSchemesStore as u
};
