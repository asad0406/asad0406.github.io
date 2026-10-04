/**
 * Flipkart Minutes Multi-Store Hunter v1.0
 * Injects a floating interactive search GUI directly on flipkart.com to scan all 55 Mumbai dark stores.
 */
(function() {
  if (window.__FK_MINUTES_HUNTER_LOADED__) {
    const existing = document.getElementById('fk-hunter-overlay');
    if (existing) existing.style.display = 'flex';
    console.log('⚡ Flipkart Minutes Hunter already active! Reopened window.');
    return;
  }
  window.__FK_MINUTES_HUNTER_LOADED__ = true;

  const STORES = [["mum_110_wh_hl_01","Airoli (Navi Mumbai)","400708",19.1558,72.9984],["mum_127_wh_hl_01","Andheri East","400069",19.1136,72.8697],["mum_256_wh_hl_01","Andheri West","400053",19.1363,72.8277],["mum_179_wh_hl_01","Bandra West","400050",19.0596,72.8295],["mum_066_wh_hl_01","Bhandup West","400078",19.1511,72.9372],["mum_137_wh_hl_01","Bhayandar East (Golden Nest)","401105",19.296,72.859],["mum_150_wh_hl_01","Bhayandar West","401101",19.3015,72.8505],["mum_005_wh_hl_01","Bhendi Bazaar / Dongri","400009",18.9552,72.8352],["mum_144_wh_hl_01","Borivali East","400066",19.229,72.866],["mum_043_wh_hl_01","Borivali West","400092",19.2307,72.8567],["mum_189_wh_hl_01","Chembur","400071",19.0522,72.8995],["mum_012_wh_hl_01","Chembur East","400071",19.058,72.891],["mum_126_wh_hl_01","Dadar / Prabhadevi","400028",19.0178,72.8478],["mum_075_wh_hl_01","Dahisar West","400068",19.257,72.859],["mum_102_wh_hl_01","Dombivli East (Manpada)","421201",19.215,73.098],["mum_176_wh_hl_01","Dombivli West","421202",19.218,73.076],["mum_063_wh_hl_01","Ghansoli (Sector 8)","400701",19.124,73.003],["mum_129_wh_hl_01","Goregaon East (Gokuldham)","400063",19.172,72.868],["mum_132_wh_hl_01","Goregaon West","400062",19.1663,72.8484],["mum_072_wh_hl_01","Grant Road / Gamdevi","400007",18.9699,72.8142],["mum_018_wh_hl_01","Juhu","400049",19.102,72.827],["mum_158_wh_hl_01","Kalbadevi / Marine Lines","400002",18.9519,72.8281],["mum_203_wh_hl_01","Kalwa","400605",19.201,72.998],["bom_045_wh_hl_01","Kalyan West (Syndicate)","421301",19.243,73.135],["mum_080_wh_hl_01","Kamothe","410209",19.023,73.089],["mum_113_wh_hl_01","Kandivali West","400067",19.2064,72.836],["mum_168_wh_hl_01","Kanjurmarg West","400078",19.131,72.932],["mum_062_wh_hl_01","Kharghar (Sector 20)","410210",19.043,73.069],["mum_108_wh_hl_01","Kopar Khairane (Sector 15)","400709",19.102,73.008],["mum_901_wh_hl_01","Kurla West","400070",19.0726,72.8845],["mum_061_wh_hl_01","Mahim","400016",19.04,72.842],["mum_245_wh_hl_01","Malad East","400097",19.183,72.86],["mum_162_wh_hl_01","Malad West","400064",19.1874,72.8484],["mum_159_wh_hl_01","Mira Road East","401107",19.2846,72.8596],["mum_178_wh_hl_01","Mulund East","400081",19.17,72.966],["mum_104_wh_hl_01","Mulund West (LBS Marg)","400080",19.175,72.949],["mum_160_wh_hl_01","Nalasopara East (Achole Rd)","401209",19.421,72.829],["mum_133_wh_hl_01","Nalasopara West","401203",19.4182,72.8153],["mum_010_wh_hl_01","Nerul (Navi Mumbai)","400706",19.033,73.0197],["mum_067_wh_hl_01","Panvel (Old / New)","410206",18.991,73.118],["mum_025_wh_hl_01","Powai","400076",19.1176,72.906],["mum_109_wh_hl_01","Sanpada (Navi Mumbai)","400705",19.064,73.007],["mum_191_wh_hl_01","Santacruz East","400055",19.081,72.851],["mum_174_wh_hl_01","Seawoods / Karave","400706",19.021,73.018],["mum_011_wh_hl_01","Sion","400022",19.043,72.863],["mum_103_wh_hl_01","Thane West (Ghodbunder Rd / Hiranandani Estate)","400607",19.256,72.973],["mum_190_wh_hl_01","Thane West (Kasarvadavali)","400615",19.268,72.964],["mum_170_wh_hl_01","Thane West (Naupada)","400602",19.1983,72.9781],["mum_037_wh_hl_01","Thane West (Wagle Estate)","400604",19.193,72.952],["mum_172_wh_hl_01","Ulwe (Sector 19)","410206",18.977,73.033],["mum_207_wh_hl_01","Vasai East","401208",19.385,72.842],["mum_117_wh_hl_01","Vasai West","401202",19.385,72.825],["mum_016_wh_hl_02","Vashi (Navi Mumbai)","400703",19.0771,72.9986],["mum_148_wh_hl_01","Virar West (Global City)","401303",19.462,72.809],["mum_071_wh_hl_01","Worli Naka","400018",19.0068,72.818]];

  const STORE_INFO = {
  "mum_110_wh_hl_01": { addr: "Fire Brigade Building, Anna Saheb Patil Marg, Sector 3, Airoli, Navi Mumbai, Maharashtra 400708, India", maps: "https://www.google.com/maps/search/?api=1&query=19.1558,72.9984&query_place_id=ChIJQxKuxE2_5zsRK4hoqFIBZKM" },
  "mum_127_wh_hl_01": { addr: "318 / 41, Andheri - Kurla Rd, Bhim Nagar, Andheri East, Mumbai, Maharashtra 400059, India", maps: "https://www.google.com/maps/search/?api=1&query=19.1136,72.8697&query_place_id=ChIJ994SATzI5zsRNbDgpulEkeA" },
  "mum_256_wh_hl_01": { addr: "Seven, Bunglols Shiv Mandir, Shastri Nagar, Andheri West, Mumbai, Maharashtra 400053, India", maps: "https://www.google.com/maps/search/?api=1&query=19.1363,72.8277&query_place_id=ChIJNeErdRi25zsRPSucyjDjYNk" },
  "mum_179_wh_hl_01": { addr: "4201, Bandra West, Mumbai, Maharashtra 400050, India", maps: "https://www.google.com/maps/search/?api=1&query=19.0596,72.8295&query_place_id=ChIJQS69FxXJ5zsR4XOhFEIHku8" },
  "mum_066_wh_hl_01": { addr: "F-346 Dreams The Mall, Station Rd, Bhandup (W, Sadan wadi, Bhandup West, Mumbai, Maharashtra 400078, India", maps: "https://www.google.com/maps/search/?api=1&query=19.1511,72.9372&query_place_id=ChIJ5WNimfm55zsRlC7IazNogVc" },
  "mum_137_wh_hl_01": { addr: "Silent Park, Sonam Sagar, Indira Nagar, Mira Bhayandar, Maharashtra 401105, India", maps: "https://www.google.com/maps/search/?api=1&query=19.296,72.859&query_place_id=ChIJs2xftTaw5zsRwPjmI3iEYd0" },
  "mum_150_wh_hl_01": { addr: "WING-B, J B C Rd, Bhayandar, Sripal Nagar, Bhayandar West, Mira Bhayandar, Maharashtra 401101, India", maps: "https://www.google.com/maps/search/?api=1&query=19.3015,72.8505&query_place_id=ChIJ9SyXpNKx5zsR86JFuncpYb0" },
  "mum_005_wh_hl_01": { addr: "XR4P+33H, IbrahimMerchant Rd, Mandvi, Mumbai, Maharashtra 400009, India", maps: "https://www.google.com/maps/search/?api=1&query=18.9552,72.8352&query_place_id=ChIJ__8zSDvO5zsRR2JpK-3w5co" },
  "mum_144_wh_hl_01": { addr: "Green Park 1 Park West-4, GREEN PARK-1, Raheja Estate, Kulupwadi, Borivali East, Mumbai, Maharashtra 400066, India", maps: "https://www.google.com/maps/search/?api=1&query=19.229,72.866&query_place_id=ChIJ10mIXc6w5zsRj7yQLsByIPM" },
  "mum_043_wh_hl_01": { addr: "mall court, 2016, near borivali, Shanti Nagar, Borivali West, Mumbai, Maharashtra 400092, India", maps: "https://www.google.com/maps/search/?api=1&query=19.2307,72.8567&query_place_id=ChIJyy4DOtew5zsRebrk2NkBWqI" },
  "mum_189_wh_hl_01": { addr: "Sunder Apartment, B-50, V N Purva Marg, near China Villa, Borla, Union Park, Chembur, Mumbai, Maharashtra 400071, India", maps: "https://www.google.com/maps/search/?api=1&query=19.0522,72.8995&query_place_id=ChIJnS3YsQLG5zsRIWraD2IXinc" },
  "mum_012_wh_hl_01": { addr: "55, Siddharth Colony, Postal Colony, Chembur, Mumbai, Maharashtra 400071, India", maps: "https://www.google.com/maps/search/?api=1&query=19.058,72.891&query_place_id=ChIJtyOPiaPI5zsRBtJMWjMkxyk" },
  "mum_126_wh_hl_01": { addr: "2R9X+447, Dadar East, Dadar, Mumbai, Maharashtra 400014, India", maps: "https://www.google.com/maps/search/?api=1&query=19.0178,72.8478&query_place_id=ChIJjQT6YwDP5zsRmkFTNhBqHaQ" },
  "mum_075_wh_hl_01": { addr: "7V45+PJP, Rajesahaji Marg, Avdhut Nagar, Dahisar East, Mira Bhayandar, Mumbai, Maharashtra 400068, India", maps: "https://www.google.com/maps/search/?api=1&query=19.257,72.859&query_place_id=ChIJO8EtP_uw5zsR5LOunyr51Ug" },
  "mum_102_wh_hl_01": { addr: "4, Patharli Rd, Dombivli, Naka, Mumbai, Kalyan, Maharashtra 421201, India", maps: "https://www.google.com/maps/search/?api=1&query=19.215,73.098&query_place_id=ChIJj7M6dI6V5zsRYLM5hRxgIwY" },
  "mum_176_wh_hl_01": { addr: "639G+4G9, Dr Nemade Galli, Dombivli, Juni, Dombivli West, Kalyan, Maharashtra 421202, India", maps: "https://www.google.com/maps/search/?api=1&query=19.218,73.076&query_place_id=ChIJdZSitiK-5zsRg0N0T6rI5y0" },
  "mum_063_wh_hl_01": { addr: "Venkateswara CHS, Jijamata Nagar, Ghansoli, Navi Mumbai, Maharashtra 400701, India", maps: "https://www.google.com/maps/search/?api=1&query=19.124,73.003&query_place_id=ChIJoTOXEbfA5zsRsLVT6AXHAvg" },
  "mum_129_wh_hl_01": { addr: "B/42, Sai Marg, Gokuldham Colony, Aarey, Mumbai, Maharashtra 400063, India", maps: "https://www.google.com/maps/search/?api=1&query=19.172,72.868&query_place_id=ChIJJaRTx6a35zsRnsiy-AWXvA0" },
  "mum_132_wh_hl_01": { addr: "Sumit Samarth Arcade, F-1, Aarey Rd, near Chintamani Temple, Jawahar Nagar, Goregaon West, Mumbai, Maharashtra 400104, India", maps: "https://www.google.com/maps/search/?api=1&query=19.1663,72.8484&query_place_id=ChIJIawYQw235zsRXux6zf-tBl4" },
  "mum_072_wh_hl_01": { addr: "XR97+XPR, Tardeo Rd, Janata Nagar, Tardeo, Mumbai, Maharashtra 400034, India", maps: "https://www.google.com/maps/search/?api=1&query=18.9699,72.8142&query_place_id=ChIJqVYRKwDP5zsR85Nq76dQUuM" },
  "mum_018_wh_hl_01": { addr: "8, Juhu Tara Rd, opposite J W Marriot Hotel, Juhu Tara, Juhu, Mumbai, Maharashtra 400049, India", maps: "https://www.google.com/maps/search/?api=1&query=19.102,72.827&query_place_id=ChIJLeZxYr_J5zsRKhLe6YkYhhI" },
  "mum_158_wh_hl_01": { addr: "Darshan Building, 63/67, Atmaram Merchant Rd, Marine Lines East, Fanas Wadi, Kalbadevi, Mumbai, Maharashtra 400002, India", maps: "https://www.google.com/maps/search/?api=1&query=18.9519,72.8281&query_place_id=ChIJq5WUnSLO5zsRwI7vnwBJ1I0" },
  "mum_203_wh_hl_01": { addr: "6X2X+77M, Kharegaon, Kalwa, Thane, Maharashtra 400605, India", maps: "https://www.google.com/maps/search/?api=1&query=19.201,72.998&query_place_id=ChIJhXEi7s2-5zsR47ov41lOSOA" },
  "bom_045_wh_hl_01": { addr: "Shree Tirupati Darshan, Rambaug, Kalyan, Maharashtra 421301, India", maps: "https://www.google.com/maps/search/?api=1&query=19.243,73.135&query_place_id=ChIJ1b_CSyuU5zsRyXgA5OcB_so" },
  "mum_080_wh_hl_01": { addr: "PRATIK GEMS, 10, near HDFC Bank, Sector 35, Kamothe, Panvel, Maharashtra 410209, India", maps: "https://www.google.com/maps/search/?api=1&query=19.023,73.089&query_place_id=ChIJLSJOldfp5zsRXI_ErWz4sto" },
  "mum_113_wh_hl_01": { addr: "D-WING, Kandivali, Shankar Pada, Kandivali West, Mumbai, Maharashtra 400067, India", maps: "https://www.google.com/maps/search/?api=1&query=19.2064,72.836&query_place_id=ChIJLcJLmMW25zsRgdZ8gN4Clc8" },
  "mum_168_wh_hl_01": { addr: "N G Royal Park, Saikrupa Society, Indira Nagar, Kanjurmarg East, Mumbai, Maharashtra 400042, India", maps: "https://www.google.com/maps/search/?api=1&query=19.131,72.932&query_place_id=ChIJadJu0YjH5zsRET-8LcvaH8w" },
  "mum_062_wh_hl_01": { addr: "G-42/1, Block G, Sector 12, Kharghar, Panvel, Maharashtra 410210, India", maps: "https://www.google.com/maps/search/?api=1&query=19.043,73.069&query_place_id=ChIJn2fOJhfC5zsRmx6nSVer-_k" },
  "mum_108_wh_hl_01": { addr: "603, Sector 8, Kopar Khairane, Navi Mumbai, Maharashtra 400709, India", maps: "https://www.google.com/maps/search/?api=1&query=19.102,73.008&query_place_id=ChIJE5YxntnA5zsR6Ztx2MoXW3k" },
  "mum_901_wh_hl_01": { addr: "3VFM+3Q5 DEEPAK kumar, Vinobha Bhave Nagar, Kurla West, Kurla, Mumbai, Maharashtra 400070, India", maps: "https://www.google.com/maps/search/?api=1&query=19.0726,72.8845&query_place_id=ChIJadhDDADJ5zsRrqFCX9pCzBw" },
  "mum_061_wh_hl_01": { addr: "Aloo Paroo House, Mahim, Mumbai, Maharashtra 400016, India", maps: "https://www.google.com/maps/search/?api=1&query=19.04,72.842&query_place_id=ChIJB-QJuC3J5zsReaObjLv37qI" },
  "mum_245_wh_hl_01": { addr: "WING-C1, OMKAR SRA, Omkar SRA Rd, शांताराम तलाव, सिद्धेश्वर नगर, कोकणीपाडा, मालाड ईस्ट, मुंबई, महाराष्ट्र 400097, India", maps: "https://www.google.com/maps/search/?api=1&query=19.183,72.86&query_place_id=ChIJ3dVCAgC35zsR8NXKHz2O0wI" },
  "mum_162_wh_hl_01": { addr: "Malad, Malad Foot Over Brg, Malad, Vijaykar Wadi Industrial, Vijaykar Wadi, Malad West, Mumbai, Maharashtra 400064, India", maps: "https://www.google.com/maps/search/?api=1&query=19.1874,72.8484&query_place_id=ChIJsxl12eK25zsRdrhWrQyNXTE" },
  "mum_159_wh_hl_01": { addr: "New Rahul Tower, Mira Nursing Home Ln, Naya Nagar, Mira Road East, Mira Bhayandar, Maharashtra 401107, India", maps: "https://www.google.com/maps/search/?api=1&query=19.2846,72.8596&query_place_id=ChIJ_fIZ006w5zsRo-L_pRPNoL4" },
  "mum_178_wh_hl_01": { addr: "WING-E, Arunoday Nagar, Mulund East, Mumbai, Maharashtra 400081, India", maps: "https://www.google.com/maps/search/?api=1&query=19.17,72.966&query_place_id=ChIJOW1Fc-m45zsRiRaZjfevmdo" },
  "mum_104_wh_hl_01": { addr: "WING-B, Chandraprabha Chs, Mulund, Mulund West, Mumbai, Maharashtra 400080, India", maps: "https://www.google.com/maps/search/?api=1&query=19.175,72.949&query_place_id=ChIJa9bLqvm45zsROL3xjcFKztI" },
  "mum_160_wh_hl_01": { addr: "CRCH+9GG, Nala Sopara, Damodar Nagar, Nalasopara East, Vasai-Virar, Maharashtra 401209, India", maps: "https://www.google.com/maps/search/?api=1&query=19.421,72.829&query_place_id=ChIJ-_FdQj-p5zsRhW4-LcK2JE8" },
  "mum_133_wh_hl_01": { addr: "CR98+53M, St. Depot Rd, Nala Sopara, Lakshmiben Chedda Nagar, Nalasopara West, Vasai-Virar, Maharashtra 401203, India", maps: "https://www.google.com/maps/search/?api=1&query=19.4182,72.8153&query_place_id=ChIJdylTWFup5zsRuAR5WvxB5-E" },
  "mum_010_wh_hl_01": { addr: "A-2, Kamaladevi Birajdar Marg, Nerul East, Sector 21, Nerul, Navi Mumbai, Maharashtra 400706, India", maps: "https://www.google.com/maps/search/?api=1&query=19.033,73.0197&query_place_id=ChIJSzFkqcHD5zsRVDWdxb0KGHo" },
  "mum_067_wh_hl_01": { addr: "JAI GANESH CHS, Forest Colony, Panvel, Maharashtra 410206, India", maps: "https://www.google.com/maps/search/?api=1&query=18.991,73.118&query_place_id=ChIJRTj1jWno5zsR1SOl2-v45us" },
  "mum_025_wh_hl_01": { addr: "26, Ridge Rd, Sector C, Jalvayu Vihar, Powai, Mumbai, Maharashtra 400076, India", maps: "https://www.google.com/maps/search/?api=1&query=19.1176,72.906&query_place_id=ChIJ9xDXF-TH5zsRXgmJVeeNrIc" },
  "mum_109_wh_hl_01": { addr: "3274+HQX, Sector 2 Sanpada Rd, Sector 2, Sanpada, Navi Mumbai, Maharashtra 400705, India", maps: "https://www.google.com/maps/search/?api=1&query=19.064,73.007&query_place_id=ChIJ5VVhPEXB5zsRrP7x-25O-L0" },
  "mum_191_wh_hl_01": { addr: "Bridge, 5, Datta Mandir Rd, Vakola, Santacruz East, Mumbai, Maharashtra 400055, India", maps: "https://www.google.com/maps/search/?api=1&query=19.081,72.851&query_place_id=ChIJpXhAGADJ5zsRbS8yFyZxsFQ" },
  "mum_174_wh_hl_01": { addr: "Grand Central, 31-32, Seawood Fountain, Nerul East, Sector 30, Nerul, Navi Mumbai, Maharashtra 400706, India", maps: "https://www.google.com/maps/search/?api=1&query=19.021,73.018&query_place_id=ChIJVQkxn73D5zsRRBt7GoGwBPQ" },
  "mum_011_wh_hl_01": { addr: "16/7, Rd Number 6, Sindhi Colony, Sion, Mumbai, Maharashtra 400022, India", maps: "https://www.google.com/maps/search/?api=1&query=19.043,72.863&query_place_id=ChIJoefPA9LI5zsR64PaWvR7kqs" },
  "mum_103_wh_hl_01": { addr: "GANGOTRI GLACIAR, VIJAY NAGRI, कावेसर, ठाणे वेस्ट, ठाणे, महाराष्ट्र 400615, India", maps: "https://www.google.com/maps/search/?api=1&query=19.256,72.973&query_place_id=ChIJRfqj0ZS75zsRUC-Zt83E2Vk" },
  "mum_190_wh_hl_01": { addr: "Kasarvadavali, Thane West Bldg No 3, Jasmine, Parijat Garden, Kasarvadavali, Thane West, Thane, Maharashtra 400615, India", maps: "https://www.google.com/maps/search/?api=1&query=19.268,72.964&query_place_id=ChIJOXaC89G75zsRtLbEVE7Ikg4" },
  "mum_170_wh_hl_01": { addr: "9, Tembhi Naka, Aambe, Ghosale Lake, Thane, Maharashtra 400601, India", maps: "https://www.google.com/maps/search/?api=1&query=19.1983,72.9781&query_place_id=ChIJ7XcwLTu55zsR3cKrxkgSzso" },
  "mum_037_wh_hl_01": { addr: "97, Rd Number 18, Neheru Nagar, Wagle Industrial Estate, Thane West, Thane, Maharashtra 400604, India", maps: "https://www.google.com/maps/search/?api=1&query=19.193,72.952&query_place_id=ChIJDQJ11QW55zsRDIx8e0N4FiY" },
  "mum_172_wh_hl_01": { addr: "24, Sector 23, Ulwe, Mumbai, Wahal, Maharashtra 410206, India", maps: "https://www.google.com/maps/search/?api=1&query=18.977,73.033&query_place_id=ChIJiVHeRyTD5zsRDSEWt6YYs-o" },
  "mum_207_wh_hl_01": { addr: "9RMR+XQ Vasai-Virar, Maharashtra, India", maps: "https://www.google.com/maps/search/?api=1&query=19.385,72.842&query_place_id=Egs3SkZKOVJNUitYUSImOiQKCg2Q6o0LFaDOaisQChoUChIJe1jBa5Wu5zsRRVGqS6lTT4Y" },
  "mum_117_wh_hl_01": { addr: "A10, Ambadi Rd, Jayraj Nagar, Sai Nagar, Vasai West, Vasai-Virar, Maharashtra 401202, India", maps: "https://www.google.com/maps/search/?api=1&query=19.385,72.825&query_place_id=ChIJlVptKrmu5zsRlrPzNNW13zg" },
  "mum_016_wh_hl_02": { addr: "Shop No B2, 3 1, Juhu Nagar, Sector-16, Vashi, Navi Mumbai, Maharashtra 400703, India", maps: "https://www.google.com/maps/search/?api=1&query=19.0771,72.9986&query_place_id=ChIJiVDpRArB5zsRg7du4PAjSbM" },
  "mum_148_wh_hl_01": { addr: "FR65+MJR, Kolwadi, Vartak Ward, Virar West, Vasai-Virar, Maharashtra 401303, India", maps: "https://www.google.com/maps/search/?api=1&query=19.462,72.809&query_place_id=ChIJz-N9O4mp5zsR_BXBUAU9eP8" },
  "mum_071_wh_hl_01": { addr: "Sukhada Apartment Wing-A, 239, Dr Annie Besant Rd, B Wing, Worli Shivaji Nagar, Worli, Mumbai, Maharashtra 400030, India", maps: "https://www.google.com/maps/search/?api=1&query=19.0068,72.818&query_place_id=ChIJ-WDiDJfO5zsRCBQ4MMhKUTc" }
};
const FK_HEADERS = {
    'content-type': 'application/json',
    'flipkart_secure': 'true',
    'x-user-agent': navigator.userAgent + ' FKUA/msite/0.0.4/msite/Mobile'
  };

  let isScanning = false;
  let abortScan = false;
  let searchResults = [];

  // 1. Inject Styles
  const styleEl = document.createElement('style');
  styleEl.id = 'fk-hunter-styles';
  styleEl.textContent = `
    #fk-hunter-overlay {
      position: fixed;
      top: 24px;
      right: 24px;
      width: 460px;
      max-width: calc(100vw - 48px);
      max-height: calc(100vh - 48px);
      background: #ffffff;
      border-radius: 14px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25), 0 2px 10px rgba(0, 0, 0, 0.08);
      z-index: 999999999;
      display: flex;
      flex-direction: column;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      border: 1px solid #cbd5e1;
      overflow: hidden;
      animation: fkFadeIn 0.25s ease-out;
    }
    @keyframes fkFadeIn {
      from { opacity: 0; transform: translateY(-10px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .fk-h-header {
      background: linear-gradient(135deg, #1e3a8a 0%, #2874f0 100%);
      color: #ffffff;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      user-select: none;
    }
    .fk-h-title {
      font-size: 14px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .fk-h-badge {
      background: #ffe500;
      color: #713f12;
      font-size: 10px;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 10px;
    }
    .fk-h-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .fk-h-btn {
      background: transparent;
      border: none;
      color: #ffffff;
      font-size: 16px;
      cursor: pointer;
      line-height: 1;
      opacity: 0.8;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .fk-h-btn:hover { opacity: 1; background: rgba(255,255,255,0.2); }

    .fk-h-body {
      padding: 14px 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .fk-h-input-group {
      display: flex;
      gap: 8px;
    }
    .fk-h-input {
      flex: 1;
      padding: 8px 12px;
      border-radius: 8px;
      border: 1.5px solid #cbd5e1;
      font-size: 13px;
      outline: none;
      transition: border-color 0.15s;
    }
    .fk-h-input:focus { border-color: #2874f0; }
    .fk-h-submit {
      background: #2874f0;
      color: #ffffff;
      border: none;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.15s;
      white-space: nowrap;
    }
    .fk-h-submit:hover { background: #1a5ac9; }
    .fk-h-submit:disabled { background: #94a3b8; cursor: not-allowed; }

    .fk-h-options {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 11.5px;
      color: #475569;
    }
    .fk-h-check {
      display: flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
    }
    .fk-h-select {
      padding: 3px 6px;
      border-radius: 6px;
      border: 1px solid #cbd5e1;
      font-size: 11px;
      outline: none;
      background: #f8fafc;
    }

    .fk-h-progress-bar-bg {
      width: 100%;
      height: 6px;
      background: #e2e8f0;
      border-radius: 3px;
      overflow: hidden;
      display: none;
    }
    .fk-h-progress-bar-fill {
      width: 0%;
      height: 100%;
      background: #10b981;
      transition: width 0.2s ease;
    }
    .fk-h-status {
      font-size: 11px;
      color: #64748b;
      display: flex;
      justify-content: space-between;
      min-height: 14px;
    }

    .fk-h-summary {
      display: none;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      background: #f8fafc;
      padding: 8px;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }
    .fk-h-sum-item { text-align: center; }
    .fk-h-sum-val { font-size: 14px; font-weight: 800; color: #0f172a; }
    .fk-h-sum-lbl { font-size: 9.5px; color: #64748b; text-transform: uppercase; font-weight: 600; }

    .fk-h-results-box {
      max-height: 240px;
      overflow-y: auto;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      display: none;
    }
    .fk-h-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
    }
    .fk-h-table th {
      background: #f1f5f9;
      padding: 6px 8px;
      text-align: left;
      font-weight: 700;
      color: #475569;
      position: sticky;
      top: 0;
      z-index: 2;
    }
    .fk-h-table td {
      padding: 6px 8px;
      border-bottom: 1px solid #f1f5f9;
      color: #1e293b;
    }
    .fk-h-table tr:hover td { background: #f8fafc; }
    .fk-h-price { font-weight: 800; color: #059669; }
    .fk-h-stock { font-size: 9.5px; font-weight: 700; padding: 1px 4px; border-radius: 4px; }
    .fk-h-in { background: #ecfdf5; color: #065f46; }
    .fk-h-out { background: #fef2f2; color: #991b1b; }

    .fk-h-footer {
      padding: 10px 16px;
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .fk-h-export-btn {
      background: #eff6ff;
      color: #2874f0;
      border: 1px solid #bfdbfe;
      padding: 5px 10px;
      border-radius: 6px;
      font-size: 11.5px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s;
    }
    .fk-h-export-btn:hover { background: #2874f0; color: #ffffff; }

    /* Reopen Floating Launcher */
    #fk-hunter-launcher {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #2874f0;
      color: #ffffff;
      padding: 10px 16px;
      border-radius: 30px;
      box-shadow: 0 8px 24px rgba(40, 116, 240, 0.4);
      z-index: 999999998;
      cursor: pointer;
      font-weight: 800;
      font-size: 13px;
      display: none;
      align-items: center;
      gap: 6px;
      user-select: none;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    }
    #fk-hunter-launcher:hover { background: #1a5ac9; }
  `;
  document.head.appendChild(styleEl);

  // 2. Inject HTML Overlay
  const overlay = document.createElement('div');
  overlay.id = 'fk-hunter-overlay';
  overlay.innerHTML = `
    <div class="fk-h-header">
      <div class="fk-h-title">
        <span>⚡ Minutes Hunter</span>
        <span class="fk-h-badge">55 STORES</span>
      </div>
      <div class="fk-h-actions">
        <button class="fk-h-btn" id="fk-h-min" title="Minimize">−</button>
        <button class="fk-h-btn" id="fk-h-close" title="Close">✕</button>
      </div>
    </div>
    <div class="fk-h-body">
      <div class="fk-h-input-group">
        <input type="text" id="fk-h-query" class="fk-h-input" placeholder="Search product (e.g. milk, coke, butter)..." />
        <button id="fk-h-start-btn" class="fk-h-submit">Scan Stores</button>
      </div>
      <div class="fk-h-options">
        <label class="fk-h-check">
          <input type="checkbox" id="fk-h-instock" checked />
          <span>In-Stock Only</span>
        </label>
        <div>
          <span>Store: </span>
          <select id="fk-h-store" class="fk-h-select">
            <option value="all">All 55 Stores</option>
            ${STORES.map((s, i) => `<option value="${i}">${s[1]}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="fk-h-progress-bar-bg" id="fk-h-pbar-bg">
        <div class="fk-h-progress-bar-fill" id="fk-h-pbar"></div>
      </div>
      <div class="fk-h-status" id="fk-h-status">
        <span>Ready to search.</span>
        <span id="fk-h-count"></span>
      </div>
      <div class="fk-h-summary" id="fk-h-summary">
        <div class="fk-h-sum-item">
          <div class="fk-h-sum-val" id="fk-sum-stores">0</div>
          <div class="fk-h-sum-lbl">Stores Found</div>
        </div>
        <div class="fk-h-sum-item">
          <div class="fk-h-sum-val" id="fk-sum-items">0</div>
          <div class="fk-h-sum-lbl">Items</div>
        </div>
        <div class="fk-h-sum-item">
          <div class="fk-h-sum-val" id="fk-sum-min" style="color: #059669;">-</div>
          <div class="fk-h-sum-lbl">Min Price</div>
        </div>
      </div>
      <div class="fk-h-results-box" id="fk-h-results">
        <table class="fk-h-table">
          <thead>
            <tr>
              <th>Locality</th>
              <th>SLA</th>
              <th>Product</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody id="fk-h-table-body"></tbody>
        </table>
      </div>
    </div>
    <div class="fk-h-footer">
      <button class="fk-h-export-btn" id="fk-h-csv">⬇ Export CSV</button>
      <button class="fk-h-export-btn" id="fk-h-json">📋 Copy JSON</button>
      <button class="fk-h-export-btn" id="fk-h-page">🌐 Results</button>
      <button class="fk-h-export-btn" id="fk-h-map">🗺️ Map</button>
    </div>
  `;
  document.body.appendChild(overlay);

  // Drag the panel by its header (buttons are excluded)
  const header = overlay.querySelector('.fk-h-header');
  header.style.cursor = 'move';
  header.addEventListener('mousedown', (e) => {
    if (e.target.closest('button')) return;
    const rect = overlay.getBoundingClientRect();
    const offX = e.clientX - rect.left, offY = e.clientY - rect.top;
    overlay.style.right = 'auto';
    overlay.style.bottom = 'auto';
    const onMove = (ev) => {
      overlay.style.left = Math.max(0, ev.clientX - offX) + 'px';
      overlay.style.top = Math.max(0, ev.clientY - offY) + 'px';
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    e.preventDefault();
  });

  // 3. Inject Launcher Pill
  const launcher = document.createElement('div');
  launcher.id = 'fk-hunter-launcher';
  launcher.innerHTML = `⚡ <span>Minutes Hunter</span>`;
  document.body.appendChild(launcher);

  // UI Event Handlers
  const queryInput = document.getElementById('fk-h-query');
  const startBtn = document.getElementById('fk-h-start-btn');
  const closeBtn = document.getElementById('fk-h-close');
  const minBtn = document.getElementById('fk-h-min');
  const statusEl = document.getElementById('fk-h-status');
  const pbarBg = document.getElementById('fk-h-pbar-bg');
  const pbar = document.getElementById('fk-h-pbar');
  const resultsBox = document.getElementById('fk-h-results');
  const tableBody = document.getElementById('fk-h-table-body');
  const summaryBox = document.getElementById('fk-h-summary');
  const csvBtn = document.getElementById('fk-h-csv');
  const jsonBtn = document.getElementById('fk-h-json');

  closeBtn.onclick = () => {
    overlay.style.display = 'none';
    launcher.style.display = 'flex';
  };
  minBtn.onclick = () => {
    overlay.style.display = 'none';
    launcher.style.display = 'flex';
  };
  launcher.onclick = () => {
    overlay.style.display = 'flex';
    launcher.style.display = 'none';
  };

  queryInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') startBtn.click();
  });

  // Main Search Runner
  startBtn.onclick = async () => {
    const query = queryInput.value.trim();
    if (!query) {
      queryInput.focus();
      return;
    }

    if (isScanning) {
      abortScan = true;
      startBtn.textContent = 'Stopping...';
      startBtn.disabled = true;
      return;
    }

    isScanning = true;
    abortScan = false;
    startBtn.textContent = '⏹ Stop';
    startBtn.style.background = '#ef4444';
    pbarBg.style.display = 'block';
    pbar.style.width = '0%';
    resultsBox.style.display = 'block';
    summaryBox.style.display = 'grid';
    tableBody.innerHTML = '';
    searchResults = [];

    const inStockOnly = document.getElementById('fk-h-instock').checked;
    const storeChoice = document.getElementById('fk-h-store').value;
    const targetStores = storeChoice === 'all' ? STORES : [STORES[parseInt(storeChoice, 10)]];

    let storesWithItems = 0;
    let minPriceFound = 999999;
    let currentHost = 'https://1.rome.api.flipkart.com';

    for (let i = 0; i < targetStores.length; i++) {
      if (abortScan) break;
      const [sid, loc, pin, lat, lon] = targetStores[i];
      const pct = Math.round(((i + 1) / targetStores.length) * 100);
      pbar.style.width = `${pct}%`;
      statusEl.firstElementChild.textContent = `[${i + 1}/${targetStores.length}] Checking ${loc}...`;

      try {
        // Location update
        const locPayload = {
          geoLocation: { latitude: lat, longitude: lon },
          addressInfo: { addressTitle: loc, addressLine1: `${loc}, Mumbai`, city: 'Mumbai', state: 'Maharashtra', pincode: pin },
          marketplace: 'HYPERLOCAL'
        };

        let locRes = await fetch(`${currentHost}/api/4/location/update`, {
          method: 'POST',
          credentials: 'include',
          headers: FK_HEADERS,
          body: JSON.stringify(locPayload)
        });

        if (locRes.status === 406) {
          const rJson = await locRes.json();
          const dcId = rJson?.RESPONSE?.id;
          if (dcId) {
            currentHost = `https://${dcId}.rome.api.flipkart.com`;
            locRes = await fetch(`${currentHost}/api/4/location/update`, {
              method: 'POST',
              credentials: 'include',
              headers: FK_HEADERS,
              body: JSON.stringify(locPayload)
            });
          }
        }

        // Product search — paginated with smart stop conditions:
        // stops when: API returns 0 products, all products are duplicates (API looping),
        // no nextPageContext returned, or hard safety cap of 20 pages is hit.

        // Helper: extract all products from a response regardless of widget shape
        function extractProducts(slots) {
          const products = [];
          for (const slot of slots) {
            const d = slot.widget?.data;
            if (!d) continue;
            // Cover all known Flipkart widget shapes
            const candidates = [
              ...(d.products || []),
              ...(d.styledText?.products || []),
              ...(d.productList?.products || []),
              ...(d.searchResults?.products || []),
            ];
            products.push(...candidates);
          }
          return products;
        }

        const MAX_PAGES = 30;          // hard safety cap
        const seenUrls = new Set();    // dedup tracker
        let paginationContextMap = null;
        let hasMorePages = true;
        let pageNum = 1;
        let storeAdded = false;
        let liveSla = 'Paused';

        while (!abortScan && pageNum <= MAX_PAGES && hasMorePages) {
          const pageUri = '/search?q=' + encodeURIComponent(query) + '&marketplace=HYPERLOCAL';

          const pageContext = pageNum === 1
            ? { fetchSeoData: true, networkSpeed: 10000 }
            : {
                paginationContextMap,
                paginatedFetch: true,
                pageNumber: pageNum,
                infinitePage: true,
                fetchAllPages: false,
                fetchSeoData: false,
                networkSpeed: 10000
              };

          const pageRes = await fetch(`${currentHost}/api/4/page/fetch?cacheFirst=false`, {
            method: 'POST',
            credentials: 'include',
            headers: FK_HEADERS,
            body: JSON.stringify({
              pageUri,
              pageContext,
              requestContext: { type: 'BROWSE_PAGE' }
            })
          });

          if (pageRes.status !== 200) break;

          const pJson = await pageRes.json();
          const pageData = pJson.RESPONSE?.pageData || {};
          const meta = pageData.trackingContext?.meta || {};
          const slots = pJson.RESPONSE?.slots || [];
          const rawSla = meta.slaInSec;
          liveSla = rawSla ? `${Math.round(rawSla / 60)}m` : liveSla;

          // Capture pagination tokens
          paginationContextMap = pageData.paginationContextMap || null;
          hasMorePages = pageData.hasMorePages ?? false;

          const products = extractProducts(slots);
          if (products.length === 0) break; // API returned empty page — done

          // Count truly new products on this page — stop if duplicate
          let newOnPage = 0;
          for (const p of products) {
            const val = p.productInfo?.value || {};
            const title = val.title || val.titles?.title || 'Unknown';
            const price = val.pricing?.finalPrice?.value ?? val.pricing?.finalPrice?.decimalValue ?? null;
            const avail = val.availability?.displayState || 'UNKNOWN';

            // Build a dedup key from URL or title+price
            const dedupKey = val.smartUrl || val.baseUrl || (title + '|' + (price ?? ''));
            if (seenUrls.has(dedupKey)) continue;
            seenUrls.add(dedupKey);
            newOnPage++;

            if (inStockOnly && avail !== 'IN_STOCK') continue;

            const rawImg = val.media?.images?.[0]?.url || '';
            const imageUrl = rawImg
              ? rawImg.replace('{@width}', '100').replace('{@height}', '100').replace('{@quality}', '80')
              : '';
            const brand = val.productBrand || '';
            const mrp = val.pricing?.mrp?.value ?? null;
            const discount = (mrp && price && mrp > price) ? Math.round(((mrp - price) / mrp) * 100) : 0;
            const savings = (mrp && price && mrp > price) ? (mrp - price) : 0;

            const item = {
              storeId: meta.storeId || sid,
              locality: loc,
              pincode: pin,
              deliveryLocation: STORE_INFO[sid]?.addr || '',
              mapsUrl: STORE_INFO[sid]?.maps || '',
              liveSla,
              title,
              brand,
              imageUrl,
              productUrl: val.smartUrl || (val.baseUrl ? 'https://www.flipkart.com' + val.baseUrl : ''),
              price,
              mrp,
              discount,
              savings,
              availability: avail
            };

            searchResults.push(item);
            storeAdded = true;

            if (price && price < minPriceFound) minPriceFound = price;

            // Append row to UI table
            const row = document.createElement('tr');
            row.innerHTML = `
              <td><b>${loc}</b></td>
              <td>⚡ ${liveSla}</td>
              <td>${title}</td>
              <td class="fk-h-price">${price ? '₹' + price : '-'}</td>
              <td><span class="fk-h-stock ${avail === 'IN_STOCK' ? 'fk-h-in' : 'fk-h-out'}">${avail === 'IN_STOCK' ? 'In Stock' : 'Out'}</span></td>
            `;
            tableBody.appendChild(row);
          }

          // If every product on this page was already seen, stop
          if (newOnPage === 0) break;

          // If no pagination map exists for subsequent pages, stop
          if (!paginationContextMap && pageNum > 1) break;

          // Update counters live after each page
          document.getElementById('fk-sum-stores').textContent = storesWithItems + (storeAdded ? 1 : 0);
          document.getElementById('fk-sum-items').textContent = searchResults.length;
          document.getElementById('fk-sum-min').textContent = minPriceFound < 999999 ? `₹${minPriceFound}` : '-';
          statusEl.lastElementChild.textContent = `${searchResults.length} items found`;
          statusEl.firstElementChild.textContent = `[${i + 1}/${targetStores.length}] ${loc} — page ${pageNum}...`;

          pageNum++;
          if (!abortScan && hasMorePages) {
            await new Promise(r => setTimeout(r, 200)); // small delay between pages
          }
        }

        if (storeAdded) storesWithItems++;
      } catch (err) {
        console.warn('Scan error for', loc, err);
      }

      if (i < targetStores.length - 1) {
        await new Promise(r => setTimeout(r, 300));
      }
    }

    isScanning = false;
    startBtn.textContent = 'Scan Stores';
    startBtn.style.background = '#2874f0';
    startBtn.disabled = false;
    statusEl.firstElementChild.textContent = abortScan ? 'Scan paused.' : `✓ Done! Scanned ${targetStores.length} stores.`;
    window.fkResults = searchResults;
  };

  // CSV Export

  function openBlankResultsTable(items, query) {
    const win = window.open('', '_blank');
    if (!win) return alert('Popup blocked! Please allow popups for flipkart.com to view results.');
    let html = "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>⚡ Flipkart Minutes Hunter — Search Results</title>\n  <style>\n    :root {\n      --primary: #2874f0;\n      --primary-dark: #1a5ac9;\n      --fk-yellow: #ffe500;\n      --bg: #f8fafc;\n      --surface: #ffffff;\n      --border: #e2e8f0;\n      --border-dark: #cbd5e1;\n      --text: #0f172a;\n      --text-muted: #64748b;\n      --green: #16a34a;\n      --green-bg: #ecfdf5;\n      --red: #dc2626;\n      --red-bg: #fef2f2;\n    }\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body {\n      font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif;\n      background: var(--bg);\n      color: var(--text);\n      line-height: 1.45;\n      padding-bottom: 60px;\n    }\n\n    /* Sticky Top Header */\n    header {\n      position: sticky;\n      top: 0;\n      background: #ffffff;\n      border-bottom: 1px solid var(--border);\n      padding: 12px 24px;\n      z-index: 100;\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      flex-wrap: wrap;\n      gap: 12px;\n      box-shadow: 0 1px 3px rgba(0,0,0,0.04);\n    }\n    .brand-wrap {\n      display: flex;\n      align-items: center;\n      gap: 10px;\n      flex-wrap: wrap;\n    }\n    .brand-logo {\n      font-size: 16px;\n      font-weight: 800;\n      color: var(--text);\n      display: flex;\n      align-items: center;\n      gap: 6px;\n    }\n    .brand-badge {\n      background: var(--fk-yellow);\n      color: #713f12;\n      font-size: 11px;\n      font-weight: 800;\n      padding: 2px 8px;\n      border-radius: 12px;\n    }\n    .query-tag {\n      background: #eff6ff;\n      color: var(--primary);\n      border: 1px solid #bfdbfe;\n      font-size: 12px;\n      font-weight: 700;\n      padding: 3px 10px;\n      border-radius: 14px;\n    }\n    .header-actions {\n      display: flex;\n      align-items: center;\n      gap: 8px;\n    }\n    .btn {\n      font-size: 12px;\n      font-weight: 700;\n      padding: 7px 12px;\n      border-radius: 8px;\n      cursor: pointer;\n      border: 1px solid var(--border-dark);\n      background: #ffffff;\n      color: #334155;\n      transition: all 0.15s ease;\n      display: inline-flex;\n      align-items: center;\n      gap: 6px;\n      text-decoration: none;\n    }\n    .btn:hover {\n      background: #f1f5f9;\n      border-color: #94a3b8;\n    }\n    .btn-primary {\n      background: var(--primary);\n      color: #ffffff;\n      border-color: var(--primary);\n    }\n    .btn-primary:hover {\n      background: var(--primary-dark);\n      border-color: var(--primary-dark);\n    }\n\n    /* Stats Ribbon */\n    .stats-ribbon {\n      display: grid;\n      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n      gap: 12px;\n      padding: 14px 24px;\n      max-width: 1600px;\n      margin: 0 auto;\n    }\n    .stat-card {\n      background: var(--surface);\n      border: 1px solid var(--border);\n      border-radius: 10px;\n      padding: 10px 14px;\n      display: flex;\n      flex-direction: column;\n    }\n    .stat-val {\n      font-size: 18px;\n      font-weight: 800;\n      color: var(--text);\n    }\n    .stat-lbl {\n      font-size: 11px;\n      color: var(--text-muted);\n      font-weight: 600;\n      text-transform: uppercase;\n      letter-spacing: 0.03em;\n    }\n\n    /* Controls Bar */\n    .controls-bar {\n      position: sticky;\n      top: 57px;\n      background: #ffffff;\n      border-bottom: 1px solid var(--border);\n      border-top: 1px solid var(--border);\n      padding: 10px 24px;\n      z-index: 90;\n      display: flex;\n      align-items: center;\n      gap: 10px;\n      flex-wrap: wrap;\n      box-shadow: 0 2px 4px rgba(0,0,0,0.02);\n    }\n    .search-input {\n      flex: 2;\n      min-width: 240px;\n      padding: 8px 12px 8px 34px;\n      border-radius: 8px;\n      border: 1px solid var(--border-dark);\n      font-size: 13px;\n      outline: none;\n      background: #ffffff url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%2394a3b8\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>') no-repeat 10px center;\n      transition: border-color 0.15s;\n    }\n    .search-input:focus {\n      border-color: var(--primary);\n    }\n    .select-control {\n      padding: 8px 12px;\n      border-radius: 8px;\n      border: 1px solid var(--border-dark);\n      font-size: 12.5px;\n      color: #1e293b;\n      background: #ffffff;\n      cursor: pointer;\n      outline: none;\n    }\n    .select-control:focus {\n      border-color: var(--primary);\n    }\n\n    /* Table Container */\n    .table-wrap {\n      max-width: 1600px;\n      margin: 16px auto;\n      padding: 0 24px;\n      overflow-x: auto;\n    }\n    .data-table {\n      width: 100%;\n      border-collapse: separate;\n      border-spacing: 0;\n      background: #ffffff;\n      border: 1px solid var(--border);\n      border-radius: 12px;\n      overflow: hidden;\n      font-size: 13px;\n      box-shadow: 0 1px 3px rgba(0,0,0,0.03);\n    }\n    .data-table th {\n      background: #f8fafc;\n      color: #475569;\n      font-weight: 700;\n      font-size: 11.5px;\n      text-transform: uppercase;\n      letter-spacing: 0.04em;\n      padding: 10px 14px;\n      text-align: left;\n      border-bottom: 1px solid var(--border);\n      cursor: pointer;\n      user-select: none;\n      white-space: nowrap;\n      transition: background 0.15s;\n    }\n    .data-table th:hover {\n      background: #f1f5f9;\n      color: var(--primary);\n    }\n    .data-table th.sorted-asc::after {\n      content: ' ↑';\n      color: var(--primary);\n    }\n    .data-table th.sorted-desc::after {\n      content: ' ↓';\n      color: var(--primary);\n    }\n    .data-table td {\n      padding: 10px 14px;\n      border-bottom: 1px solid var(--border);\n      vertical-align: middle;\n      color: #1e293b;\n    }\n    .data-table tr:last-child td {\n      border-bottom: none;\n    }\n    .data-table tr:hover td {\n      background: #f8fafc;\n    }\n\n    /* Table Cell Specifics */\n    .row-index {\n      color: var(--text-muted);\n      font-weight: 600;\n      font-size: 11.5px;\n      width: 32px;\n    }\n    .prod-cell {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      max-width: 460px;\n    }\n    .prod-img {\n      width: 44px;\n      height: 44px;\n      border-radius: 8px;\n      object-fit: contain;\n      background: #f8fafc;\n      border: 1px solid var(--border);\n      flex-shrink: 0;\n    }\n    .prod-img-placeholder {\n      width: 44px;\n      height: 44px;\n      border-radius: 8px;\n      background: #f1f5f9;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 20px;\n      color: #94a3b8;\n      flex-shrink: 0;\n      border: 1px solid var(--border);\n    }\n    .prod-meta {\n      display: flex;\n      flex-direction: column;\n      gap: 2px;\n    }\n    .prod-title {\n      font-weight: 600;\n      color: #0f172a;\n      text-decoration: none;\n      line-height: 1.35;\n      display: -webkit-box;\n      -webkit-line-clamp: 2;\n      -webkit-box-orient: vertical;\n      overflow: hidden;\n    }\n    .prod-title:hover {\n      color: var(--primary);\n    }\n    .prod-brand {\n      font-size: 10.5px;\n      font-weight: 700;\n      color: #64748b;\n      text-transform: uppercase;\n      letter-spacing: 0.03em;\n    }\n\n    .locality-title {\n      font-weight: 700;\n      color: #0f172a;\n      font-size: 13px;\n    }\n    .store-pill {\n      font-family: ui-monospace, SFMono-Regular, monospace;\n      font-size: 10px;\n      background: #f1f5f9;\n      color: #475569;\n      padding: 1px 5px;\n      border-radius: 4px;\n      margin-top: 2px;\n      display: inline-block;\n    }\n\n    .sla-badge {\n      display: inline-flex;\n      align-items: center;\n      gap: 3px;\n      background: #fef08a;\n      color: #854d0e;\n      font-weight: 800;\n      font-size: 11.5px;\n      padding: 2px 7px;\n      border-radius: 10px;\n      white-space: nowrap;\n    }\n\n    .price-val {\n      font-weight: 800;\n      font-size: 14.5px;\n      color: #0f172a;\n      white-space: nowrap;\n    }\n    .mrp-val {\n      font-size: 11.5px;\n      color: #94a3b8;\n      text-decoration: line-through;\n      margin-top: 1px;\n    }\n    .save-pill {\n      font-size: 10px;\n      font-weight: 700;\n      color: var(--green);\n      background: var(--green-bg);\n      padding: 1px 5px;\n      border-radius: 4px;\n      display: inline-block;\n      margin-top: 2px;\n      white-space: nowrap;\n    }\n\n    .stock-badge {\n      display: inline-flex;\n      align-items: center;\n      gap: 4px;\n      font-size: 11px;\n      font-weight: 700;\n      padding: 2px 8px;\n      border-radius: 12px;\n      white-space: nowrap;\n    }\n    .stock-in {\n      background: var(--green-bg);\n      color: var(--green);\n    }\n    .stock-out {\n      background: var(--red-bg);\n      color: var(--red);\n    }\n\n    .map-btn {\n      color: var(--primary);\n      text-decoration: none;\n      font-weight: 700;\n      font-size: 11.5px;\n      white-space: nowrap;\n      display: inline-flex;\n      align-items: center;\n      gap: 3px;\n    }\n    .map-btn:hover {\n      text-decoration: underline;\n    }\n\n    .empty-state {\n      text-align: center;\n      padding: 60px 20px;\n      color: var(--text-muted);\n      font-size: 14px;\n      display: none;\n    }\n\n    @media (max-width: 768px) {\n      header { padding: 10px 14px; }\n      .controls-bar { padding: 10px 14px; top: 50px; }\n      .table-wrap { padding: 0 10px; }\n      .search-input { width: 100%; min-width: 100%; }\n      .select-control { flex: 1; }\n    }\n  </style>\n</head>\n<body>\n\n  <header>\n    <div class=\"brand-wrap\">\n      <div class=\"brand-logo\">\n        <span>⚡ Flipkart Minutes Hunter</span>\n        <span class=\"brand-badge\">LIVE RESULTS</span>\n      </div>\n      <span class=\"query-tag\" id=\"queryTag\">Query: -</span>\n    </div>\n    <div class=\"header-actions\">\n      <button class=\"btn btn-primary\" id=\"csvBtn\" onclick=\"exportCSV()\">⬇ Export CSV</button>\n      <button class=\"btn\" id=\"jsonBtn\" onclick=\"copyJSON()\">📋 Copy JSON</button>\n      <button class=\"btn\" onclick=\"window.print()\">🖨️ Print</button>\n    </div>\n  </header>\n\n  <div class=\"stats-ribbon\">\n    <div class=\"stat-card\">\n      <span class=\"stat-val\" id=\"statItems\">0</span>\n      <span class=\"stat-lbl\">Matching Items</span>\n    </div>\n    <div class=\"stat-card\">\n      <span class=\"stat-val\" id=\"statStores\">0</span>\n      <span class=\"stat-lbl\">Dark Stores Found</span>\n    </div>\n    <div class=\"stat-card\">\n      <span class=\"stat-val\" id=\"statMinPrice\">-</span>\n      <span class=\"stat-lbl\">Lowest Price</span>\n    </div>\n    <div class=\"stat-card\">\n      <span class=\"stat-val\" id=\"statBestSla\">-</span>\n      <span class=\"stat-lbl\">Fastest Delivery</span>\n    </div>\n  </div>\n\n  <div class=\"controls-bar\">\n    <input type=\"text\" id=\"searchInput\" class=\"search-input\" placeholder=\"Search products, brand, locality, pincode...\" oninput=\"onFilterChange()\" />\n    <select id=\"localityFilter\" class=\"select-control\" onchange=\"onFilterChange()\">\n      <option value=\"\">All Localities</option>\n    </select>\n    <select id=\"stockFilter\" class=\"select-control\" onchange=\"onFilterChange()\">\n      <option value=\"\">All Stock</option>\n      <option value=\"IN_STOCK\">In Stock Only</option>\n      <option value=\"OUT_OF_STOCK\">Out of Stock</option>\n    </select>\n    <select id=\"sortSelect\" class=\"select-control\" onchange=\"onSortChange()\">\n      <option value=\"price-asc\">💵 Price: Low to High</option>\n      <option value=\"price-desc\">💎 Price: High to Low</option>\n      <option value=\"sla-asc\">⚡ SLA: Fastest First</option>\n      <option value=\"discount-desc\">🔥 Highest Discount %</option>\n      <option value=\"savings-desc\">💰 Highest Savings (₹)</option>\n      <option value=\"title-asc\">🔤 Product Name: A to Z</option>\n      <option value=\"locality-asc\">📍 Locality: A to Z</option>\n    </select>\n  </div>\n\n  <div class=\"table-wrap\">\n    <table class=\"data-table\" id=\"dataTable\">\n      <thead>\n        <tr>\n          <th style=\"width: 36px;\">#</th>\n          <th style=\"width: 54px;\">Image</th>\n          <th onclick=\"setSort('locality')\">Locality & Store</th>\n          <th onclick=\"setSort('sla')\">SLA</th>\n          <th onclick=\"setSort('title')\">Product Details</th>\n          <th onclick=\"setSort('price')\">Price</th>\n          <th onclick=\"setSort('mrp')\">MRP & Discount</th>\n          <th onclick=\"setSort('stock')\">Stock</th>\n          <th>Location & Map</th>\n        </tr>\n      </thead>\n      <tbody id=\"tableBody\"></tbody>\n    </table>\n    <div id=\"emptyState\" class=\"empty-state\">\n      <p style=\"font-size: 16px; font-weight: 700; margin-bottom: 6px;\">No products found</p>\n      <p>Try adjusting your search query or filters.</p>\n    </div>\n  </div>\n\n  <script>\n    let DATA = [];\n    let currentQuery = '';\n    let sortColumn = 'price';\n    let sortAsc = true;\n\n    function esc(s) {\n      return String(s || '').replace(/[&<>\"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', \"'\": '&#39;' }[m]));\n    }\n\n    function parseSlaMinutes(sla) {\n      if (!sla) return 999;\n      const m = String(sla).match(/(\\d+)\\s*m/i);\n      return m ? parseInt(m[1], 10) : 999;\n    }\n\n    function initData(items, query) {\n      DATA = items || [];\n      currentQuery = query || '';\n      if (document.getElementById('queryTag')) {\n        document.getElementById('queryTag').textContent = currentQuery ? `Query: \"${currentQuery}\"` : 'All Results';\n      }\n\n      // Populate locality filter\n      const locMap = {};\n      DATA.forEach(r => {\n        if (r.locality) locMap[r.locality] = (locMap[r.locality] || 0) + 1;\n      });\n      const locSelect = document.getElementById('localityFilter');\n      locSelect.innerHTML = '<option value=\"\">All Localities (' + Object.keys(locMap).length + ')</option>';\n      Object.keys(locMap).sort().forEach(loc => {\n        locSelect.innerHTML += `<option value=\"${esc(loc)}\">${esc(loc)} (${locMap[loc]})</option>`;\n      });\n\n      render();\n    }\n\n    function onFilterChange() {\n      render();\n    }\n\n    function onSortChange() {\n      const val = document.getElementById('sortSelect').value;\n      if (val === 'price-asc') { sortColumn = 'price'; sortAsc = true; }\n      else if (val === 'price-desc') { sortColumn = 'price'; sortAsc = false; }\n      else if (val === 'sla-asc') { sortColumn = 'sla'; sortAsc = true; }\n      else if (val === 'discount-desc') { sortColumn = 'discount'; sortAsc = false; }\n      else if (val === 'savings-desc') { sortColumn = 'savings'; sortAsc = false; }\n      else if (val === 'title-asc') { sortColumn = 'title'; sortAsc = true; }\n      else if (val === 'locality-asc') { sortColumn = 'locality'; sortAsc = true; }\n      render();\n    }\n\n    function setSort(col) {\n      if (sortColumn === col) {\n        sortAsc = !sortAsc;\n      } else {\n        sortColumn = col;\n        sortAsc = true;\n      }\n      render();\n    }\n\n    function render() {\n      const q = (document.getElementById('searchInput').value || '').trim().toLowerCase();\n      const locFilter = document.getElementById('localityFilter').value;\n      const stockFilter = document.getElementById('stockFilter').value;\n\n      let filtered = DATA.filter(r => {\n        if (locFilter && r.locality !== locFilter) return false;\n        if (stockFilter && r.availability !== stockFilter) return false;\n        if (!q) return true;\n        return (\n          (r.title || '') + ' ' +\n          (r.brand || '') + ' ' +\n          (r.locality || '') + ' ' +\n          (r.pincode || '') + ' ' +\n          (r.storeId || '') + ' ' +\n          (r.deliveryLocation || '')\n        ).toLowerCase().includes(q);\n      });\n\n      filtered.sort((a, b) => {\n        let va, vb;\n        if (sortColumn === 'price') {\n          va = a.price ?? 999999;\n          vb = b.price ?? 999999;\n        } else if (sortColumn === 'sla') {\n          va = parseSlaMinutes(a.liveSla);\n          vb = parseSlaMinutes(b.liveSla);\n        } else if (sortColumn === 'discount') {\n          va = a.discount || 0;\n          vb = b.discount || 0;\n        } else if (sortColumn === 'savings') {\n          va = a.savings || 0;\n          vb = b.savings || 0;\n        } else if (sortColumn === 'locality') {\n          va = a.locality || '';\n          vb = b.locality || '';\n          return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va);\n        } else {\n          va = a.title || '';\n          vb = b.title || '';\n          return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va);\n        }\n        return sortAsc ? (va - vb) : (vb - va);\n      });\n\n      // Update Ribbon Stats\n      const storesSet = new Set(filtered.map(r => r.storeId || r.locality));\n      const prices = filtered.map(r => r.price).filter(p => p != null);\n      const minPrice = prices.length ? Math.min(...prices) : null;\n      const slas = filtered.map(r => parseSlaMinutes(r.liveSla)).filter(s => s < 999);\n      const bestSla = slas.length ? Math.min(...slas) : null;\n\n      document.getElementById('statItems').textContent = filtered.length;\n      document.getElementById('statStores').textContent = storesSet.size;\n      document.getElementById('statMinPrice').textContent = minPrice != null ? `₹${minPrice}` : '-';\n      document.getElementById('statBestSla').textContent = bestSla != null ? `⚡ ${bestSla}m` : '-';\n\n      const tbody = document.getElementById('tableBody');\n      const empty = document.getElementById('emptyState');\n\n      if (filtered.length === 0) {\n        tbody.innerHTML = '';\n        empty.style.display = 'block';\n        return;\n      }\n      empty.style.display = 'none';\n\n      let rowsHtml = '';\n      filtered.forEach((r, idx) => {\n        const title = esc(r.title);\n        const brand = esc(r.brand || '');\n        const pUrl = esc(r.productUrl || '#');\n        const price = r.price != null ? `₹${r.price}` : '-';\n        const mrp = (r.mrp && r.mrp > r.price) ? `₹${r.mrp}` : '';\n        const discountPill = r.discount > 0 ? `<div class=\"save-pill\">${r.discount}% OFF (Save ₹${r.savings})</div>` : '';\n        const inStock = r.availability === 'IN_STOCK';\n        const stockBadge = inStock\n          ? '<span class=\"stock-badge stock-in\">● In Stock</span>'\n          : '<span class=\"stock-badge stock-out\">● Out of Stock</span>';\n        const img = r.imageUrl\n          ? `<img src=\"${esc(r.imageUrl)}\" class=\"prod-img\" alt=\"${title}\" loading=\"lazy\" onerror=\"this.style.display='none';this.nextElementSibling.style.display='flex';\"><div class=\"prod-img-placeholder\" style=\"display:none;\">⚡</div>`\n          : '<div class=\"prod-img-placeholder\">⚡</div>';\n\n        rowsHtml += `\n          <tr>\n            <td class=\"row-index\">${idx + 1}</td>\n            <td>${img}</td>\n            <td>\n              <div class=\"locality-title\">${esc(r.locality)}</div>\n              <span class=\"store-pill\">${esc(r.storeId)}</span>\n            </td>\n            <td>\n              <span class=\"sla-badge\">⚡ ${esc(r.liveSla || '-')}</span>\n            </td>\n            <td>\n              <div class=\"prod-cell\">\n                <div class=\"prod-meta\">\n                  ${brand ? `<span class=\"prod-brand\">${brand}</span>` : ''}\n                  <a href=\"${pUrl}\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"prod-title\" title=\"${title}\">${title}</a>\n                </div>\n              </div>\n            </td>\n            <td>\n              <div class=\"price-val\">${price}</div>\n            </td>\n            <td>\n              ${mrp ? `<div class=\"mrp-val\">${mrp}</div>` : ''}\n              ${discountPill}\n            </td>\n            <td>${stockBadge}</td>\n            <td>\n              <div style=\"font-size: 11.5px; color: #475569; max-width: 200px; line-height: 1.3; margin-bottom: 2px;\">\n                ${esc(r.deliveryLocation || '')}\n              </div>\n              ${r.mapsUrl ? `<a href=\"${esc(r.mapsUrl)}\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"map-btn\">📍 Map ↗</a>` : ''}\n            </td>\n          </tr>\n        `;\n      });\n\n      tbody.innerHTML = rowsHtml;\n    }\n\n    function exportCSV() {\n      if (!DATA.length) return alert('No data to export.');\n      const headers = ['#', 'Store_ID', 'Locality', 'Pincode', 'SLA', 'Brand', 'Title', 'Price', 'MRP', 'Discount_Pct', 'Savings_INR', 'Stock', 'Product_URL', 'Delivery_Address', 'Google_Maps_URL'];\n      const rows = DATA.map((r, i) => [\n        i + 1,\n        `\"${r.storeId || ''}\"`,\n        `\"${(r.locality || '').replace(/\"/g, '\"\"')}\"`,\n        `\"${r.pincode || ''}\"`,\n        `\"${r.liveSla || ''}\"`,\n        `\"${(r.brand || '').replace(/\"/g, '\"\"')}\"`,\n        `\"${(r.title || '').replace(/\"/g, '\"\"')}\"`,\n        r.price ?? '',\n        r.mrp ?? '',\n        r.discount || 0,\n        r.savings || 0,\n        `\"${r.availability || ''}\"`,\n        `\"${r.productUrl || ''}\"`,\n        `\"${(r.deliveryLocation || '').replace(/\"/g, '\"\"')}\"`,\n        `\"${r.mapsUrl || ''}\"`\n      ]);\n      const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\\n');\n      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });\n      const a = document.createElement('a');\n      a.href = URL.createObjectURL(blob);\n      a.download = `flipkart_minutes_${currentQuery || 'search'}_${Date.now()}.csv`;\n      a.click();\n    }\n\n    function copyJSON() {\n      if (!DATA.length) return alert('No data to copy.');\n      navigator.clipboard.writeText(JSON.stringify(DATA, null, 2)).then(() => {\n        const btn = document.getElementById('jsonBtn');\n        const orig = btn.innerText;\n        btn.innerText = '✓ Copied!';\n        setTimeout(() => btn.innerText = orig, 1500);\n      }).catch(e => alert('Failed to copy: ' + e));\n    }\n\n    // Try reading hash if loaded as URL\n    try {\n      if (location.hash && location.hash.length > 2) {\n        const raw = decodeURIComponent(location.hash.slice(1));\n        const parsed = JSON.parse(raw);\n        if (Array.isArray(parsed)) initData(parsed, '');\n        else if (parsed.items) initData(parsed.items, parsed.query || '');\n      }\n    } catch(e) {}\n  <\\/script>\n</body>\n</html>\n";
    html = html.replace('// Try reading hash', 'initData(' + JSON.stringify(items) + ', ' + JSON.stringify(query) + ');\n    // Try reading hash');
    win.document.open();
    win.document.write(html);
    win.document.close();
  }

  document.getElementById('fk-h-page').onclick = () => {
    if (!searchResults.length) return alert('No results yet. Run a search first!');
    const q = document.getElementById('fk-h-query')?.value?.trim() || '';
    openBlankResultsTable(searchResults, q);
  };

  document.getElementById('fk-h-map').onclick = () => {
    window.open('https://asad0406.github.io/flipkart-minutes/maps.html', '_blank');
  };

  csvBtn.onclick = () => {
    if (!searchResults.length) return alert('No results yet. Run a search first!');
    const rows = searchResults.map(r => [
      `"${r.storeId}"`, `"${r.locality}"`, `"${r.pincode}"`, `"${r.deliveryLocation.replace(/"/g, '""')}"`, `"${r.mapsUrl}"`, `"${r.liveSla}"`,
      `"${r.title.replace(/"/g, '""')}"`, r.price ?? '', r.mrp ?? '', `"${r.availability}"`, `"${r.productUrl}"`
    ]);
    const csv = ['Store_ID,Locality,Pincode,Delivery_Location,Google_Maps_URL,Live_SLA,Product_Title,Final_Price,MRP,Availability,Product_URL', ...rows.map(r => r.join(','))].join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = `flipkart_minutes_${document.getElementById('fk-h-query').value.trim() || 'search'}.csv`;
    a.click();
  };

  // Copy JSON
  jsonBtn.onclick = () => {
    if (!searchResults.length) return alert('No results yet. Run a search first!');
    navigator.clipboard.writeText(JSON.stringify(searchResults, null, 2)).then(() => {
      const orig = jsonBtn.textContent;
      jsonBtn.textContent = '✓ Copied!';
      setTimeout(() => jsonBtn.textContent = orig, 1500);
    });
  };

  console.log('⚡ Flipkart Minutes Hunter Overlay injected and ready!');
})();
