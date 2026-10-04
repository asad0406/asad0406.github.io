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

const TABLE_PAGE_HTML = "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>⚡ Flipkart Minutes — Results</title>\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n  <link href=\"https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap\" rel=\"stylesheet\">\n  <style id=\"app-style\">\n    :root {\n      --ink: #1f1b16;\n      --paper: #edebdf;\n      --card: #ffffff;\n      --crate: #2b5235;\n      --crate-tint: #e4ede3;\n      --brick: #a6402b;\n      --brick-tint: #f4e5e0;\n      --fk-blue: #2874f0;\n      --fk-blue-dim: #1a5ac9;\n      --fk-yellow: #ffe500;\n      --stone: #5b5648;\n      --line: #dcd8c8;\n      --display: \"Space Grotesk\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, system-ui, sans-serif;\n      --body: \"IBM Plex Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, system-ui, sans-serif;\n    }\n    * { box-sizing: border-box; }\n    body {\n      margin: 0;\n      font: 400 13px/1.5 var(--body);\n      background: var(--paper);\n      color: var(--ink);\n    }\n\n    header {\n      position: sticky;\n      top: 0;\n      z-index: 10;\n      background: var(--paper);\n      border-bottom: 2px solid var(--ink);\n      padding: 14px 20px 12px;\n    }\n    .top-row {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 14px;\n      flex-wrap: wrap;\n    }\n    .title-row {\n      display: flex;\n      align-items: center;\n      gap: 10px;\n    }\n    .title-logo {\n      font-size: 24px;\n      line-height: 1;\n      filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15));\n    }\n    .query-tag {\n      font-family: var(--display);\n      font-weight: 700;\n      font-size: 19px;\n      letter-spacing: -.01em;\n      background: var(--ink);\n      color: var(--paper);\n      padding: 5px 14px 6px;\n      border-radius: 3px;\n      transform: rotate(-.6deg);\n      display: inline-flex;\n      align-items: center;\n      gap: 6px;\n    }\n    .query-tag .q-mark {\n      color: var(--fk-yellow);\n    }\n\n    #metaCard {\n      flex: none;\n      display: flex;\n      gap: 6px;\n      flex-wrap: wrap;\n    }\n    #metaCard .stat {\n      font-family: var(--display);\n      border: 1.5px solid var(--ink);\n      border-radius: 3px;\n      padding: 5px 11px;\n      color: var(--ink);\n      font-size: 11.5px;\n      font-weight: 600;\n      white-space: nowrap;\n      background: var(--card);\n    }\n    #metaCard .stat b {\n      color: var(--fk-blue);\n      font-weight: 700;\n    }\n\n    .toolbar {\n      display: flex;\n      align-items: center;\n      gap: 8px;\n      margin-top: 12px;\n      flex-wrap: wrap;\n    }\n    .toolbar .spacer {\n      flex: 1;\n      min-width: 0;\n    }\n    input#filter, select.filter-select {\n      padding: 7px 11px;\n      border: 1.5px solid var(--line);\n      border-radius: 20px;\n      font-size: 12.5px;\n      background: var(--card);\n      color: var(--ink);\n      flex: none;\n      font-family: var(--body);\n      outline: none;\n    }\n    select.filter-select {\n      min-width: 140px;\n      cursor: pointer;\n    }\n    input#filter {\n      width: 220px;\n    }\n    input#filter:focus, select.filter-select:focus {\n      border-color: var(--fk-blue);\n    }\n    button.tool-btn {\n      padding: 7px 14px;\n      border: 1.5px solid var(--line);\n      border-radius: 20px;\n      background: var(--card);\n      color: var(--ink);\n      font-size: 12.5px;\n      font-weight: 600;\n      cursor: pointer;\n      flex: none;\n      font-family: var(--body);\n      transition: all 0.15s;\n    }\n    button.tool-btn:hover {\n      border-color: var(--fk-blue);\n    }\n    button.tool-btn.active {\n      background: var(--crate);\n      border-color: var(--crate);\n      color: #fff;\n    }\n    button.btn-primary {\n      background: var(--fk-blue);\n      border: none;\n      color: #ffffff;\n      font-family: var(--display);\n      font-weight: 700;\n      padding: 8px 16px;\n    }\n    button.btn-primary:hover {\n      background: var(--fk-blue-dim);\n    }\n\n    #tableWrap {\n      overflow: auto;\n      max-height: calc(100vh - 128px);\n      padding: 0 20px 20px;\n    }\n    table {\n      border-collapse: collapse;\n      width: 100%;\n      font-size: 12.5px;\n    }\n    thead th {\n      position: sticky;\n      top: 0;\n      background: var(--paper);\n      text-align: left;\n      padding: 10px 10px 8px;\n      border-bottom: 2px solid var(--ink);\n      font-weight: 600;\n      font-family: var(--display);\n      color: var(--ink);\n      white-space: nowrap;\n      cursor: pointer;\n      user-select: none;\n    }\n    thead th:hover {\n      color: var(--fk-blue);\n    }\n    tbody td {\n      padding: 9px 10px;\n      border-bottom: 1px solid var(--line);\n      font-weight: 400;\n      max-width: 280px;\n      white-space: normal;\n      overflow-wrap: break-word;\n      vertical-align: middle;\n    }\n    tbody tr {\n      border-left: 4px solid transparent;\n      transition: background 0.1s;\n    }\n    tbody td.nowrap {\n      max-width: none;\n      white-space: nowrap;\n    }\n    tbody tr:hover {\n      background: #ffffff;\n    }\n    tbody tr.sold-out {\n      background: var(--brick-tint);\n      border-left-color: var(--brick);\n    }\n    tbody tr.sold-out:hover {\n      background: #efd6cf;\n    }\n    tbody tr.in-stock {\n      background: var(--crate-tint);\n      border-left-color: var(--crate);\n    }\n    tbody tr.in-stock:hover {\n      background: #d6e5d4;\n    }\n    td.num {\n      text-align: right;\n      font-variant-numeric: tabular-nums;\n      font-family: var(--display);\n      font-weight: 600;\n    }\n    td a {\n      color: var(--fk-blue);\n      text-decoration: none;\n      font-weight: 600;\n    }\n    td a:hover {\n      text-decoration: underline;\n    }\n\n    .prod-link {\n      color: var(--ink);\n      font-weight: 600;\n      line-height: 1.35;\n      display: -webkit-box;\n      -webkit-line-clamp: 2;\n      -webkit-box-orient: vertical;\n      overflow: hidden;\n    }\n    .prod-link:hover {\n      color: var(--fk-blue);\n    }\n    .brand-tag {\n      font-size: 10px;\n      font-weight: 700;\n      color: var(--stone);\n      text-transform: uppercase;\n      letter-spacing: 0.03em;\n      margin-bottom: 2px;\n    }\n    .sla-pill {\n      font-family: var(--display);\n      font-size: 11px;\n      font-weight: 700;\n      padding: 2px 7px;\n      border-radius: 4px;\n      background: var(--card);\n      border: 1px solid var(--line);\n      color: var(--ink);\n      white-space: nowrap;\n    }\n    .thumb {\n      height: 36px;\n      width: 36px;\n      object-fit: contain;\n      border-radius: 4px;\n      vertical-align: middle;\n      cursor: zoom-in;\n      background: #ffffff;\n      border: 1px solid var(--line);\n    }\n    .thumb-fallback {\n      height: 36px;\n      width: 36px;\n      border-radius: 4px;\n      background: var(--card);\n      border: 1px solid var(--line);\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 16px;\n      color: var(--stone);\n      vertical-align: middle;\n    }\n\n    .view-btn {\n      border: 1.5px solid var(--line);\n      background: var(--card);\n      border-radius: 5px;\n      width: 26px;\n      height: 26px;\n      cursor: pointer;\n      font-size: 13px;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      transition: all 0.15s;\n    }\n    .view-btn:hover {\n      border-color: var(--fk-blue);\n      transform: scale(1.08);\n    }\n\n    #empty {\n      padding: 60px 20px;\n      text-align: center;\n      color: var(--stone);\n      font-family: var(--display);\n      font-size: 15px;\n      font-weight: 600;\n    }\n\n    /* Modals */\n    .modal-overlay {\n      position: fixed;\n      inset: 0;\n      background: rgba(31, 27, 22, .55);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      z-index: 100;\n      padding: 20px;\n    }\n    .modal-card {\n      background: var(--card);\n      border-radius: 4px;\n      width: 490px;\n      max-width: 100%;\n      max-height: 88vh;\n      overflow-y: auto;\n      box-shadow: 0 24px 60px rgba(31,27,22,.4);\n      position: relative;\n    }\n    .modal-card::before {\n      content: \"\";\n      position: absolute;\n      top: -10px;\n      left: 50%;\n      transform: translateX(-50%);\n      width: 20px;\n      height: 20px;\n      background: radial-gradient(circle, transparent 60%, var(--card) 61%);\n    }\n    .modal-head {\n      display: flex;\n      gap: 12px;\n      align-items: center;\n      padding: 20px 20px 16px;\n      border-bottom: 2px dashed var(--line);\n      position: sticky;\n      top: 0;\n      background: var(--card);\n      z-index: 2;\n    }\n    .modal-head img {\n      width: 48px;\n      height: 48px;\n      border-radius: 6px;\n      object-fit: contain;\n      flex: none;\n      background: var(--paper);\n      border: 1px solid var(--line);\n    }\n    .modal-head .name {\n      font-family: var(--display);\n      font-weight: 600;\n      font-size: 14.5px;\n      line-height: 1.3;\n      flex: 1;\n    }\n    .modal-close {\n      cursor: pointer;\n      color: var(--stone);\n      font-size: 14px;\n      line-height: 1;\n      flex: none;\n      width: 26px;\n      height: 26px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      border-radius: 50%;\n      background: var(--paper);\n      user-select: none;\n    }\n    .modal-close:hover {\n      background: var(--line);\n      color: var(--ink);\n    }\n\n    .modal-grid {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 14px;\n      padding: 16px 20px;\n    }\n    .modal-grid .full {\n      grid-column: 1 / -1;\n    }\n    .modal-field .k {\n      font-family: var(--display);\n      font-size: 10.5px;\n      font-weight: 600;\n      color: var(--stone);\n      margin-bottom: 3px;\n      border-left: 2px solid var(--fk-blue);\n      padding-left: 6px;\n    }\n    .modal-field .v {\n      font-size: 12.5px;\n      line-height: 1.45;\n      word-break: break-word;\n      padding-left: 8px;\n    }\n\n    .modal-section {\n      padding: 14px 20px 18px;\n      border-top: 2px dashed var(--line);\n    }\n    .modal-section .sec-title {\n      font-family: var(--display);\n      font-size: 11px;\n      font-weight: 600;\n      color: var(--ink);\n      border-left: 2px solid var(--fk-blue);\n      padding-left: 6px;\n    }\n    .modal-section .sec-sub {\n      font-size: 12px;\n      color: var(--stone);\n      margin: 5px 0 10px 8px;\n    }\n    .price-row {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      gap: 10px;\n      padding: 8px 10px;\n      border-radius: 4px;\n      font-size: 12.5px;\n      margin-bottom: 4px;\n    }\n    .price-row .store {\n      display: flex;\n      align-items: center;\n      gap: 6px;\n      flex: 1;\n      min-width: 0;\n      flex-wrap: wrap;\n    }\n    .price-row .amount {\n      font-family: var(--display);\n      font-weight: 600;\n      font-variant-numeric: tabular-nums;\n      flex: none;\n      white-space: nowrap;\n    }\n    .price-row.best {\n      background: var(--crate-tint);\n    }\n    .price-row.worst {\n      background: var(--brick-tint);\n    }\n    .price-row .amount.best {\n      color: var(--crate);\n    }\n    .price-row .amount.worst {\n      color: var(--brick);\n    }\n    .pill {\n      font-family: var(--display);\n      font-size: 9.5px;\n      font-weight: 700;\n      padding: 2px 7px;\n      border-radius: 3px;\n      display: inline-block;\n      width: fit-content;\n      color: #fff;\n    }\n    .pill.best {\n      background: var(--crate);\n    }\n    .pill.worst {\n      background: var(--brick);\n    }\n    .price-row .soldout {\n      color: var(--stone);\n      font-size: 11px;\n    }\n\n    .price-compare {\n      display: flex;\n      gap: 8px;\n      margin-bottom: 6px;\n    }\n    .price-card {\n      flex: 1 1 0;\n      min-width: 0;\n      display: flex;\n      flex-direction: column;\n      align-items: flex-start;\n      gap: 3px;\n      padding: 10px 12px;\n      border-radius: 4px;\n    }\n    .price-card.best {\n      background: var(--crate-tint);\n    }\n    .price-card.worst {\n      background: var(--brick-tint);\n    }\n    .price-card .pc-label {\n      font-size: 11.5px;\n      color: var(--stone);\n      margin-top: 3px;\n    }\n    .pc-amount-row {\n      display: flex;\n      align-items: center;\n      gap: 6px;\n      margin-top: 2px;\n    }\n    .price-card .pc-amount {\n      font-family: var(--display);\n      font-size: 17px;\n      font-weight: 700;\n      font-variant-numeric: tabular-nums;\n    }\n    .price-card .pc-amount.best {\n      color: var(--crate);\n    }\n    .price-card .pc-amount.worst {\n      color: var(--brick);\n    }\n    .save-tag {\n      font-family: var(--body);\n      font-size: 10.5px;\n      font-weight: 600;\n      color: #fff;\n      padding: 2px 7px;\n      border-radius: 10px;\n      background: var(--crate);\n    }\n\n    .toggle-stores {\n      display: inline-block;\n      cursor: pointer;\n      color: var(--fk-blue);\n      font-family: var(--display);\n      font-weight: 600;\n      font-size: 11.5px;\n      margin: 6px 0 0 8px;\n      user-select: none;\n    }\n    .toggle-stores:hover {\n      color: var(--ink);\n      text-decoration: underline;\n    }\n\n    @media (max-width: 800px) {\n      header { padding: 12px 14px; }\n      .toolbar { gap: 6px; }\n      #tableWrap { padding: 0 10px 14px; }\n      input#filter { width: 100%; }\n      select.filter-select { flex: 1; min-width: 120px; }\n    }\n  </style>\n</head>\n<body>\n\n  <header>\n    <div class=\"top-row\">\n      <div class=\"title-row\">\n        <span class=\"title-logo\">⚡</span>\n        <span class=\"query-tag\" id=\"titleTag\">\n          <span class=\"q-mark\">#</span><span id=\"queryLabel\">Flipkart Minutes</span>\n        </span>\n      </div>\n      <div id=\"metaCard\"></div>\n    </div>\n    <div class=\"toolbar\">\n      <select id=\"filterStore\" class=\"filter-select\">\n        <option value=\"\">All stores</option>\n      </select>\n      <select id=\"filterStock\" class=\"filter-select\">\n        <option value=\"\">All stock</option>\n        <option value=\"In stock\">In stock</option>\n        <option value=\"Sold out\">Sold out</option>\n      </select>\n      <select id=\"sortSelect\" class=\"filter-select\">\n        <option value=\"price-asc\">💵 Price: Low to High</option>\n        <option value=\"price-desc\">💎 Price: High to Low</option>\n        <option value=\"sla-asc\">⚡ SLA: Fastest First</option>\n        <option value=\"discount-desc\">🔥 Highest Discount %</option>\n        <option value=\"title-asc\">🔤 Product: A to Z</option>\n        <option value=\"store-asc\">📍 Store: A to Z</option>\n      </select>\n      <input id=\"filter\" type=\"text\" placeholder=\"Search product, brand, store, pincode...\">\n      <button id=\"filterVariation\" class=\"tool-btn\">Price varies by store</button>\n      <div class=\"spacer\"></div>\n      <button id=\"download\" class=\"tool-btn btn-primary\">Download CSV</button>\n      <button id=\"copyJson\" class=\"tool-btn\">Copy JSON</button>\n    </div>\n  </header>\n\n  <div id=\"tableWrap\"></div>\n\n  <script id=\"app-script\">\n    const tableWrap = document.getElementById('tableWrap');\n    const filterEl = document.getElementById('filter');\n    const storeSel = document.getElementById('filterStore');\n    const stockSel = document.getElementById('filterStock');\n    const sortSel = document.getElementById('sortSelect');\n    const variationBtn = document.getElementById('filterVariation');\n\n    const COLUMN_ORDER = [\n      'locality',\n      'liveSla',\n      'title',\n      'brand',\n      'availability',\n      'mrp',\n      'price',\n      'discount',\n      'imageUrl',\n      'mapsUrl'\n    ];\n\n    const COLUMN_LABELS = {\n      locality: 'Store / Locality',\n      liveSla: 'SLA',\n      title: 'Product',\n      brand: 'Brand',\n      availability: 'Stock',\n      mrp: 'MRP (₹)',\n      price: 'Price (₹)',\n      discount: 'Discount %',\n      imageUrl: 'Image',\n      mapsUrl: 'Map',\n      storeId: 'Store ID',\n      pincode: 'Pincode',\n      deliveryLocation: 'Store Address'\n    };\n\n    const DETAIL_COLS = ['locality', 'storeId', 'liveSla', 'pincode', 'brand', 'price', 'mrp', 'discount', 'availability', 'deliveryLocation'];\n    const DETAIL_FULL_WIDTH = new Set(['deliveryLocation']);\n    const NUMERIC_COLS = new Set(['mrp', 'price', 'discount']);\n    const NOWRAP_COLS = new Set(['liveSla', 'availability', 'imageUrl', 'mapsUrl']);\n\n    const label = c => COLUMN_LABELS[c] || c;\n\n    let DATA = [];\n    let allRows = [];\n    let renderedRows = [];\n    let currentQuery = '';\n    let sortCol = null, sortDir = 1; // 1 = asc, -1 = desc\n    let onlyVariation = false;\n    let cheapestByKey = new Map();\n\n    const variantKey = r => ((r.title || '') + '__' + (r.brand || '')).trim().toLowerCase();\n\n    function normalizeRow(r) {\n      const avail = (r.availability === 'IN_STOCK' || r.availability === 'In stock') ? 'In stock' : 'Sold out';\n      return {\n        locality: r.locality || '-',\n        storeId: r.storeId || '-',\n        pincode: r.pincode || '-',\n        deliveryLocation: r.deliveryLocation || '',\n        mapsUrl: r.mapsUrl || '',\n        liveSla: r.liveSla || '-',\n        title: r.title || '-',\n        brand: r.brand || '',\n        imageUrl: r.imageUrl || '',\n        productUrl: r.productUrl || '#',\n        price: r.price != null ? Number(r.price) : null,\n        mrp: r.mrp != null ? Number(r.mrp) : null,\n        discount: r.discount != null ? Number(r.discount) : 0,\n        savings: r.savings != null ? Number(r.savings) : 0,\n        availability: avail\n      };\n    }\n\n    function parseSlaMinutes(sla) {\n      if (!sla) return 999;\n      const m = String(sla).match(/(\\d+)\\s*m/i);\n      return m ? parseInt(m[1], 10) : 999;\n    }\n\n    function priceAcrossStores(row) {\n      const k = variantKey(row);\n      return allRows\n        .filter(r => variantKey(r) === k && r.availability === 'In stock' && r.price != null)\n        .map(r => ({ store: r.locality, price: r.price, stock: r.availability }))\n        .sort((a, b) => a.price - b.price);\n    }\n\n    function computeVariationKeys() {\n      const byKey = new Map();\n      for (const r of allRows) {\n        if (r.availability !== 'In stock' || r.price == null) continue;\n        const k = variantKey(r);\n        const price = r.price;\n        const e = byKey.get(k);\n        if (!e) byKey.set(k, { min: price, max: price, cheapest: r });\n        else {\n          e.min = Math.min(e.min, price);\n          e.max = Math.max(e.max, price);\n          if (price < (e.cheapest.price ?? 999999)) e.cheapest = r;\n        }\n      }\n      cheapestByKey = new Map([...byKey].filter(([, v]) => v.min !== v.max).map(([k, v]) => [k, v.cheapest]));\n      if (variationBtn) {\n        variationBtn.textContent = `Price varies by store (${cheapestByKey.size})`;\n      }\n    }\n\n    function buildPriceSection(prices) {\n      const min = prices[0].price, max = prices[prices.length - 1].price;\n      const toggle = `<span class=\"toggle-stores\">Show all ${prices.length} stores</span>`;\n\n      if (min === max) {\n        return `<div class=\"modal-section\"><div class=\"sec-title\">Price across stores</div>` +\n          `<div class=\"price-row\"><span class=\"store\">${prices.length} stores have the same price</span>` +\n          `<span class=\"amount\">₹${min}</span></div>${toggle}</div>`;\n      }\n\n      const cheapest = prices.filter(p => p.price === min);\n      const restCount = prices.length - cheapest.length;\n      const savings = Math.round(((max - min) / max) * 100);\n      const cheapestLabel = cheapest.length === 1 ? cheapest[0].store : `${cheapest.length} stores`;\n\n      return `<div class=\"modal-section\"><div class=\"sec-title\">Price across stores</div>` +\n        `<div class=\"price-compare\">` +\n        `<div class=\"price-card best\">` +\n        `<span class=\"pill best\">cheapest</span>` +\n        `<span class=\"pc-label\">${cheapestLabel}</span>` +\n        `<span class=\"pc-amount-row\">${savings > 0 ? `<span class=\"save-tag\">save ${savings}%</span>` : ''}<span class=\"pc-amount best\">₹${min}</span></span></div>` +\n        `<div class=\"price-card worst\">` +\n        `<span class=\"pill worst\">priciest</span>` +\n        `<span class=\"pc-label\">${restCount} other store${restCount > 1 ? 's' : ''}</span>` +\n        `<span class=\"pc-amount worst\">₹${max}</span></div>` +\n        `</div>${toggle}</div>`;\n    }\n\n    function openStoreListModal(prices) {\n      const modal = document.createElement('div');\n      modal.className = 'modal-overlay';\n      const rows = prices.map(p =>\n        `<div class=\"price-row\"><span class=\"store\">${p.store}${p.stock === 'Sold out' ? ' <span class=\"soldout\">(sold out)</span>' : ''}</span>` +\n        `<span class=\"amount\">₹${p.price}</span></div>`\n      ).join('');\n      modal.innerHTML =\n        `<div class=\"modal-card\" style=\"width:360px;\">` +\n        `<div class=\"modal-head\"><div class=\"name\">All ${prices.length} stores</div>` +\n        `<span class=\"modal-close\">✕</span></div>` +\n        `<div class=\"modal-section\" style=\"border-top:none;\">${rows}</div></div>`;\n      modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });\n      modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());\n      document.body.appendChild(modal);\n    }\n\n    function openDetail(row) {\n      const modal = document.createElement('div');\n      modal.className = 'modal-overlay';\n\n      const fields = DETAIL_COLS.map(c => {\n        let val = row[c] ?? '-';\n        if (c === 'price' && val !== '-') val = `<b>₹${val}</b>`;\n        if (c === 'mrp' && val !== '-') val = `₹${val}`;\n        if (c === 'discount' && val) val = `${val}% OFF`;\n        if (c === 'deliveryLocation' && row.mapsUrl) {\n          val = `${val} <br><a href=\"${row.mapsUrl}\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"font-weight:700;display:inline-block;margin-top:4px;\">📍 Open in Google Maps ↗</a>`;\n        }\n        return `<div class=\"modal-field${DETAIL_FULL_WIDTH.has(c) ? ' full' : ''}\">` +\n          `<div class=\"k\">${label(c)}</div><div class=\"v\">${val}</div></div>`;\n      }).join('');\n\n      const prices = priceAcrossStores(row);\n      const priceSection = prices.length > 1 ? buildPriceSection(prices) : '';\n\n      const img = row.imageUrl\n        ? `<img src=\"${row.imageUrl}\" alt=\"${row.title}\" onerror=\"this.style.display='none'\">`\n        : `<div style=\"width:48px;height:48px;border-radius:6px;background:var(--paper);display:flex;align-items:center;justify-content:center;font-size:20px;\">⚡</div>`;\n\n      modal.innerHTML =\n        `<div class=\"modal-card\">` +\n        `<div class=\"modal-head\">${img}` +\n        `<div class=\"name\"><a href=\"${row.productUrl}\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"prod-link\" style=\"font-size:15px;\">${row.title}</a></div>` +\n        `<span class=\"modal-close\">✕</span></div>` +\n        `<div class=\"modal-grid\">${fields}</div>` +\n        priceSection + `</div>`;\n\n      modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });\n      modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());\n      const toggleEl = modal.querySelector('.toggle-stores');\n      if (toggleEl) {\n        toggleEl.addEventListener('click', () => openStoreListModal(prices));\n      }\n      document.body.appendChild(modal);\n    }\n\n    function openImage(src) {\n      if (!src) return;\n      const modal = document.createElement('div');\n      modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.65);display:flex;' +\n        'align-items:center;justify-content:center;z-index:100;cursor:zoom-out;';\n      modal.innerHTML = `<img src=\"${src}\" style=\"max-width:85vw;max-height:85vh;border-radius:8px;box-shadow:0 16px 40px rgba(0,0,0,.5);background:#fff;padding:8px;\">`;\n      modal.addEventListener('click', () => modal.remove());\n      document.body.appendChild(modal);\n    }\n\n    function cellValue(row, col) {\n      const v = row[col] ?? '';\n      if (col === 'imageUrl') {\n        return v\n          ? `<img src=\"${v}\" loading=\"lazy\" class=\"thumb\" data-src=\"${v}\" onerror=\"this.outerHTML='<span class=\\\\'thumb-fallback\\\\'>⚡</span>'\">`\n          : `<span class=\"thumb-fallback\">⚡</span>`;\n      }\n      if (col === 'title') {\n        const brand = row.brand ? `<div class=\"brand-tag\">${row.brand}</div>` : '';\n        return `${brand}<a href=\"${row.productUrl}\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"prod-link\">${v}</a>`;\n      }\n      if (col === 'liveSla') {\n        return `<span class=\"sla-pill\">⚡ ${v}</span>`;\n      }\n      if (col === 'price') {\n        return v != null ? `₹${v}` : '-';\n      }\n      if (col === 'mrp') {\n        return (v && v > row.price) ? `₹${v}` : '-';\n      }\n      if (col === 'discount') {\n        return v > 0 ? `<span style=\"color:var(--crate);font-weight:700;\">${v}%</span>` : '-';\n      }\n      if (col === 'mapsUrl') {\n        return v ? `<a href=\"${v}\" target=\"_blank\" rel=\"noopener noreferrer\">📍 Map ↗</a>` : '-';\n      }\n      return String(v).replace(/</g, '&lt;');\n    }\n\n    function sortRows(rows) {\n      if (!sortCol) return rows;\n      const numeric = NUMERIC_COLS.has(sortCol);\n      return [...rows].sort((a, b) => {\n        let av = a[sortCol] ?? '', bv = b[sortCol] ?? '';\n        if (sortCol === 'liveSla') {\n          av = parseSlaMinutes(av);\n          bv = parseSlaMinutes(bv);\n          return (av - bv) * sortDir;\n        }\n        const cmp = numeric ? ((Number(av) || 0) - (Number(bv) || 0)) : String(av).localeCompare(String(bv));\n        return cmp * sortDir;\n      });\n    }\n\n    function render(rows) {\n      rows = sortRows(rows);\n      renderedRows = rows;\n      if (!rows.length) {\n        tableWrap.innerHTML = '<div id=\"empty\">No rows match your filter.</div>';\n        return;\n      }\n      const cols = COLUMN_ORDER.filter(c => c in rows[0]);\n      const head = '<thead><tr><th></th>' + cols.map(c => {\n        const arrow = sortCol === c ? (sortDir === 1 ? ' ▲' : ' ▼') : '';\n        return `<th data-col=\"${c}\">${label(c)}${arrow}</th>`;\n      }).join('') + '</tr></thead>';\n\n      const body = '<tbody>' + rows.map((r, i) => {\n        const trClass = r.availability === 'Sold out' ? 'sold-out' : 'in-stock';\n        return `<tr class=\"${trClass}\"><td class=\"nowrap\"><button data-idx=\"${i}\" class=\"view-btn\" title=\"View details\">👁</button></td>` +\n          cols.map(c => {\n            const cls = [NUMERIC_COLS.has(c) ? 'num' : '', NOWRAP_COLS.has(c) ? 'nowrap' : ''].filter(Boolean).join(' ');\n            return `<td class=\"${cls}\">${cellValue(r, c)}</td>`;\n          }).join('') + '</tr>';\n      }).join('') + '</tbody>';\n\n      tableWrap.innerHTML = `<table>${head}${body}</table>`;\n\n      tableWrap.querySelectorAll('th[data-col]').forEach(th => {\n        th.addEventListener('click', () => {\n          const col = th.dataset.col;\n          sortDir = sortCol === col ? -sortDir : 1;\n          sortCol = col;\n          applyFilter();\n        });\n      });\n\n      tableWrap.querySelectorAll('.view-btn').forEach(btn => {\n        btn.addEventListener('click', () => openDetail(renderedRows[Number(btn.dataset.idx)]));\n      });\n\n      tableWrap.querySelectorAll('.thumb').forEach(img => {\n        img.addEventListener('click', () => openImage(img.dataset.src));\n      });\n    }\n\n    function applyFilter() {\n      const q = filterEl.value.trim().toLowerCase();\n      const store = storeSel.value;\n      const stock = stockSel.value;\n      const base = onlyVariation ? [...cheapestByKey.values()] : allRows;\n\n      const filtered = base.filter(r => {\n        if (store && r.locality !== store) return false;\n        if (stock && r.availability !== stock) return false;\n        if (!q) return true;\n        return (\n          r.title + ' ' +\n          r.brand + ' ' +\n          r.locality + ' ' +\n          r.storeId + ' ' +\n          r.pincode + ' ' +\n          r.deliveryLocation\n        ).toLowerCase().includes(q);\n      });\n\n      render(filtered);\n    }\n\n    function updateMetaRibbon() {\n      const storesSet = new Set(allRows.map(r => r.locality));\n      const prices = allRows.map(r => r.price).filter(p => p != null);\n      const minPrice = prices.length ? Math.min(...prices) : null;\n      const slas = allRows.map(r => parseSlaMinutes(r.liveSla)).filter(s => s < 999);\n      const fastestSla = slas.length ? Math.min(...slas) : null;\n\n      const metaEl = document.getElementById('metaCard');\n      metaEl.innerHTML =\n        `<span class=\"stat\"><b>${allRows.length}</b> rows</span>` +\n        `<span class=\"stat\"><b>${storesSet.size}</b> stores</span>` +\n        (minPrice != null ? `<span class=\"stat\">min <b>₹${minPrice}</b></span>` : '') +\n        (fastestSla != null ? `<span class=\"stat\">fastest <b>⚡ ${fastestSla}m</b></span>` : '') +\n        `<span class=\"stat\">${new Date().toLocaleTimeString()}</span>`;\n    }\n\n    function fillStoreOptions() {\n      const stores = [...new Set(allRows.map(r => r.locality).filter(Boolean))].sort();\n      storeSel.innerHTML = '<option value=\"\">All stores (' + stores.length + ')</option>';\n      stores.forEach(s => {\n        const opt = document.createElement('option');\n        opt.value = s;\n        opt.textContent = s;\n        storeSel.appendChild(opt);\n      });\n    }\n\n    function exportCSV() {\n      if (!allRows.length) return alert('No data to download.');\n      const headers = ['#', 'Store_Locality', 'Store_ID', 'Pincode', 'SLA', 'Brand', 'Product_Title', 'Selling_Price_INR', 'MRP_INR', 'Discount_Pct', 'Savings_INR', 'Stock', 'Store_Address', 'Google_Maps_URL', 'Product_URL'];\n      const rows = allRows.map((r, i) => [\n        i + 1,\n        `\"${(r.locality || '').replace(/\"/g, '\"\"')}\"`,\n        `\"${r.storeId || ''}\"`,\n        `\"${r.pincode || ''}\"`,\n        `\"${r.liveSla || ''}\"`,\n        `\"${(r.brand || '').replace(/\"/g, '\"\"')}\"`,\n        `\"${(r.title || '').replace(/\"/g, '\"\"')}\"`,\n        r.price ?? '',\n        r.mrp ?? '',\n        r.discount || 0,\n        r.savings || 0,\n        `\"${r.availability || ''}\"`,\n        `\"${(r.deliveryLocation || '').replace(/\"/g, '\"\"')}\"`,\n        `\"${r.mapsUrl || ''}\"`,\n        `\"${r.productUrl || ''}\"`\n      ]);\n      const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\\n');\n      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });\n      const a = document.createElement('a');\n      a.href = URL.createObjectURL(blob);\n      a.download = `flipkart_minutes_${currentQuery || 'results'}_${Date.now()}.csv`;\n      document.body.appendChild(a);\n      a.click();\n      a.remove();\n    }\n\n    function copyJSON() {\n      if (!allRows.length) return alert('No data to copy.');\n      navigator.clipboard.writeText(JSON.stringify(allRows, null, 2)).then(() => {\n        const btn = document.getElementById('copyJson');\n        const orig = btn.innerText;\n        btn.innerText = '✓ Copied!';\n        setTimeout(() => btn.innerText = orig, 1500);\n      }).catch(e => alert('Failed to copy: ' + e));\n    }\n\n    function initData(items, query) {\n      currentQuery = query || '';\n      if (document.getElementById('queryLabel')) {\n        document.getElementById('queryLabel').textContent = currentQuery ? currentQuery : 'Flipkart Minutes';\n      }\n      allRows = (items || []).map(normalizeRow);\n      updateMetaRibbon();\n      fillStoreOptions();\n      computeVariationKeys();\n      applyFilter();\n    }\n\n    // Controls listeners\n    filterEl.addEventListener('input', applyFilter);\n    storeSel.addEventListener('change', applyFilter);\n    stockSel.addEventListener('change', applyFilter);\n    sortSel.addEventListener('change', () => {\n      const v = sortSel.value;\n      if (v === 'price-asc') { sortCol = 'price'; sortDir = 1; }\n      else if (v === 'price-desc') { sortCol = 'price'; sortDir = -1; }\n      else if (v === 'sla-asc') { sortCol = 'liveSla'; sortDir = 1; }\n      else if (v === 'discount-desc') { sortCol = 'discount'; sortDir = -1; }\n      else if (v === 'title-asc') { sortCol = 'title'; sortDir = 1; }\n      else if (v === 'store-asc') { sortCol = 'locality'; sortDir = 1; }\n      applyFilter();\n    });\n\n    variationBtn.addEventListener('click', () => {\n      onlyVariation = !onlyVariation;\n      variationBtn.classList.toggle('active', onlyVariation);\n      applyFilter();\n    });\n\n    document.getElementById('download').addEventListener('click', exportCSV);\n    document.getElementById('copyJson').addEventListener('click', copyJSON);\n\n    /* __DATA_INJECTION__ */\n\n    // Fallback: window.opener\n    try {\n      if (!allRows.length && window.opener && window.opener.fkResults && window.opener.fkResults.length) {\n        const q = window.opener.document?.getElementById('fk-h-query')?.value?.trim() || '';\n        initData(window.opener.fkResults, q);\n      }\n    } catch(e) {}\n\n    // Fallback: URL hash\n    try {\n      if (!allRows.length && location.hash && location.hash.length > 2) {\n        const raw = decodeURIComponent(location.hash.slice(1));\n        const parsed = JSON.parse(raw);\n        if (Array.isArray(parsed)) initData(parsed, '');\n        else if (parsed.items) initData(parsed.items, parsed.query || '');\n      }\n    } catch(e) {}\n  </script>\n</body>\n</html>\n";

  function openBlankResultsTable(items, query) {
    const win = window.open('', '_blank');
    if (!win) return alert('Popup blocked! Please allow popups for flipkart.com to view results.');
    window.fkResults = items;
    const nonce = document.querySelector('script[nonce]')?.nonce || document.querySelector('script[nonce]')?.getAttribute('nonce') || '';
    const nonceAttr = nonce ? ` nonce="${nonce}"` : '';
    const safeData = JSON.stringify(items).replace(/<\/script/gi, '<\\/script');
    const safeQuery = JSON.stringify(query || '');
    const injection = `DATA = ${safeData};\n    currentQuery = ${safeQuery};\n    initData(DATA, currentQuery);`;
    let html = TABLE_PAGE_HTML
      .replace('<style id="app-style">', `<style id="app-style"${nonceAttr}>`)
      .replace('<script id="app-script">', `<script id="app-script"${nonceAttr}>`)
      .replace('/* __DATA_INJECTION__ */', injection);
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
