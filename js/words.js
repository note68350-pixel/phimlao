/**
 * ຄັງຄຳສັບພາສາລາວແທ້ 100% (Lao Vocabulary Database)
 * ສຳລັບເວັບເກມ "ພີມລາວ" (PhimLao)
 * ແບ່ງເປັນ 3 ລະດັບ: ງ່າຍ (Easy), ກາງ (Medium), ຍາກ (Hard)
 * ພ້ອມໝວດໝູ່ຄຳສັບ ແລະ ຄວາມໝາຍ
 */

const LAO_WORDS = {
  easy: [
    // ສັດ (Animals)
    { word: "ແມວ", category: "ສັດ", hint: "ສັດລ້ຽງຮ້ອງມ້ຽວໆ" },
    { word: "ໝາ", category: "ສັດ", hint: "ສັດລ້ຽງເຝົ້າບ້ານ" },
    { word: "ໄກ່", category: "ສັດ", hint: "ສັດປີກຂັນຍາມເຊົ້າ" },
    { word: "ປາ", category: "ສັດ", hint: "ສັດອາໄສຢູ່ນໍ້າ" },
    { word: "ນົກ", category: "ສັດ", hint: "ສັດບິນເທິງທ້ອງຟ້າ" },
    { word: "ມ້າ", category: "ສັດ", hint: "ສັດສີ່ຂາວິ້ງໄວ" },
    { word: "ງົວ", category: "ສັດ", hint: "ສັດກິນຫຍ້າ ໃຫ້ນົມ" },
    { word: "ຄວາຍ", category: "ສັດ", hint: "ສັດຊ່ວຍຊາວນາໄຖນາ" },
    { word: "ໝູ", category: "ສັດ", hint: "ສັດລ້ຽງກິນຮຳ" },
    { word: "ເປັດ", category: "ສັດ", hint: "ສັດປີກລອຍນໍ້າໄດ້" },
    { word: "ຊ້າງ", category: "ສັດ", hint: "ສັດໃຫຍ່ມີງວງຍາວ" },
    { word: "ລີງ", category: "ສັດ", hint: "ສັດມັກປີນຕົ້ນໄມ້" },
    { word: "ກົບ", category: "ສັດ", hint: "ສັດເຄິ່ງບົກເຄິ່ງນໍ້າ" },
    { word: "ແບ້", category: "ສັດ", hint: "ສັດກິນໃບໄມ້ ຮ້ອງແບ້ໆ" },
    { word: "ຫ່ານ", category: "ສັດ", hint: "ສັດປີກໂຕໃຫຍ່ຄໍຍາວ" },
    { word: "ເສືອ", category: "ສັດ", hint: "ສັດປ່າດຸຮ້າຍລາຍພາດກອນ" },
    { word: "ກວາງ", category: "ສັດ", hint: "ສັດປ່າມີເຂົາງາມ" },
    { word: "ໜູ", category: "ສັດ", hint: "ສັດແຂ້ວແຫ້ວນ້ອຍ" },
    { word: "ປູ", category: "ສັດ", hint: "ສັດມີກ້າມຍ່າງສ້ຽງ" },
    { word: "ຫອຍ", category: "ສັດ", hint: "ສັດມີກາບແຂງຍ່າງຊ້າ" },
    { word: "ເຜິ້ງ", category: "ສັດ", hint: "ແມງໄມ້ເຮັດນໍ້າເຜິ້ງຫວານ" },
    { word: "ມົດ", category: "ສັດ", hint: "ແມງໄມ້ນ້ອຍຂະຫຍັນ" },

    // ຮ່າງກາຍ (Body Parts)
    { word: "ມື", category: "ຮ່າງກາຍ", hint: "ໃຊ້ອັບຈັບສິ່ງຂອງ" },
    { word: "ຕາ", category: "ຮ່າງກາຍ", hint: "ໃຊ້ເບິ່ງສິ່ງຕ່າງໆ" },
    { word: "ຫູ", category: "ຮ່າງກາຍ", hint: "ໃຊ້ຟັງສຽງ" },
    { word: "ປາກ", category: "ຮ່າງກາຍ", hint: "ໃຊ້ເວົ້າແລະກິນ" },
    { word: "ດັງ", category: "ຮ່າງກາຍ", hint: "ໃຊ້ດົມກິ່ນແລະຫາຍໃຈ" },
    { word: "ຂາ", category: "ຮ່າງກາຍ", hint: "ໃຊ້ຍ່າງແລະແລ່ນ" },
    { word: "ຫົວ", category: "ຮ່າງກາຍ", hint: "ສ່ວນເທິງສຸດຂອງກາຍ" },
    { word: "ແຂນ", category: "ຮ່າງກາຍ", hint: "ຕໍ່ຈາກບ່າຫາມື" },
    { word: "ຜົມ", category: "ຮ່າງກາຍ", hint: "ເສັ້ນເທິງຫົວ" },
    { word: "ແຂ້ວ", category: "ຮ່າງກາຍ", hint: "ໃຊ້ຫຍ້ຳອາຫານ" },
    { word: "ຄໍ", category: "ຮ່າງກາຍ", hint: "ຕໍ່ລະຫວ່າງຫົວກັບໂຕ" },
    { word: "ຫຼັງ", category: "ຮ່າງກາຍ", hint: "ດ້ານກົງຂ້າມກັບໜ້າເອິກ" },
    { word: "ທ້ອງ", category: "ຮ່າງກາຍ", hint: "ສ່ວນບັນຈຸກິນອາຫານ" },
    { word: "ນິ້ວ", category: "ຮ່າງກາຍ", hint: "ສ່ວນປາຍຂອງມື" },
    { word: "ໜ້າ", category: "ຮ່າງກາຍ", hint: "ໃບໜ້າຂອງຄົນ" },

    // ທຳມະຊາດ (Nature)
    { word: "ນໍ້າ", category: "ທຳມະຊາດ", hint: "ທາດແຫຼວດື່ມກິນ" },
    { word: "ໄຟ", category: "ທຳມະຊາດ", hint: "ໃຫ້ແສງສະຫວ່າງແລະຮ້ອນ" },
    { word: "ລົມ", category: "ທຳມະຊາດ", hint: "ອາກາດພັດຜ່ານ" },
    { word: "ດິນ", category: "ທຳມະຊາດ", hint: "ພື້ນດິນທີ່ເຮົາຢຽບ" },
    { word: "ຟ້າ", category: "ທຳມະຊາດ", hint: "ທ້ອງຟ້າສີຄາມ" },
    { word: "ດາວ", category: "ທຳມະຊາດ", hint: "ສ່ອງແສງຍາມກາງຄືນ" },
    { word: "ແດດ", category: "ທຳມະຊາດ", hint: "ແສງຈາກຕາເວັນ" },
    { word: "ຝົນ", category: "ທຳມະຊາດ", hint: "ຢາດນໍ້າຕົກຈາກຟ້າ" },
    { word: "ໝອກ", category: "ທຳມະຊາດ", hint: "ອາຍນໍ້າຍາມເຊົ້າໜາວ" },
    { word: "ຫີນ", category: "ທຳມະຊາດ", hint: "ກ້ອນແຂງຕາມພື້ນດິນ" },
    { word: "ໄມ້", category: "ທຳມະຊາດ", hint: "ເນື້ອໄມ້ ຕົ້ນໄມ້" },
    { word: "ປ່າ", category: "ທຳມະຊາດ", hint: "ບ່ອນມີຕົ້ນໄມ້ໜາແໜ້ນ" },
    { word: "ພູ", category: "ທຳມະຊາດ", hint: "ເນີນດິນຫີນສູງໃຫຍ່" },
    { word: "ນາ", category: "ທຳມະຊາດ", hint: "ບ່ອນປູກເຂົ້າ" },
    { word: "ຫ້ວຍ", category: "ທຳມະຊາດ", hint: "ສາຍນໍ້າໄຫຼນ້ອຍໆ" },
    { word: "ໜອງ", category: "ທຳມະຊາດ", hint: "ແຫຼ່ງນໍ້າຂັງທຳມະຊາດ" },
    { word: "ຕາເວັນ", category: "ທຳມະຊາດ", hint: "ດາວເລິກໃຫ້ຄວາມຮ້ອນ" },
    { word: "ເດືອນ", category: "ທຳມະຊາດ", hint: "ດວງຈັນຍາມຄໍ່າຄືນ" },

    // ອາຫານ ແລະ ພືດ (Food & Plants)
    { word: "ເຂົ້າ", category: "ອາຫານ", hint: "ອາຫານຫຼັກຂອງຄົນລາວ" },
    { word: "ຜັກ", category: "ອາຫານ", hint: "ພືດໃບຂຽວກິນໄດ້" },
    { word: "ຊີ້ນ", category: "ອາຫານ", hint: "ເນື້ອສັດໃຊ້ປຸງອາຫານ" },
    { word: "ໄຂ່", category: "ອາຫານ", hint: "ໄຂ່ໄກ່ ໄຂ່ເປັດ" },
    { word: "ເກືອ", category: "ອາຫານ", hint: "ເຄື່ອງປຸງລົດເຄັມ" },
    { word: "ນໍ້າຕານ", category: "ອາຫານ", hint: "ເຄື່ອງປຸງລົດຫວານ" },
    { word: "ໝາກໄມ້", category: "ອາຫານ", hint: "ຜົນຜະລິດຈາກຕົ້ນໄມ້" },
    { word: "ໝາກກ້ວຍ", category: "ອາຫານ", hint: "ໝາກໄມ້ເຫຼືອງລົດຫວານ" },
    { word: "ໝາກມ່ວງ", category: "ອາຫານ", hint: "ໝາກໄມ້ສົ້ມຫວານແຊບ" },
    { word: "ໝາກຫຸ່ງ", category: "ອາຫານ", hint: "ໃຊ້ຕຳສົ້ມແຊບຫຼາຍ" },
    { word: "ຕົ້ນໄມ້", category: "ພືດ", hint: "ພືດຢືນຕົ້ນສີຂຽວ" },
    { word: "ໃບໄມ້", category: "ພືດ", hint: "ໃບສີຂຽວສັງເຄາະແສງ" },
    { word: "ດອກໄມ້", category: "ພືດ", hint: "ສ່ວນມີກິ່ນຫອມສີງາມ" },
    { word: "ຫຍ້າ", category: "ພືດ", hint: "ພືດໃບນ້ອຍຕາມດິນ" },

    // ເຄື່ອງໃຊ້ ແລະ ສະຖານທີ່ (Items & Places)
    { word: "ບ້ານ", category: "ສະຖານທີ່", hint: "ທີ່ຢູ່ອາໄສ ແລະ ຊຸມຊົນ" },
    { word: "ເຮືອນ", category: "ສະຖານທີ່", hint: "ສິ່ງປຸກສ້າງພັກເຊົາ" },
    { word: "ໂຕະ", category: "ເຄື່ອງໃຊ້", hint: "ເຄື່ອງເຮືອນໄວ້ວາງຂອງ" },
    { word: "ຕັ່ງ", category: "ເຄື່ອງໃຊ້", hint: "ເຄື່ອງເຮືອນໄວ້ນັ່ງ" },
    { word: "ຕຽງ", category: "ເຄື່ອງໃຊ້", hint: "ບ່ອນປູນອນ" },
    { word: "ປະຕູ", category: "ເຮືອນ", hint: "ຊ່ອງທາງເຂົ້າອອກ" },
    { word: "ປຶ້ມ", category: "ການຮຽນ", hint: "ເຈ້ຍຫຍິບເຫຼັ້ມໄວ້ອ່ານ" },
    { word: "ບິກ", category: "ການຮຽນ", hint: "ເຄື່ອງຂຽນໃສ່ນໍ້າມຶກ" },
    { word: "ສໍ", category: "ການຮຽນ", hint: "ເຄື່ອງຂຽນໄສ້ສີດຳ" },
    { word: "ລົດ", category: "ພາຫະນະ", hint: "ພາຫະນະມີລໍ້" },
    { word: "ເຮືອ", category: "ພາຫະນະ", hint: "ພາຫະນະແລ່ນຕາມນໍ້າ" },
    { word: "ວັດ", category: "ສະຖານທີ່", hint: "ບ່ອນບຳເພັນກຸສົນ" },
    { word: "ຕະຫຼາດ", category: "ສະຖານທີ່", hint: "ບ່ອນຊື້ຂາຍເຄື່ອງ" },
    { word: "ຮ້ານ", category: "ສະຖານທີ່", hint: "ສະຖານທີ່ຄ້າຂາຍ" },
    { word: "ຂົວ", category: "ສະຖານທີ່", hint: "ສິ່ງຂ້າມສາຍນໍ້າ" },
    { word: "ທາງ", category: "ສະຖານທີ່", hint: "ເສັ້ນທາງສັນຈອນ" },

    // ກິລິຍາ (Actions)
    { word: "ກິນ", category: "ກິລິຍາ", hint: "ກືນອາຫານລົງຄໍ" },
    { word: "ນອນ", category: "ກິລິຍາ", hint: "ພັກຜ່ອນຫຼັບຕາ" },
    { word: "ໄປ", category: "ກິລິຍາ", hint: "ເດີນທາງອອກຈາກບ່ອນເກົ່າ" },
    { word: "ມາ", category: "ກິລິຍາ", hint: "ເຄື່ອນມາຫາ" },
    { word: "ນັ່ງ", category: "ກິລິຍາ", hint: "ຢ່ອນກົ້ນລົງຕັ່ງ" },
    { word: "ຢືນ", category: "ກິລິຍາ", hint: "ຕັ້ງກົງດ້ວຍຕີນ" },
    { word: "ຍ່າງ", category: "ກິລິຍາ", hint: "ກ້າວຂາໄປຂ້າງໜ້າ" },
    { word: "ແລ່ນ", category: "ກິລິຍາ", hint: "ກ້າວຂາຢ່າງໄວວາ" },
    { word: "ໂດດ", category: "ກິລິຍາ", hint: "ຖີບໂຕຂຶ້ນຈາກພື້ນ" },
    { word: "ເບິ່ງ", category: "ກິລິຍາ", hint: "ໃຊ້ສາຍຕາຈ້ອງແນມ" },
    { word: "ຟັງ", category: "ກິລິຍາ", hint: "ໃຊ້ຫູຮັບສຽງ" },
    { word: "ເວົ້າ", category: "ກິລິຍາ", hint: "ອອກສຽງເປັນຖ້ອຍຄຳ" },
    { word: "ອ່ານ", category: "ກິລິຍາ", hint: "ເບິ່ງຕົວໜັງສືອອກສຽງ" },
    { word: "ຂຽນ", category: "ກິລິຍາ", hint: "ແຕ້ມຕົວອັກສອນ" },
    { word: "ຫົວ", category: "ກິລິຍາ", hint: "ສະແດງຄວາມມ່ວນຊື່ນ" },
    { word: "ໄຫ້", category: "ກິລິຍາ", hint: "ນໍ້າຕາໄຫຼຍ້ອນເສຍໃຈ" },
    { word: "ຮັກ", category: "ກິລິຍາ", hint: "ຄວາມຮູ້ສຶກຜູກພັນດີ" },
    { word: "ຮູ້", category: "ກິລິຍາ", hint: "ເຂົ້າໃຈແລະຮັບຊາບ" },
    { word: "ເຮັດ", category: "ກິລິຍາ", hint: "ປະຕິບັດຫຼືສ້າງຂຶ້ນ" },
    { word: "ຊອກ", category: "ກິລິຍາ", hint: "ຄົ້ນຫາສິ່ງທີ່ຕ້ອງການ" },
    { word: "ເຫັນ", category: "ກິລິຍາ", hint: "ພົບພໍ້ດ້ວຍຕາ" },
    { word: "ໃຫ້", category: "ກິລິຍາ", hint: "ມອບສິ່ງຂອງແກ່ຜູ້ອື່ນ" },
    { word: "ເອົາ", category: "ກິລິຍາ", hint: "ຮັບມາຫຼືຈັບໄວ້" },

    // ຄຸນນາມ ແລະ ສີ (Adjectives & Colors)
    { word: "ດີ", category: "ຄຸນນາມ", hint: "ຖືກຕ້ອງ ເໝາະສົມ" },
    { word: "ງາມ", category: "ຄຸນນາມ", hint: "ເບິ່ງແລ້ວເພີນຕາ" },
    { word: "ໃຫຍ່", category: "ຄຸນນາມ", hint: "ຂະໜາດກວ້າງໂຕ" },
    { word: "ນ້ອຍ", category: "ຄຸນນາມ", hint: "ຂະໜາດຈ່ອຍສັ້ນ" },
    { word: "ສູງ", category: "ຄຸນນາມ", hint: "ໄລຍະຕັ້ງຂຶ້ນຫຼາຍ" },
    { word: "\u0E95\u0ECD\u0EC8\u0EB2", category: "ຄຸນນາມ", hint: "ບໍ່ສູງ ຕິດພື້ນ" },
    { word: "ຍາວ", category: "ຄຸນນາມ", hint: "ມີໄລຍະທາງໄກ" },
    { word: "ສັ້ນ", category: "ຄຸນນາມ", hint: "ມີໄລຍະບໍ່ໄກ" },
    { word: "ໄວ", category: "ຄຸນນາມ", hint: "ໃຊ້ເວລານ້ອຍ ວ່ອງໄວ" },
    { word: "ຊ້າ", category: "ຄຸນນາມ", hint: "ໃຊ້ເວລາຫຼາຍ ອືດອາson" },
    { word: "ຮ້ອນ", category: "ຄຸນນາມ", hint: "ອຸນຫະພູມສູງ" },
    { word: "ໜາວ", category: "ຄຸນນາມ", hint: "ອຸນຫະພູມເຢັນຈັດ" },
    { word: "ແດງ", category: "ສີ", hint: "ສີເລືອດ ສີໄຟ" },
    { word: "ຂາວ", category: "ສີ", hint: "ສີປຽບດັ່ງຝ້າຍ" },
    { word: "ດຳ", category: "ສີ", hint: "ສີມືດຄືກາງຄືນ" },
    { word: "ຂຽວ", category: "ສີ", hint: "ສີໃບໄມ້ສົດ" },
    { word: "ເຫຼືອງ", category: "ສີ", hint: "ສີດອກຈຳປາທອງ" },
    { word: "ມື້ນີ້", category: "ເວລາ", hint: "ວັນປະຈຸບັນ" },
    { word: "ມື້ອື່ນ", category: "ເວລາ", hint: "ວັນຖັດໄປ" },
    { word: "ມື້ວານ", category: "ເວລາ", hint: "ວັນທີ່ຜ່ານມາແລ້ວ" }
  ],

  medium: [
    // ການສຶກສາ ແລະ ອາຊີບ (Education & Occupations)
    { word: "ໂຮງຮຽນ", category: "ການສຶກສາ", hint: "ບ່ອນສຶກສາຮ່ຳຮຽນ" },
    { word: "ຫ້ອງການ", category: "ການເຮັດວຽກ", hint: "ບ່ອນປະຕິບັດວຽກງານ" },
    { word: "ໂຮງໝໍ", category: "ສາທາລະນະສຸກ", hint: "ບ່ອນປິ່ນປົວຄົນເຈັບ" },
    { word: "ນັກຮຽນ", category: "ການສຶກສາ", hint: "ຜູ້ກຳລັງສຶກສາວິຊາ" },
    { word: "ຄູອາຈານ", category: "ການສຶກສາ", hint: "ຜູ້ຖ່າຍທອດຄວາມຮູ້" },
    { word: "ທ່ານໝໍ", category: "ສາທາລະນະສຸກ", hint: "ແພດປິ່ນປົວພະຍາດ" },
    { word: "ນາງພະຍາບານ", category: "ສາທາລະນະສຸກ", hint: "ຜູ້ເບິ່ງແຍງຄົນເຈັບ" },
    { word: "ຕຳຫຼວດ", category: "ອາຊີບ", hint: "ຜູ້ຮັກສາຄວາມສະຫງົບ" },
    { word: "ທະຫານ", category: "ອາຊີບ", hint: "ຜູ້ປົກປ້ອງປະເທດຊາດ" },
    { word: "ວິສະວະກອນ", category: "ອາຊີບ", hint: "ຜູ້ຊ່ຽວຊານການອອກແບບກໍ່ສ້າງ" },
    { word: "ຊາວນາ", category: "ອາຊີບ", hint: "ກະສິກອນປູກເຂົ້າ" },
    { word: "ພໍ່ຄ້າແມ່ຄ້າ", category: "ອາຊີບ", hint: "ຜູ້ປະກອບການຄ້າຂາຍ" },
    { word: "ພະນັກງານ", category: "ອາຊີບ", hint: "ຜູ້ເຮັດວຽກໃນອົງກອນ" },

    // ສັງຄົມ ແລະ ຄອບຄົວ (Society & Family)
    { word: "ຄອບຄົວ", category: "ສັງຄົມ", hint: "ສະຖາບັນພື້ນຖານຂອງຊີວິດ" },
    { word: "ພໍ່ແມ່", category: "ຄອບຄົວ", hint: "ຜູ້ໃຫ້ກຳເນີດແລະລ້ຽງດູ" },
    { word: "ປູ່ຍ່າ", category: "ຄອບຄົວ", hint: "ພໍ່ແລະແມ່ຂອງພໍ່" },
    { word: "ຕາຍາຍ", category: "ຄອບຄົວ", hint: "ພໍ່ແລະແມ່ຂອງແມ່" },
    { word: "ອ້າຍເອື້ອຍນ້ອງ", category: "ຄອບຄົວ", hint: "ພີ່ນ້ອງຮ່ວມສາຍເລືອດ" },
    { word: "ລູກຫຼານ", category: "ຄອບຄົວ", hint: "ຜູ້ສືບທອດຕະກຸນ" },
    { word: "ຍາດພີ່ນ້ອງ", category: "ຄອບຄົວ", hint: "ວົງສາຄະນາຍາດ" },
    { word: "ເພື່ອນມິດ", category: "ສັງຄົມ", hint: "ໝູ່ຄູ່ທີ່ດີຕໍ່ກັນ" },
    { word: "ໝູ່ສະໜິດ", category: "ສັງຄົມ", hint: "ເພື່ອນທີ່ຮູ້ໃຈກັນດີ" },
    { word: "ເພື່ອນບ້ານ", category: "ສັງຄົມ", hint: "ຄົນຢູ່ໃກ້ເຮືອນຄຽງ" },
    { word: "ຊຸມຊົນ", category: "ສັງຄົມ", hint: "ກຸ່ມຄົນຢູ່ຮ່ວມກັນ" },

    // ຄຸນນະທຳ ແລະ ອາລົມ (Virtues & Emotions)
    { word: "ຄວາມຮັກ", category: "ຄຸນນະທຳ", hint: "ຄວາມຮູ້ສຶກອັນບໍລິສຸດ" },
    { word: "ຄວາມສຸກ", category: "ອາລົມ", hint: "ຄວາມສະບາຍກາຍສະບາຍໃຈ" },
    { word: "ຄວາມຫວັງ", category: "ຈິດໃຈ", hint: "ສິ່ງທີ່ມຸ່ງໝັ້ນຢາກໃຫ້ເກີດ" },
    { word: "ຄວາມຈິງໃຈ", category: "ຄຸນນະທຳ", hint: "ບໍ່ຫຼອກລວງຕໍ່ກັນ" },
    { word: "ຄວາມຊື່ສັດ", category: "ຄຸນນະທຳ", hint: "ຕົງໄປຕົງມາ ບໍ່ຄົດໂກງ" },
    { word: "ຄວາມສາມັກຄີ", category: "ຄຸນນະທຳ", hint: "ຄວາມພ້ອມພຽງຮ່ວມໃຈ" },
    { word: "ຄວາມເມດຕາ", category: "ຄຸນນະທຳ", hint: "ຄວາມປາດຖະໜາໃຫ້ຜູ້ນອນພົ້ນທຸກ" },
    { word: "ຄວາມພະຍາຍາມ", category: "ຄຸນນະທຳ", hint: "ຄວາມບຸກບືນບໍ່ຍອມແພ້" },
    { word: "ຄວາມອົດທົນ", category: "ຄຸນນະທຳ", hint: "ທົນຕໍ່ຄວາມຍາກລຳບາກ" },
    { word: "ຄວາມກະຕັນຍູ", category: "ຄຸນນະທຳ", hint: "ຮູ້ບຸນຄຸນຜູ້ມີພະຄຸນ" },
    { word: "ນໍ້າໃຈ", category: "ຄຸນນະທຳ", hint: "ຄວາມເອື້ອເຟື້ອເພື່ອແຜ່" },
    { word: "ແບ່ງປັນ", category: "ຄຸນນະທຳ", hint: "ປັນສິ່ງຂອງໃຫ້ຜູ້ອື່ນ" },
    { word: "ຊ່ວຍເຫຼືອ", category: "ຄຸນນະທຳ", hint: "ຍື່ນມືແກ້ໄຂຄວາມຫຍຸ້ງຍາກ" },
    { word: "ຮັກແພງ", category: "ຄຸນນະທຳ", hint: "ສະໜິດສະໜົມເອົາໃຈໃສ່" },
    { word: "ນັບຖື", category: "ຄຸນນະທຳ", hint: "ໃຫ້ກຽດແລະເຄົາລົບ" },
    { word: "ເບິ່ງແຍງ", category: "ຄຸນນະທຳ", hint: "ປົກປ້ອງຮັກສາເອົາໃຈໃສ່" },

    // ວັດທະນະທຳ ແລະ ປະເພນີ (Culture & Tradition)
    { word: "ວັດທະນະທຳ", category: "ວັດທະນະທຳ", hint: "ແບບແຜນການດຳລົງຊີວິດອັນດີ" },
    { word: "ຮີດຄອງປະເພນີ", category: "ວັດທະນະທຳ", hint: "ຮີດສິບສອງ ຄອງສິບສີ່" },
    { word: "ບຸນປີໃໝ່ລາວ", category: "ປະເພນີ", hint: "ບຸນສົງການຫົດນໍ້າເດືອນຫ້າ" },
    { word: "ບຸນທາດຫຼວງ", category: "ປະເພນີ", hint: "ງານບຸນໃຫຍ່ເດືອນສິບສອງ" },
    { word: "ບຸນຊ່ວງເຮືອ", category: "ປະເພນີ", hint: "ການແຂ່ງຂັນເຮືອພາຍຍາມອອກພັນສາ" },
    { word: "ບຸນບັ້ງໄຟ", category: "ປະເພນີ", hint: "ຈຸດບັ້ງໄຟຂໍຝົນເດືອນຫົກ" },
    { word: "ຕັກບາດ", category: "ປະເພນີ", hint: "ໃສ່ບາດພຣະສົງຍາມເຊົ້າ" },
    { word: "ບາສີສູ່ຂວັນ", category: "ປະເພນີ", hint: "ມັດແຂນຮຽກຂວັນໃຫ້ພອນ" },
    { word: "ຜ້າສິ້ນໄໝ", category: "ຫັດຖະກຳ", hint: "ຜ້າຕໍ່າພື້ນເມືອງຍິງລາວ" },
    { word: "ດອກຈຳປາ", category: "ເອກະລັກ", hint: "ດອກໄມ້ປະຈຳຊາດລາວ" },
    { word: "ສຽງແຄນລາວ", category: "ດົນຕີ", hint: "ເຄື່ອງດົນຕີມໍລະດົກໂລກ" },
    { word: "ຂັບລຳພື້ນເມືອງ", category: "ດົນຕີ", hint: "ສິລະປະການຮ້ອງລຳແບບລາວ" },

    // ອາຫານພື້ນເມືອງລາວ (Traditional Lao Food)
    { word: "ເຂົ້າໜຽວ", category: "ອາຫານລາວ", hint: "ເຂົ້າໜຽວໃສ່ຕິບຫອມນຸ່ມ" },
    { word: "ຕຳໝາກຮຸ່ງ", category: "ອາຫານລາວ", hint: "ຕຳສົ້ມແຊບໃສ່ປາແດກ" },
    { word: "ລາບໄກ່", category: "ອາຫານລາວ", hint: "ອາຫານມຸງຄຸນພື້ນເມືອງລາວ" },
    { word: "ລາບຊີ້ນ", category: "ອາຫານລາວ", hint: "ອາຫານປະເພດລາບໃສ່ເຂົ້າຂົ້ວ" },
    { word: "ແກງໜໍ່ໄມ້", category: "ອາຫານລາວ", hint: "ແກງໃສ່ນໍ້າຢານາງແລະເຫັດ" },
    { word: "ແກງອ່ອມ", category: "ອາຫານລາວ", hint: "ແກງພື້ນບ້ານໃສ່ຜັກຫອມ" },
    { word: "ໝົກປາ", category: "ອາຫານລາວ", hint: "ປາຫໍ່ໃບຕອງໜຶ້ງຫອມ" },
    { word: "ປີ້ງໄກ່", category: "ອາຫານລາວ", hint: "ປີ້ງໄກ່ນາຫອມກອບ" },
    { word: "ໄສ້ອົ່ວ", category: "ອາຫານລາວ", hint: "ໄສ້ກອກໝູໃສ່ສະໝຸນໄພລາວ" },
    { word: "ແຈ່ວບອງ", category: "ອາຫານລາວ", hint: "ແຈ່ວຊື່ດັງແຂວງຫຼວງພະບາງ" },
    { word: "ແຈ່ວໝາກເຂືອ", category: "ອາຫານລາວ", hint: "ແຈ່ວຕຳໃສ່ໝາກເຂືອຈີ່" },
    { word: "ເຂົ້າປຸ້ນ", category: "ອາຫານລາວ", hint: "ເສັ້ນເຂົ້າປຸ້ນນໍ້າຢາແຊບ" },
    { word: "ເຂົ້າຈີ່", category: "ອາຫານລາວ", hint: "ເຂົ້າຈີ່ຝຣັ່ງໃສ່ປາເຕ້" },

    // ແຂວງ ແລະ ສະຖານທີ່ (Provinces & Landmarks)
    { word: "ນະຄອນຫຼວງວຽງຈັນ", category: "ພູມສາດ", hint: "ເມືອງຫຼວງຂອງ ສປປ ລາວ" },
    { word: "ຫຼວງພະບາງ", category: "ພູມສາດ", hint: "ເມືອງມໍລະດົກໂລກ" },
    { word: "ຈຳປາສັກ", category: "ພູມສາດ", hint: "ແຂວງພາກໃຕ້ທີ່ມີວັດພູ" },
    { word: "ສະຫວັນນະເຂດ", category: "ພູມສາດ", hint: "ແຂວງທີ່ມີພົນລະເມືອງຫຼາຍ" },
    { word: "ຄຳມ່ວນ", category: "ພູມສາດ", hint: "ແຂວງທີ່ມີຖໍ້າກອງລໍ" },
    { word: "ຊຽງຂວາງ", category: "ພູມສາດ", hint: "ດິນແດນທົ່ງໄຫຫີນ" },
    { word: "ຫົວພັນ", category: "ພູມສາດ", hint: "ເມືອງຊຳເໜືອ ຜ້າໄໝງາມ" },
    { word: "ຜົ້ງສາລີ", category: "ພູມສາດ", hint: "ດິນແດນຊາພັນປີ ພາກເໜືອສຸດ" },
    { word: "ບໍ່ແກ້ວ", category: "ພູມສາດ", hint: "ດິນແດນສາມຫຼ່ຽມຄຳ" },
    { word: "ໄຊຍະບູລີ", category: "ພູມສາດ", hint: "ແຂວງແຫ່ງເທສະການຊ້າງ" },
    { word: "ອຸດົມໄຊ", category: "ພູມສາດ", hint: "ສູນກາງຄົມມະນາຄົມພາກເໜືອ" },
    { word: "ຫຼວງນໍ້າທາ", category: "ພູມສາດ", hint: "ດິນແດນທ່ອງທ່ຽວທຳມະຊາດ" },
    { word: "ສາລະວັນ", category: "ພູມສາດ", hint: "ດິນແດນລຳສາລະວັນ" },
    { word: "ເຊກອງ", category: "ພູມສາດ", hint: "ແຂວງທີ່ມີສາຍນໍ້າເຊກອງ" },
    { word: "ອັດຕະປື", category: "ພູມສາດ", hint: "ແຂວງພາກໃຕ້ສຸດແດນລາວ" },
    { word: "ໄຊສົມບູນ", category: "ພູມສາດ", hint: "ແຂວງທີ່ມີຍອດພູເບ້ຍສູງສຸດ" },
    { word: "ວັງວຽງ", category: "ສະຖານທີ່", hint: "ເມືອງທ່ອງທ່ຽວພູຫີນປູນ" },
    { word: "ສີ່ພັນດອນ", category: "ສະຖານທີ່", hint: "ໝູ່ເກາະກາງສາຍນໍ້າຂອງ" },
    { word: "ຄອນພະເພັງ", category: "ສະຖານທີ່", hint: "ນໍ້າຕົກຕາດໃຫຍ່ໄນອາການາແຫ່ງອາຊີ" },
    { word: "ທາດຫຼວງ", category: "ສະຖານທີ່", hint: "ປູຊະນີຍະສະຖານຄູ່ບ້ານຄູ່ເມືອງ" },
    { word: "ປະຕູໄຊ", category: "ສະຖານທີ່", hint: "ອະນຸສອນສະຖານໃຈກາງວຽງຈັນ" }
  ],

  hard: [
    // ສຸພາສິດ ແລະ ຄຳພັງເພີຍ (Lao Proverbs & Idioms)
    {
      word: "ກິນເຂົ້າປ່າ ຢ່າລືມພ້າ ໄປໜອງຢ່າລືມມອງ",
      category: "ສຸພາສິດ",
      hint: "ສອນໃຫ້ມີຄວາມກຽມພ້ອມ ແລະ ຮອບຄອບໃນທຸກວຽກງານ"
    },
    {
      word: "ຄວາມພະຍາຍາມຢູ່ໃສ ຄວາມສຳເລັດຢູ່ຫັ້ນ",
      category: "ສຸພາສິດ",
      hint: "ຄວາມມຸ່ງໝັ້ນບຸກບືນຍ່ອມນຳພາໄປສູ່ຜົນສຳເລັດ"
    },
    {
      word: "ສິບປາກເວົ້າ ບໍ່ທໍ່ຕາເຫັນ ສິບຕາເຫັນ ບໍ່ທໍ່ມືບາຍ",
      category: "ສຸພາສິດ",
      hint: "ການລົງມືປະຕິບັດຈິງມີຄຸນຄ່າກວ່າພຽງແຕ່ໄດ້ຍິນໄດ້ຟັງ"
    },
    {
      word: "ນໍ້າຂຶ້ນໃຫ້ຮີບຕັກ ບາດນໍ້າບົກແຫ້ງຈະອຶດຢາກ",
      category: "ສຸພາສິດ",
      hint: "ເມື່ອມີໂອກາດດີເຂົ້າມາໃຫ້ຮີບຄວ້າເອົາໄວ້"
    },
    {
      word: "ໄມ້ລຳດຽວ ລ້ອມຮົ້ວບໍ່ໄຂວ່ ໄພ່ບໍ່ພ້ອມ ແປງບ້ານບໍ່ເຮືອງ",
      category: "ສຸພາສິດ",
      hint: "ສອນເລື່ອງຄວາມສາມັກຄີ ພ້ອມພຽງກັນສ້າງສາບ້ານເມືອງ"
    },
    {
      word: "ຮັກລູກໃຫ້ຜູກ ຮັກງົວໃຫ້ລ່າມ",
      category: "ສຸພາສິດ",
      hint: "ການລ້ຽງດູລູກຫຼານຕ້ອງມີລະບຽບວິໄນ ແລະ ຄອຍຕັກເຕືອນ"
    },
    {
      word: "ເດີນຕາມຮອຍຜູ້ໃຫຍ່ ໝາບໍ່ກັດ",
      category: "ສຸພາສິດ",
      hint: "ປະຕິບັດຕາມຄຳສັ່ງສອນຂອງຜູ້ອາວຸໂສຍ່ອມປອດໄພ"
    },
    {
      word: "ບຸນຄຸນພໍ່ແມ່ ໜັກກວ່າແຜ່ນດິນ ກວ້າງກວ່າແຜ່ນຟ້າ",
      category: "ສຸພາສິດ",
      hint: "ພະຄຸນຂອງພໍ່ແມ່ຍິ່ງໃຫຍ່ຫາສິ່ງໃດປຽບບໍ່ໄດ້"
    },
    {
      word: "ພາສາບອກຊາດ ມາລະຍາດບອກຕະກູນ",
      category: "ສຸພາສິດ",
      hint: "ການປາກເວົ້າແລະກິລິຍາສ່ອງແສງເຖິງການອົບຮົມບົ່ມສອນ"
    },
    {
      word: "ຢາກກິນເຂົ້າ ໃຫ້ປູກໃສ່ນາ ຢາກມີປາ ໃຫ້ມັ່ນລ້ຽງ",
      category: "ສຸພາສິດ",
      hint: "ສອນໃຫ້ດຸໝັ່ນທຳມາຫາກິນ ບໍ່ຄອຍຖ້າແຕ່ໂຊກຊາຕາ"
    },
    {
      word: "ມີເງິນເພິ່ນວ່ານ້ອງ ມີຄຳເພິ່ນວ່າອ້າຍ ຍາມທຸກໄຮ້ ຍາດພີ່ນ້ອງບໍ່ແລ",
      category: "ສຸພາສິດ",
      hint: "ສັດຈະທຳຊີວິດກ່ຽວກັບຄຸນຄ່າຂອງຊັບສິນເງິນຄຳໃນສັງຄົມ"
    },
    {
      word: "ຄົບຄົນດີ ມີສີແກ່ຕົວ ຄົບຄົນຊົ່ວ ພາຕົວໝົ່ນໝອງ",
      category: "ສຸພາສິດ",
      hint: "ການເລືອກຄົບໝູ່ເພື່ອນຍ່ອມສົ່ງຜົນຕໍ່ອະນາຄົດຂອງຕົນ"
    },
    {
      word: "ຮຽນແລ້ວຮຽນອີກ ຮຽນເລື້ອຍໆໄປ ເພື່ອພັດທະນາຕົນເອງ",
      category: "ຄຳຂວັນ",
      hint: "ການຮຽນຮູ້ຕະຫຼອດຊີວິດບໍ່ມີມື້ສິ້ນສຸດ"
    },

    // ປະໂຫຍກທາງການ ແລະ ວັດທະນະທຳຊັ້ນສູງ
    {
      word: "ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ເອກະພາບ ວັດທະນະຖາວອນ",
      category: "ຄຳຂວັນຊາດ",
      hint: "ຄຳຂວັນປະຈຳຊາດ ແຫ່ງ ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ"
    },
    {
      word: "ຄວາມສາມັກຄີ ປອງດອງ ລະຫວ່າງ ປະຊາຊົນບັນດາເຜົ່າ ຄືກຳລັງແຮງສຳຄັນ",
      category: "ການເມືອງສັງຄົມ",
      hint: "ຄວາມເປັນປຶກແຜ່ນແໜ້ນໜາຂອງຄົນລາວທຸກຊົນເຜົ່າ"
    },
    {
      word: "ສຽງແຄນແດນຈຳປາ ສຽງເພງແຫ່ງສັນຕິພາບ ແລະ ມິດຕະພາບ",
      category: "ວັດທະນະທຳ",
      hint: "ເອກະລັກດົນຕີພື້ນເມືອງລາວທີ່ດັງກ້ອງໄປທົ່ວໂລກ"
    },
    {
      word: "ມໍລະດົກວັດທະນະທຳ ທີ່ຈັບຕ້ອງບໍ່ໄດ້ ແຫ່ງມວນມະນຸດ ຄືຄວາມພາກພູມໃຈ ຂອງຊາດລາວ",
      category: "ມໍລະດົກ",
      hint: "ການຍົກຍ້ອງສຽງແຄນລາວໂດຍອົງການ UNESCO"
    },
    {
      word: "ການສຶກສາ ຄືຮາກຖານອັນໜັກແໜ້ນ ຂອງການພັດທະນາ ປະເທດຊາດ",
      category: "ການສຶກສາ",
      hint: "ການສ້າງຄົນສ້າງຊາດດ້ວຍຄວາມຮູ້ແລະປັນຍາ"
    },
    {
      word: "ປົກປັກຮັກສາ ສິ່ງແວດລ້ອມ ແລະ ຊັບພະຍາກອນ ທຳມະຊາດ ເພື່ອຄົນຮຸ່ນຫຼັງ",
      category: "ສິ່ງແວດລ້ອມ",
      hint: "ການອະນຸລັກທຳມະຊາດ ປ່າໄມ້ ແລະ ສາຍນໍ້າ"
    },
    {
      word: "ສາຍນໍ້າຂອງ ໄຫຼລິນ ຫຼໍ່ລ້ຽງຊີວິດ ແລະ ວັດທະນະທຳ ຊາວລາວສອງຝັ່ງ",
      category: "ທຳມະຊາດ",
      hint: "ແມ່ນໍ້າຂອງສາຍເລືອດຫຼັກແຫ່ງຊີວິດ"
    },
    {
      word: "ອຸດົມສົມບູນ ດ້ວຍພູຜາປ່າໄມ້ ທຳມະຊາດ ຂຽວສົດງົດງາມ",
      category: "ທຳມະຊາດ",
      hint: "ຄວາມອຸດົມສົມບູນຂອງຜືນແຜ່ນດິນລາວ"
    },
    {
      word: "ເມືອງລາວສວຍງາມ ດັ່ງດວງດອກໄມ້ ບານຮັບແສງຕາເວັນ",
      category: "ກາບກອນ",
      hint: "ບົດກອນຍ້ອງຍໍຄວາມງົດງາມຂອງປະເທດລາວ"
    },
    {
      word: "ຮັກສາຮີດຄອງ ປະເພນີອັນດີງາມ ທີ່ປູ່ຍ່າຕາຍາຍ ສືບທອດມາ",
      category: "ວັດທະນະທຳ",
      hint: "ການສືບສານຄ່ານິຍົມແລະວັດທະນະທຳອັນລ້ຳຄ່າ"
    },
    {
      word: "ຄວາມຊື່ສັດ ບໍລິສຸດ ຄືແກ້ວສາລະພັດນຶກ ຂອງມະນຸດ",
      category: "ຄຳສອນ",
      hint: "ການມີຄຸນນະທຳແລະຄວາມສັດຊື່ໃນໃຈ"
    }
  ]
};

