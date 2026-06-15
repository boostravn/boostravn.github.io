export type IconName =
  | "Brain"
  | "HeartPulse"
  | "Shield"
  | "Coffee"
  | "Flame"
  | "BatteryLow"
  | "Leaf"
  | "Utensils"
  | "Users"
  | "Sprout"
  | "MessageCircle"
  | "Globe"
  | "Phone"
  | "Mail"
  | "Facebook"
  | "Instagram"
  | "Music2"
  | "ShoppingBag";

export type TagColor = "green" | "orange" | "blue" | "gold";

export interface Solution {
  title: string;
  body: string;
}

export interface ProblemItem {
  id: string;
  icon: IconName;
  iconBg: string;
  iconColor: string;
  label: string;
  solution: Solution;
}

export interface BenefitItem {
  icon: IconName;
  title: string;
  body: string;
}

export interface BrewingStep {
  n: number;
  title: string;
  body: string;
}

export interface ActivityItem {
  tag: { label: string; color: TagColor };
  title: string;
  body: string;
  footer: { label: string; icon: IconName };
}

export const landing = {
  banner: {
    emoji: "⚡",
    text: "Ưu đãi ra mắt: Tặng Bình Giữ Nhiệt In Logo Boostra khi mua Combo 2 Hộp Trà Dây Hồng Sâm cho đơn hàng đầu tiên.",
  },
  nav: {
    logo: { src: "/images/logo.svg", alt: "Boostra" },
    links: [
      { label: "Giới Thiệu", href: "#gioi-thieu" },
      { label: "Thành Phần", href: "#thanh-phan" },
      { label: "Đối Tác", href: "#doi-tac" },
      { label: "Lợi Ích", href: "#loi-ich" },
      { label: "Cách Ủ", href: "#cach-u" },
      { label: "Cửa Hàng", href: "#cua-hang" },
      { label: "Hoạt Động", href: "#hoat-dong" },
    ],
    cta: { label: "Mua Ngay", href: "#cua-hang" },
  },
  hero: {
    badge: "GIẢI PHÁP TỈNH TÁO CHO GEN Z & GEN Y",
    title: { line1: "Tỉnh Thức Tự Nhiên", line2: "Bảo Vệ Dạ Dày" },
    bodyHtml:
      'Sự kết hợp hoàn hảo từ <strong>Trà Dây Tây Bắc</strong> hỗ trợ tiêu hóa, trung hòa axit và <span class="text-(--color-rust) font-semibold">Hồng Sâm 6 Năm Tuổi</span> bồi bổ trí não. Tỉnh táo êm dịu, không lo bồn chồn lo âu hay sập nguồn năng lượng đột ngột.',
    primaryCta: { label: "Mua Thử Ngay", href: "#cua-hang" },
    secondaryCta: { label: "Xem Câu Chuyện", href: "#gioi-thieu" },
    stats: [
      { value: "100%", label: "Thảo Mộc Sạch" },
      { value: "0%", label: "Đường Tinh Luyện" },
      { value: "CE / FDA", label: "Đạt Chuẩn Quốc Tế" },
    ],
    product: {
      tagTop: "PREMIUM HERB BLEND",
      tagRight: "20 GÓI LỌC",
      title: "Trà Dây Hồng Sâm Thượng Hạng",
      footer: "Tỉnh thức tự nhiên • Êm dịu dạ dày",
      sticker: "Vị ngọt sâm thanh mát, cực ngon!",
      stickerEmoji: "💬",
    },
  },
  problems: {
    badge: "LỰA CHỌN GIẢI PHÁP",
    heading: "Bạn Gặp Rắc Rối Gì Khi Cần Giữ Tỉnh Táo?",
    items: [
      {
        id: "dau-da-day",
        icon: "Flame",
        iconBg: "#FBD9C9",
        iconColor: "#C2410C",
        label: "Đau Dạ Dày",
        solution: {
          title: "Trà Dây trung hòa axit",
          body: "Hoạt chất flavonoid trong Trà Dây Tây Bắc giúp trung hòa dịch vị, làm dịu niêm mạc và giảm cảm giác xót ruột khi nạp caffeine. Uống sau bữa sáng để bảo vệ bao tử êm ái suốt ngày dài.",
        },
      },
      {
        id: "bon-chon",
        icon: "HeartPulse",
        iconBg: "#FBE3DC",
        iconColor: "#C03C2A",
        label: "Bồn Chồn, Lo Âu",
        solution: {
          title: "Hồng Sâm cân bằng thần kinh",
          body: "Ginsenoside trong Hồng Sâm 6 năm tuổi điều hòa hệ thần kinh giao cảm, giúp tỉnh táo mà không hồi hộp, không run tay đau đầu. Tinh thần ổn định để tập trung sâu vào công việc.",
        },
      },
      {
        id: "tut-nang-luong",
        icon: "BatteryLow",
        iconBg: "#FFF1C2",
        iconColor: "#A57F18",
        label: "Tụt Năng Lượng",
        solution: {
          title: "Năng lượng bền bỉ, không sập nguồn",
          body: "Bộ đôi thảo dược nhả năng lượng từ từ, kéo dài 4-6 giờ tỉnh táo đều đặn. Không còn cảm giác hứng khởi rồi đổ ụp như cà phê đậm đặc — bạn giữ nhịp làm việc bền bỉ cả buổi chiều.",
        },
      },
      {
        id: "tra-dang",
        icon: "Coffee",
        iconBg: "#D6E4D1",
        iconColor: "#2D4A2B",
        label: "Sợ Trà Đắng Quá",
        solution: {
          title: "Hương vị ngọt dịu tự nhiên",
          body: "Vị ngọt sâm thanh mát hòa quyện hương trà dây dịu nhẹ — không cần đường, không pha chế cầu kỳ. Một ngụm là yêu, dễ uống cả với người mới bắt đầu chuyển từ cà phê sang trà.",
        },
      },
    ],
    defaultPrompt: {
      emoji: "👆",
      title: "Bấm chọn một vấn đề ở trên để xem giải pháp",
      body: "Tìm hiểu ngay cách hoạt chất thiên nhiên của Trà Dây & Hồng Sâm từ Boostra khắc phục triệt để các tác dụng phụ khó chịu của caffeine thông thường.",
    },
  },
  brand: {
    leftBadge: "ĐỊNH VỊ THƯƠNG HIỆU",
    leftHeading: "BOOSTRA = BOOST + TRÀ",
    leftBody:
      "Giải pháp thức uống thông minh thay thế caffeine truyền thống, hướng đến thế hệ trẻ hiện đại Gen Z & Gen Y bận rộn, cần năng lượng làm việc bền bỉ nhưng vẫn chú trọng bảo vệ sức khỏe hệ tiêu hóa lâu dài.",
    leftQuote:
      "Tỉnh thức tự nhiên - Chăm sóc dạ dày - Tiện lợi cho lối sống bận rộn.",
    rightBadge: "THẤU HIỂU KHÁCH HÀNG",
    rightHeading: "Năng Lượng Sạch Cho Nhịp Sống Hiện Đại",
    rightBody:
      "Phần lớn người trẻ hiện nay không có thời gian duy trì chế độ dinh dưỡng lành mạnh, dẫn tới stress và đau dạ dày phổ biến. Trà dây kết hợp hồng sâm ra đời nhằm đáp ứng nhu cầu tích hợp độc đáo: vừa giúp tinh thần tập trung cao độ để học tập và làm việc, vừa bảo vệ bao tử êm ái, thanh nhiệt.",
    callout: {
      emoji: "🍵",
      lead: "Tiện dụng tối đa:",
      body: "Quy cách đóng hộp 20 gói tiện dụng. Dễ dàng mang theo đi học, đi làm, pha chế nhanh gọn ngay tại văn phòng mà không cần dụng cụ pha chế phức tạp.",
    },
  },
  benefits: {
    badge: "HIỆU QUẢ SỬ DỤNG",
    heading: "Lợi Ích Nổi Bật Của Trà Boostra",
    items: [
      {
        icon: "Brain",
        title: "Tập trung bền bỉ",
        body: "Giúp bồi bổ trí não luôn tỉnh táo nhẹ nhàng, tự nhiên suốt ngày dài, không run tay đau đầu.",
      },
      {
        icon: "HeartPulse",
        title: "Bảo vệ bao tử êm ái",
        body: "Trà Dây trung hòa dịch vị, xóa tan tình trạng xót ruột, cồn cào hay viêm rát bao tử.",
      },
      {
        icon: "Shield",
        title: "Ổn định huyết áp",
        body: "Điều hòa khí huyết nhịp nhàng, kiểm soát nhịp tim ổn định, thanh lọc cơ thể trong lành.",
      },
      {
        icon: "Coffee",
        title: "Hương vị ngọt dịu",
        body: "Không đường hóa học, hậu vị ngọt sâm thanh nhã tạo cảm giác ngon miệng sảng khoái.",
      },
    ] satisfies BenefitItem[],
  },
  brewing: {
    badge: "HƯỚNG DẪN PHA CHẾ",
    heading: "3 Bước Ủ Trà Nhanh Chóng",
    steps: [
      {
        n: 1,
        title: "Thả túi lọc",
        body: "Đặt 1 túi lọc sinh học Boostra vào ly hoặc bình giữ nhiệt.",
      },
      {
        n: 2,
        title: "Châm nước",
        body: "Rót 150ml - 200ml nước ấm nóng (tầm 85°C - 90°C) ngập túi trà.",
      },
      {
        n: 3,
        title: "Ủ & Thưởng thức",
        body: "Đợi 3 - 5 phút để tinh chất sâm dây hòa quyện ngọt lành.",
      },
    ] satisfies BrewingStep[],
    timer: {
      badge: "Ủ THỬ TRÀ TRỰC QUAN",
      heading: "Trình Mô Phỏng Thời Gian Chờ Trà",
      defaultSeconds: 240,
      idleLabel: "Chưa bắt đầu ủ trà",
      runningLabel: "Đang ủ trà...",
      doneLabel: "Trà sẵn sàng! Mời thưởng thức",
      startLabel: "Bắt Đầu Ủ",
      pauseLabel: "Tạm Dừng",
      resetLabel: "Đặt Lại",
    },
  },
  activities: {
    badge: "TRÁCH NHIỆM DOANH NGHIỆP",
    heading: "Hoạt Động Doanh Nghiệp & Cộng Đồng",
    items: [
      {
        tag: { label: "SỐNG XANH", color: "green" },
        title: 'Chiến Dịch Sinh Thái "Hộp Giấy Tái Sinh"',
        body: "Sử dụng bao bì sợi ngô sinh học PLA tự hủy của HVL, kết hợp chương trình thu gom rỗng vỏ hộp đổi sen đá xanh.",
        footer: { label: "Trao tặng: 2000+ Cây xanh", icon: "Leaf" },
      },
      {
        tag: { label: "HỘI CHỢ F&B", color: "orange" },
        title: "Hội Chợ Thực Phẩm & Đồ Uống",
        body: "Boostra tích cực tham gia các hội chợ ẩm thực lớn nhằm quảng bá dòng sản phẩm chăm sóc dạ dày và mang trà dây hồng sâm gần hơn với mọi nhà.",
        footer: { label: "Quy mô: Toàn quốc", icon: "Utensils" },
      },
      {
        tag: { label: "TRUYỀN CẢM HỨNG", color: "blue" },
        title: "Workshop & Talkshow Sức Khỏe",
        body: "Tổ chức định kỳ talkshow cùng các chuyên gia dinh dưỡng chia sẻ về cách bảo vệ hệ tiêu hóa và nạp năng lượng bền bỉ cho người bận rộn.",
        footer: { label: "Hỗ trợ: Thế hệ trẻ", icon: "Users" },
      },
      {
        tag: { label: "NÔNG NGHIỆP", color: "gold" },
        title: "Hỗ Trợ Sinh Kế Nông Hộ Vùng Cao",
        body: "Hợp tác ổn định cùng bà con nông dân vùng Tây Bắc trong thu hoạch trà dây organic sạch, nâng cao thu nhập và cải thiện chất lượng đời sống vững bền.",
        footer: { label: "Liên kết: 300+ Nông hộ", icon: "Sprout" },
      },
    ] satisfies ActivityItem[],
  },
  footer: {
    tagline:
      "Thức uống thảo mộc thông minh kết hợp giữa Trà Dây Tây Bắc và Hồng Sâm, nâng cao sự tỉnh táo đồng thời bảo vệ hệ tiêu hóa dạ dày khỏe mạnh.",
    socials: [
      { icon: "Facebook", href: "#", label: "Facebook" },
      { icon: "Instagram", href: "#", label: "Instagram" },
      { icon: "Music2", href: "#", label: "TikTok" },
    ],
    columns: {
      explore: {
        heading: "KHÁM PHÁ",
        links: [
          { label: "Định vị & Câu chuyện", href: "#gioi-thieu" },
          { label: "Thành phần dược liệu", href: "#thanh-phan" },
          { label: "Đối tác sản xuất & Vùng trồng", href: "#doi-tac" },
          { label: "Lợi ích sức khỏe", href: "#loi-ich" },
          { label: "Sản phẩm & Khuyến mãi", href: "#cua-hang" },
          { label: "Hoạt động doanh nghiệp", href: "#hoat-dong" },
        ],
      },
      contact: {
        heading: "LIÊN HỆ",
        items: [
          {
            icon: "MessageCircle",
            text: "Kênh tư vấn & đặt hàng trực tuyến của Boostra Việt Nam luôn sẵn sàng hỗ trợ khách hàng 24/7.",
          },
          {
            icon: "Globe",
            text: "Hệ thống phân phối trực tuyến toàn quốc - Hỗ trợ vận chuyển hỏa tốc.",
          },
          { icon: "Phone", text: "Hotline hỗ trợ: 1900 68xx (24/7)" },
          { icon: "Mail", text: "Email: lienhe@boostra.vn" },
        ],
      },
    },
    copyright:
      "© 2026 Boostra - Bảo lưu mọi bản quyền thuộc Công Ty Cổ Phần Boostra Việt Nam.",
    disclaimer:
      "Khuyến dùng: Các thông tin hỗ trợ bảo vệ dạ dày và bồi bổ năng lượng được tổng hợp từ nguồn y học cổ truyền uy tín đối với thảo dược Trà Dây, Hồng Sâm, không nhằm mục đích thay thế tư vấn hay chỉ định y khoa chuyên sâu.",
  },
} as const;

export type Landing = typeof landing;