// ກວດສອບສະເພາະຕົວອັກສອນລາວແທ້ Unicode (U+0E80 - U+0EFF) ແລະ ສັນຍະລັກເງິນກີບ (₭ U+20AD) ລວມທັງຕົວອັກສອນໄທທີ່ຕ້ອງແປງ
function isNativeLaoChar(char) {
  if (!char) return false;
  const code = char.charCodeAt(0);
  return (code >= 0x0E80 && code <= 0x0EFF) || (code >= 0x0E00 && code <= 0x0E7F) || code === 0x20AD;
}

// ກວດສອບຕົວອັກສອນທີ່ຮອງຮັບເທິງແປ້ນພິມລາວ (ລວມທັງຕົວເລກ, ເຄື່ອງໝາຍ, ຍະຫວ່າງ, ແລະ ແປ້ນພິມໄທ)
function isValidLaoChar(char) {
  if (!char) return false;
  const code = char.charCodeAt(0);
  if (code >= 0x0E80 && code <= 0x0EFF) return true;
  if (code >= 0x0E00 && code <= 0x0E7F) return true; // ຮອງຮັບແປ້ນພິມໄທ (Thai layout)
  if (code === 0x20AD) return true; // ₭
  if (code === 0x20) return true;   // space
  if (code >= 33 && code <= 126) return true; // punctuation and numbers
  return false;
}

// ປັບຮູບແບບຂໍ້ຄວາມພາສາລາວໃຫ້ເປັນມາດຕະຖານດຽວກັນ (Canonical Lao Normalization)
// ແຍກ/ແປງຕົວປະສົມ: ໝ <-> ຫມ, ໜ <-> ຫນ, ຫຼ <-> ຫລ, ຼ <-> ລ
// ແລະ ປັບສະຫຼະ ອຳ/ອໍ້າ/ອໍ່ໍາ: ໍ + ວັນນະຍຸດ + າ (ມາດຕະຖານແບບຮຽນຊັ້ນ ປ.1 ສວສ ກະຊວງສຶກສາ)
function canonicalizeLao(str) {
  if (!str) return '';
  let s = str.normalize('NFC');

  // 1. ແປງຕົວອັກສອນໄທເປັນລາວ (ກໍລະນີຜູ້ໃຊ້ເປີດແປ້ນພິມໄທແລ້ວພິມ)
  s = s.replace(/[\u0E01-\u0E5B]/g, (ch) => {
    const code = ch.charCodeAt(0);
    if (code >= 0x0E48 && code <= 0x0E4B) return String.fromCharCode(code + 0x80);
    if (code >= 0x0E30 && code <= 0x0E44) return String.fromCharCode(code + 0x80);
    if (code === 0x0E4D) return '\u0ECD'; // ํ Thai Nikhahit -> Lao ໍ
    return ch;
  });
  s = s.replace(/\u0E4D/g, '\u0ECD');
  s = s.replace(/\u0E33/g, '\u0EB3');

  // 2. ຕັດ placeholder ຍະຫວ່າງ/NBSP/ZWSP/Dotted Circle ທີ່ມັກຕິດມານຳວັນນະຍຸດໃນ Mobile IME
  s = s.replace(/[\u0020\u00A0\u200B\u25CC]+/g, '');

  // 3. ແປງຕົວປະສົມພິເສດ
  s = s.replace(/ໝ/g, 'ຫມ');
  s = s.replace(/ໜ/g, 'ຫນ');
  s = s.replace(/ຫຼ/g, 'ຫລ');
  s = s.replace(/\u0EBC/g, 'ລ'); // ຼ

  // 4. ແປງ ໄມ້ຕີ (Shift+H ໊) ເປັນ ໄມ້ໂທ (້) ແລະ ໄມ້ຈັດຕະວາ (Shift+J ໋) ເປັນ ໄມ້ເອກ (່) ປ້ອງກັນກົດ Shift ຄ້າງ
  s = s.replace(/\u0ECA/g, '\u0EC9');
  s = s.replace(/\u0ECB/g, '\u0EC8');

  // 5. ຈັດລຽງວັນນະຍຸດກັບ ນິຄະຫິດ ( ໍ ): ວັນນະຍຸດກ່ອນ ໍ -> ໍ ກ່ອນວັນນະຍຸດ (ເຊັ່ນ ້+ໍ -> ໍ້, ່+ໍ -> ໍ່)
  s = s.replace(/([\u0EC8-\u0ECC])\u0ECD/g, '\u0ECD$1');

  // 6. ແປງທຸກຮູບແບບຂອງ ສະຫຼະ ອຳ (້ຳ, ຳ້, ໍ້າ, ໍ່ໍາ, ໍ-້-າ, ້-ໍ-າ, ຳ) ໃຫ້ເປັນມາດຕະຖານດຽວກັນ: ໍ + ວັນນະຍຸດ + າ
  s = s.replace(/([\u0EC8-\u0ECC])\u0EB3/g, '\u0ECD$1\u0EB2');
  s = s.replace(/\u0EB3([\u0EC8-\u0ECC])/g, '\u0ECD$1\u0EB2');
  s = s.replace(/\u0EB3/g, '\u0ECD\u0EB2');
  s = s.replace(/([\u0EC8-\u0ECC])\u0ECD\u0EB2/g, '\u0ECD$1\u0EB2');
  s = s.replace(/\u0ECD\u0EB2([\u0EC8-\u0ECC])/g, '\u0ECD$1\u0EB2');

  // 7. ຮອງຮັບທັງ ຕ່ຳ (ຕ-່-ຳ, ຕ-ຳ-່) ແລະ ຕໍ່າ (ຕ-ໍ-່-າ)
  s = s.replace(/ຕ\u0ECD?\u0EC8?\u0EB3\u0EC8?/g, 'ຕ\u0ECD\u0EC8\u0EB2');

  // 8. ຈັດລຽງວັນນະຍຸດທີ່ພິມຫຼັງ ສະຫຼະ ອາ (າ): ຊ-າ-້ -> ຊ-້-າ, ມ-າ-້ -> ມ-້-າ, ປ-າ-່ -> ປ-່-າ
  s = s.replace(/\u0EB2([\u0EC8-\u0ECC])/g, '$1\u0EB2');

  // 9. ຈັດລຽງວັນນະຍຸດທີ່ພິມຫຼັງຕົວສະກົດທ້າຍຄຳ: ຊ-າ-ງ-້ -> ຊ-້-າ-ງ, ບ-າ-ນ-້ -> ບ-້-າ-ນ, ຮ-າ-ນ-້ -> ຮ-້-າ-ນ
  s = s.replace(/([\u0E80-\u0EAE])\u0EB2([\u0E80-\u0EAE])([\u0EC8-\u0ECC])/g, '$1$3\u0EB2$2');

  // 10. ຈັດລຽງວັນນະຍຸດ ແລະ ສະຫຼະເທິງອື່ນໆ: ສະຫຼະ + ວັນນະຍຸດ (ເຊັ່ນ ້ + ັ -> ັ້, ້ + ິ -> ິ້, ້ + ົ -> ົ້)
  s = s.replace(/([\u0EC8-\u0ECC])([\u0EB1\u0EB4-\u0EB9\u0EBB])/g, '$2$1');

  return s;
}

/**
 * ກວດສອບວ່າ typedInput ເປັນສ່ວນນຳໜ້າ (Prefix) ທີ່ຖືກຕ້ອງຂອງ targetWord ຫຼື ບໍ່
 * ຮອງຮັບການພິມສະຫຼະ-ວັນນະຍຸດທັງ 2 ແບບ: ວັນນະຍຸດກ່ອນສະຫຼະອຳ (ນ້ຳ) ຫຼື ສະຫຼະອຳກ່ອນວັນນະຍຸດ (ນຳ້)
 * ແລະ ຮອງຮັບຕົວປະສົມ: ໝ <-> ຫມ, ໜ <-> ຫນ, ຫຼ <-> ຫລ
 */
function isLaoPrefixMatch(targetWord, typedInput) {
  if (!typedInput) return true;
  if (!targetWord) return false;

  const canonTarget = canonicalizeLao(targetWord);
  const canonInput = canonicalizeLao(typedInput);

  if (canonTarget.startsWith(canonInput)) {
    return true;
  }

  // ກໍລະນີພິມສະຫຼະອຳ (ຳ) ກ່ອນວັນນະຍຸດໃນຂະນະທີ່ຄຳສັບເປົ້າໝາຍມີວັນນະຍຸດກ່ອນ (ເຊັ່ນ ພິມ 'ນຳ' ສຳລັບ 'ນ້ຳ')
  // ປຽບທຽບໂດຍການຕັດວັນນະຍຸດອອກຊົ່ວຄາວ ເພື່ອກວດສອບພະຍັນຊະນະແລະສະຫຼະຫຼັກ
  const targetNoTones = canonTarget.replace(/[\u0EC8-\u0ECC]/g, '');
  const inputNoTones = canonInput.replace(/[\u0EC8-\u0ECC]/g, '');

  if (targetNoTones.startsWith(inputNoTones)) {
    // ຖ້າພະຍັນຊະນະແລະສະຫຼະຕົກກັນ, ກວດສອບວ່າວັນນະຍຸດທີ່ພິມໄປແລ້ວ (ຖ້າມີ) ແມ່ນຖືກຕ້ອງ
    const typedTones = canonInput.match(/[\u0EC8-\u0ECC]/g) || [];
    const targetTones = canonTarget.substring(0, canonInput.length + 2).match(/[\u0EC8-\u0ECC]/g) || [];
    return typedTones.every(t => targetTones.includes(t));
  }

  return false;
}

/**
 * ຊອກຫາສ່ວນນຳໜ້າຂອງຄຳສັບເປົ້າໝາຍທີ່ພິມຖືກຕ້ອງແລ້ວ ເພື່ອນຳໄປລົງສີຟ້າ (Cyan Overlay) ໃຫ້ຕົກກັບໂຕອັກສອນພື້ນຖານ 100%
 */
function getMatchedTargetPrefix(targetWord, typedInput) {
  if (!typedInput || !targetWord) return '';
  const canonInput = canonicalizeLao(typedInput);
  let bestPrefix = '';
  for (let i = 1; i <= targetWord.length; i++) {
    const sub = targetWord.substring(0, i);
    const canonSub = canonicalizeLao(sub);
    if (canonSub === canonInput) {
      return sub;
    }
    if (canonInput.startsWith(canonSub)) {
      bestPrefix = sub;
    }
  }
  return bestPrefix || targetWord.substring(0, Math.min(typedInput.length, targetWord.length));
}

/**
 * ທຳຄວາມສະອາດ ແລະ ແປງຕົວອັກສອນທີ່ພິມເຂົ້າມາ (Single/Keystroke Normalization)
 * ຮອງຮັບຕົວເລກ, ເຄື່ອງໝາຍ, ແປ້ນພິມໄທ, Shift+H/J ໂດຍບໍ່ແຍກຕົວປະສົມ ໝ, ໜ, ຫຼ ໃຫ້ເປັນສອງຕົວ
 */
function normalizeIncomingChar(char) {
  if (!char) return '';
  let s = char.replace(/[\u0020\u00A0\u200B\u25CC]/g, '');
  if (!s) return '';

  // 1. ແປງຕົວອັກສອນໄທເປັນລາວ
  s = s.replace(/[\u0E01-\u0E5B]/g, (ch) => {
    const code = ch.charCodeAt(0);
    if (code >= 0x0E48 && code <= 0x0E4B) return String.fromCharCode(code + 0x80);
    if (code >= 0x0E30 && code <= 0x0E44) return String.fromCharCode(code + 0x80);
    if (code === 0x0E4D) return '\u0ECD';
    return ch;
  });
  s = s.replace(/\u0E4D/g, '\u0ECD');
  s = s.replace(/\u0E33/g, '\u0EB3');

  // 2. ແປງ ໄມ້ຕີ (Shift+H ໊) ເປັນ ໄມ້ໂທ (້) ແລະ ໄມ້ຈັດຕະວາ (Shift+J ໋) ເປັນ ໄມ້ເອກ (່) ຫາກກົດ Shift ຄ້າງ
  s = s.replace(/\u0ECA/g, '\u0EC9');
  s = s.replace(/\u0ECB/g, '\u0EC8');

  return s;
}

function getLaoGraphemeClusters(str) {
  if (!str) return [];
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter('lo', { granularity: 'grapheme' });
    return [...segmenter.segment(str)].map(s => s.segment);
  }
  return str.match(/[\u0E80-\u0EAE\u0EDC\u0EDD][\u0EBC]?[\u0EB1\u0EB4-\u0EB9\u0EBB\u0ECD]*[\u0EC8-\u0ECC]*|./gu) || str.split('');
}

/**
 * ຊອກຫາສ່ວນນຳໜ້າຂອງຄຳສັບເປົ້າໝາຍທີ່ພິມຄົບ Cluster ແລ້ວ ເພື່ອບໍ່ໃຫ້ສະຫຼະເທິງ/ລຸ່ມ (ເຊັ່ນ ີ, ິ, ັ, ້) ຫຼຸດແຍກອອກຈາກພະຍັນຊະນະ
 */
function getCompletedClusterPrefix(targetWord, typedInput) {
  if (!typedInput || !targetWord) return { matched: '', remaining: targetWord };
  const clusters = getLaoGraphemeClusters(targetWord);
  let matched = '';
  const canonInput = canonicalizeLao(typedInput);

  for (let i = 0; i < clusters.length; i++) {
    const candidate = matched + clusters[i];
    if (canonInput.startsWith(canonicalizeLao(candidate))) {
      matched = candidate;
    } else {
      break;
    }
  }
  const remaining = targetWord.substring(matched.length);
  return { matched, remaining };
}

const LAO_COMBINING_MARKS = new Set([
  '\u0EB1', '\u0EB4', '\u0EB5', '\u0EB6', '\u0EB7', '\u0EB8', '\u0EB9', '\u0EBB',
  '\u0EBC', '\u0ECD', '\u0EC8', '\u0EC9', '\u0ECA', '\u0ECB', '\u0ECC'
]);

/**
 * ສ້າງ HTML ຈັດຮູບແບບຄຳສັບປັດຈຸບັນທີ່ກຳລັງພິມ ໂດຍບໍ່ໃຫ້ສະຫຼະເທິງ/ລຸ່ມ (ເຊັ່ນ ີ, ິ, ັ, ້) ຫຼຸດແຍກ ຫຼື ເລີຍຂອບອອກມາ
 */
function formatLaoActiveWordHtml(targetWord, input) {
  if (!input) {
    return {
      html: `<span class="word-caret"></span><span class="char-pending">${targetWord}</span>`,
      isError: false
    };
  }

  const isMatch = (typeof isLaoPrefixMatch === 'function')
    ? isLaoPrefixMatch(targetWord, input)
    : canonicalizeLao(targetWord).startsWith(canonicalizeLao(input));

  if (isMatch) {
    const matched = (typeof getMatchedTargetPrefix === 'function')
      ? getMatchedTargetPrefix(targetWord, input)
      : input;
    const remaining = targetWord.substring(matched.length);
    let marks = '';
    let idx = 0;
    while (idx < remaining.length && LAO_COMBINING_MARKS.has(remaining[idx])) {
      marks += remaining[idx];
      idx++;
    }
    const rest = remaining.substring(idx);

    if (marks) {
      return {
        html: `<span class="char-correct">${matched}<span class="vowel-dim">${marks}</span></span><span class="word-caret"></span><span class="char-pending">${rest}</span>`,
        isError: false
      };
    } else {
      return {
        html: `<span class="char-correct">${matched}</span><span class="word-caret"></span><span class="char-pending">${rest}</span>`,
        isError: false
      };
    }
  }

  // ພິມຜິດ (Error)
  let matched = '';
  let wrong = input;
  for (let i = input.length - 1; i >= 1; i--) {
    const sub = input.substring(0, i);
    if (typeof isLaoPrefixMatch === 'function' && isLaoPrefixMatch(targetWord, sub)) {
      matched = (typeof getMatchedTargetPrefix === 'function')
        ? getMatchedTargetPrefix(targetWord, sub)
        : sub;
      wrong = input.substring(matched.length);
      break;
    }
  }
  const remaining = targetWord.substring(matched.length);
  return {
    html: `<span class="char-correct">${matched}</span><span class="char-err">${wrong}</span><span class="word-caret error-caret"></span><span class="char-pending">${remaining}</span>`,
    isError: true
  };
}

if (typeof window !== 'undefined') {
  window.normalizeIncomingChar = normalizeIncomingChar;
  window.getLaoGraphemeClusters = getLaoGraphemeClusters;
  window.getCompletedClusterPrefix = getCompletedClusterPrefix;
  window.formatLaoActiveWordHtml = formatLaoActiveWordHtml;
  window.LAO_COMBINING_MARKS = LAO_COMBINING_MARKS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    LAO_WORDS,
    isNativeLaoChar,
    isValidLaoChar,
    canonicalizeLao,
    isLaoPrefixMatch,
    getMatchedTargetPrefix,
    normalizeIncomingChar,
    getLaoGraphemeClusters,
    getCompletedClusterPrefix,
    formatLaoActiveWordHtml,
    LAO_COMBINING_MARKS
  };
}
