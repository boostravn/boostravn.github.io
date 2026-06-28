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
  | "ShoppingBag"
  | "Activity"
  | "MapPin"
  | "ShoppingCart"
  | "Check"
  | "Sparkles";

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
  fit: string;
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

export interface IngredientItem {
  name: string;
  subtitle: string;
  description: string;
  bullets: string[];
  accent: "forest" | "rust";
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductVariant {
  qty: 1 | 2;
  qtyLabel: string;
  /** Spec line shown under the toggle (e.g. "100g · 20 túi lọc"). */
  spec: string;
  name: string;
  price: string;
  description: string;
  image: ProductImage;
  /** Shown when this variant is active (combo confirmation). */
  savings?: string;
  /** Shown when the OTHER variant is active (upsell from single to combo). */
  savingsHint?: string;
}

export interface ProductItem {
  id: string;
  badge: { label: string; tone: "gold" | "moss" };
  highlight?: boolean;
  variants: [ProductVariant, ProductVariant];
}

const FacebookLink: string = "https://www.facebook.com/Boostraherbaltea";
const CompanyName: string = "Công Ty Trà Thảo Mộc Boostra";
const CompanyAddress: string = "11 Nguyễn Văn Yến, P. Phú Thạnh, Hồ Chí Minh";
const CompanyEmail: string = "lienhe@boostra.vn";

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
      { label: "Lợi Ích", href: "#loi-ich" },
      { label: "Hướng Dẫn Pha Chế", href: "#cach-pha-che" },
      { label: "Cửa Hàng", href: "#cua-hang" },
    ],
    cta: { label: "Mua Ngay", href: "#cua-hang" },
  },
  hero: {
    badge: "GIẢI PHÁP TỈNH TÁO CHO GEN Z & GEN Y",
    title: { line1: "Tỉnh Thức Tự Nhiên", line2: "Bảo Vệ Dạ Dày" },
    bodyHtml:
      'Sự kết hợp hoàn hảo giữa <strong>Trà Dây Huế</strong> hỗ trợ làm lành niêm mạc, trung hòa axit dịch vị và <span class="text-(--color-rust) font-semibold">Hồng Sâm</span> bồi bổ năng lượng tự nhiên. Tỉnh táo bền bỉ suốt ngày dài học tập, làm việc — không bồn chồn, không tụt năng lượng, không hại dạ dày.',
    primaryCta: { label: "Mua Thử Ngay", href: "#cua-hang" },
    secondaryCta: { label: "Xem Câu Chuyện", href: "#gioi-thieu" },
    stats: [
      { value: "100%", label: "Nguyên Liệu Thảo Mộc Tự Nhiên" },
      { value: "0%", label: "Chất Bảo Quản" },
      { value: "0%", label: "Cafeine Tổng Hợp" },
    ],
    product: {
      // Set `image` to swap the placeholder logo for a real product shot.
      // Recommended: 1080×1440 PNG (3:4) with transparent background.
      image: { src: "/images/product.jpg", alt: "Trà Dây Hồng Sâm Boostra — Hộp 20 túi lọc và Hũ 200g" } as null | { src: string; alt: string },
      tagTop: "PREMIUM HERB BLEND",
      tagRight: "20 TÚI LỌC",
      title: "Trà Dây Hồng Sâm Thượng Hạng",
      footer: "Tỉnh thức tự nhiên • Êm dịu dạ dày",
      sticker: "Vị ngọt sâm thanh mát, cực ngon!",
      stickerEmoji: "💬",
    },
  },
  problems: {
    badge: "BẠN ĐANG GẶP VẤN ĐỀ GÌ?",
    // heading: "Caffeine giúp tỉnh táo, nhưng cũng để lại hệ lụy",
    items: [
      {
        id: "dau-da-day",
        icon: "Flame",
        iconBg: "#FBD9C9",
        iconColor: "#C2410C",
        label: "Đau Dạ Dày",
        fit: "Phù hợp với người thường xuyên đau dạ dày",
        solution: {
          title: "Đau dạ dày sau khi uống cà phê",
          body: "Trà Dây làm dịu niêm mạc, trung hòa axit dịch vị. Trà dây từ lâu được y học cổ truyền và hiện đại ghi nhận khả năng hỗ trợ làm lành vết loét, kháng viêm và ức chế vi khuẩn HP — nguyên nhân phổ biến của các vấn đề dạ dày ở người trẻ do thói quen sinh hoạt thất thường và lạm dụng caffeine.",
        },
      },
      {
        id: "bon-chon",
        icon: "HeartPulse",
        iconBg: "#FBE3DC",
        iconColor: "#C03C2A",
        label: "Bồn Chồn, Tim Đập Nhanh",
        fit: "Phù hợp khi cần tỉnh táo nhưng dễ lo âu",
        solution: {
          title: "Bồn chồn, tim đập nhanh",
          body: "Hồng Sâm cấp năng lượng êm, không gây kích thích quá mức. Khác với caffeine liều cao gây tim đập nhanh và lo âu, hồng sâm cung cấp năng lượng ổn định theo cơ chế tự nhiên, giúp duy trì sự tập trung mà không gây cảm giác hồi hộp hay khó chịu sau khi hết tác dụng.",
        },
      },
      {
        id: "tut-nang-luong",
        icon: "BatteryLow",
        iconBg: "#FFF1C2",
        iconColor: "#A57F18",
        label: "Tụt Năng Lượng",
        fit: "Phù hợp cho ca làm việc dài, ôn thi xuyên đêm",
        solution: {
          title: "Tỉnh táo rồi tụt năng lượng đột ngột",
          body: 'Năng lượng ổn định, không có hiện tượng "sập nguồn". Sự kết hợp trà dây và hồng sâm được thiết kế để duy trì sự tỉnh táo xuyên suốt thời gian học tập, làm việc hoặc ôn thi xuyên đêm, hạn chế tình trạng tụt năng lượng đột ngột thường gặp ở nước tăng lực và cà phê đậm đặc.',
        },
      },
      {
        id: "tra-kho-uong",
        icon: "Coffee",
        iconBg: "#D6E4D1",
        iconColor: "#2D4A2B",
        label: "Trà Thảo Mộc Khó Uống",
        fit: "Dễ uống, phù hợp dùng mỗi ngày",
        solution: {
          title: "Đã thử trà thảo mộc nhưng khó uống",
          body: "Vị ngọt thanh tự nhiên từ hồng sâm, dễ uống hằng ngày. Boostra cân bằng giữa vị đắng nhẹ đặc trưng của trà dây và vị ngọt thanh của hồng sâm, mang lại trải nghiệm dễ uống, không nặng vị thuốc — khác với nhiều loại trà thảo mộc truyền thống khó dùng thường xuyên.",
        },
      },
    ] satisfies ProblemItem[],
    defaultPrompt: {
      emoji: "👆",
      title: "Bấm chọn một vấn đề ở trên để xem giải pháp",
      body: "Tìm hiểu ngay cách hoạt chất thiên nhiên của Trà Dây & Hồng Sâm từ Boostra.",
    },
  },
  brand: {
    leftBadge: "ĐỊNH VỊ THƯƠNG HIỆU",
    leftHeading: "BOOST + TRÀ = BOOSTRA",
    // leftTagline: "Lựa chọn thay thế lành mạnh cho thức uống chứa caffeine",
    leftBody:
      "Boostra hướng đến học sinh, sinh viên và nhân viên văn phòng thuộc thế hệ Gen Z và Gen Y — những người cần duy trì sự tỉnh táo mỗi ngày nhưng quan tâm đến sức khỏe hệ tiêu hóa lâu dài.",
    leftQuote:
      '"Lấy khách hàng làm trung tâm, lấy giá trị làm nền tảng." — Triết lý kinh doanh của Boostra',
    rightBadge: "THẤU HIỂU NGƯỜI TRẺ BẬN RỘN",
    rightHeading: "Năng Lượng Sạch Cho Nhịp Sống Hiện Đại",
    rightBody:
      "Áp lực học tập và công việc khiến nhiều người trẻ phụ thuộc vào cà phê hoặc nước tăng lực để duy trì sự tỉnh táo, kéo theo các tác dụng phụ như đau dạ dày, tim đập nhanh, bồn chồn hoặc mệt mỏi sau khi hết tác dụng. Trong khi đó, các loại trà thảo mộc hiện có thường chỉ thiên về thư giãn, an thần — chưa đáp ứng nhu cầu tập trung và năng lượng.",
    // callout: {
    //   emoji: "🍵",
    //   lead: "Tiện lợi tối đa:",
    //   body: "Đóng hộp 20 túi lọc riêng biệt, dễ mang theo khi đi học, đi làm. Mỗi túi 5g, pha nhanh trong vài phút, không cần dụng cụ phức tạp.",
    // },
  },
  ingredients: {
    badge: "THÀNH PHẦN DƯỢC LIỆU",
    heading: "Hai dược liệu, một giải pháp cân bằng",
    items: [
      {
        name: "Trà Dây",
        subtitle: "Nguồn cung: Hội Dòng Mến Thánh Giá Huế — kiểm soát chất lượng",
        description:
          "Dược liệu có nguồn gốc từ vùng núi miền Trung Việt Nam, được biết đến với khả năng hỗ trợ hệ tiêu hóa và làm dịu dạ dày.",
        bullets: [
          "Hỗ trợ làm lành niêm mạc dạ dày",
          "Trung hòa axit dịch vị, giảm cảm giác xót ruột",
          "Hỗ trợ ức chế vi khuẩn HP theo ghi nhận y học",
          "Thanh nhiệt cơ thể tự nhiên",
        ],
        accent: "forest",
      },
      {
        name: "Hồng Sâm",
        subtitle: "Dược liệu quý — bồi bổ năng lượng tự nhiên",
        description:
          "Thành phần giúp cung cấp nguồn năng lượng ổn định, hỗ trợ trí não duy trì sự tập trung trong thời gian dài mà không gây phản ứng phụ thường gặp của caffeine.",
        bullets: [
          "Tăng cường năng lượng và sự tỉnh táo",
          "Cải thiện khả năng tập trung khi học tập, làm việc",
          "Không gây tim đập nhanh hay bồn chồn",
          "Vị ngọt thanh tự nhiên, dễ uống",
        ],
        accent: "rust",
      },
    ] satisfies IngredientItem[],
  },
  benefits: {
    badge: "HIỆU QUẢ SỬ DỤNG",
    heading: "Lợi ích nổi bật của Trà Dây Hồng Sâm Boostra",
    items: [
      {
        icon: "Brain",
        title: "Tập trung bền bỉ",
        body: "Hồng sâm hỗ trợ trí não duy trì sự tỉnh táo nhẹ nhàng và tự nhiên suốt buổi học, ca làm việc.",
      },
      {
        icon: "HeartPulse",
        title: "Bảo vệ dạ dày êm ái",
        body: "Trà dây giúp trung hòa dịch vị, làm dịu cảm giác xót ruột, cồn cào do dùng caffeine kéo dài.",
      },
      {
        icon: "Activity",
        title: "Không bồn chồn, lo âu",
        body: "Năng lượng ổn định từ hồng sâm, không gây tim đập nhanh hay cảm giác hồi hộp như caffeine liều cao.",
      },
      {
        icon: "Coffee",
        title: "Hương vị dễ uống",
        body: "Không đường tinh luyện, vị đắng nhẹ của trà dây hài hòa với vị ngọt tự nhiên của hồng sâm.",
      },
    ] satisfies BenefitItem[],
  },
  brewing: {
    badge: "HƯỚNG DẪN SỬ DỤNG",
    heading: "Pha Nhanh Tíc Tắc",
    steps: [
      {
        n: 1,
        title: "",
        body: "Đưa 1 túi lọc trà qua nước sôi trong vòng 10s",
      },
      {
        n: 2,
        title: "",
        body: "Thả túi vào ly/bình nước của bạn",
      },
      {
        n: 3,
        title: "",
        body: "Tự do pha chế tỉ lệ nước sôi và nước lạnh phù hợp",
      },
      {
        n: 4,
        title: "",
        body: "Mời bạn dùng trà thật ngon miệng!",
      },
    ] satisfies BrewingStep[],
    timer: {
      badge: "TRẦN TRÀ TRỰC QUAN",
      heading: "Trình Mô Phỏng Thời Gian Trần Trà",
      defaultSeconds: 10,
      idleLabel: "Chưa bắt đầu trần trà",
      runningLabel: "Đang trần trà...",
      doneLabel: "Trà sẵn sàng! Mời thưởng thức",
      startLabel: "Bắt Đầu",
      pauseLabel: "Tạm Dừng",
      resetLabel: "Đặt Lại",
      celebrate: {
        title: "Trà đã sẵn sàng!",
        body: "Bạn đã chờ đủ — hãy thưởng cho mình bằng ưu đãi nhỏ này.",
        promoLabel: "Mã giảm 10% cho đơn đầu tiên",
        promoCode: "TINHTHUC10",
        copyLabel: "Sao chép mã",
        copiedLabel: "Đã sao chép ✓",
        ctaLabel: "Dùng ngay",
        ctaHref: "#cua-hang",
      },
    },
  },
  products: {
    badge: "SẢN PHẨM & KHUYẾN MÃI",
    heading: "Chọn quy cách phù hợp với bạn",
    items: [
      {
        id: "hop",
        badge: { label: "Bán chạy nhất", tone: "gold" },
        highlight: true,
        variants: [
          {
            qty: 1,
            qtyLabel: "1 hộp",
            spec: "20 túi lọc",
            name: "Hộp Trà Dây Hồng Sâm",
            price: "49.000đ",
            description:
              "Mỗi túi 5g, đóng riêng biệt, tiện mang theo đi học, đi làm. Phù hợp cho người mới bắt đầu trải nghiệm hoặc dùng cá nhân hằng ngày.",
            image: {
              src: "/images/product_1_box.png",
              alt: "Hộp Trà Dây Hồng Sâm Boostra 20 túi lọc",
            },
          },
          {
            qty: 2,
            qtyLabel: "Combo 2 hộp",
            spec: "40 túi lọc",
            name: "Combo 2 Hộp Trà Dây Hồng Sâm",
            price: "90.000đ",
            description:
              "Mua đôi tiết kiệm hơn. Đủ dùng cả tháng cho dân văn phòng hoặc chia sẻ với đồng nghiệp, người thân.",
            image: {
              src: "/images/product_2_boxes.png",
              alt: "Combo 2 hộp Trà Dây Hồng Sâm Boostra",
            },
            savings: "Đang tiết kiệm 8.000đ so với mua lẻ",
            savingsHint: "Mua combo 2 hộp tiết kiệm 8.000đ",
          },
        ],
      },
      {
        id: "tui",
        badge: { label: "Dùng lâu dài", tone: "moss" },
        variants: [
          {
            qty: 1,
            qtyLabel: "1 túi",
            spec: "200g",
            name: "Túi Trà Dây Hồng Sâm",
            price: "109.000đ",
            description:
              "Túi giấy kraft khóa kéo 200g, giữ trọn hương trà dây và hồng sâm. Tối ưu chi phí mỗi lần pha, phù hợp người dùng lâu dài.",
            image: {
              src: "/images/product_1_pack.png",
              alt: "Túi Trà Dây Hồng Sâm Boostra 200g",
            },
          },
          {
            qty: 2,
            qtyLabel: "Combo 2 túi",
            spec: "400g",
            name: "Combo 2 Túi Trà Dây Hồng Sâm",
            price: "210.000đ",
            description:
              "Dùng được khoảng 2 tháng cho gia đình hoặc làm quà tặng người thân. Mua đôi tiết kiệm hơn.",
            image: {
              src: "/images/product_2_packs.png",
              alt: "Combo 2 túi Trà Dây Hồng Sâm Boostra",
            },
            savings: "Đang tiết kiệm 8.000đ so với mua lẻ",
            savingsHint: "Mua combo 2 túi tiết kiệm 8.000đ",
          },
        ],
      },
    ] satisfies ProductItem[],
    cta: { label: "Liên hệ ngay qua Facebook", href: FacebookLink },
    // ctaSecondary: { label: "Đặt hàng qua TikTok Shop", href: "#" },
  },
  finalCta: {
    eyebrow: "BẮT ĐẦU NHỊP SỐNG MỚI",
    // heading: "Sẵn sàng đổi cà phê lấy Boostra?",
    heading: "Thưởng thức ngay một tách trà dây hồng sâm",
    bodyFirstLine: "Một ngụm tỉnh thức tự nhiên — dạ dày êm ái, đầu óc minh mẫn, ngày dài bền bỉ",
    bodyNextLine: "Đặt thử hôm nay để cảm nhận khác biệt.",
    primary: { label: "Đặt hàng ngay", href: "#cua-hang" },
    secondary: { label: "Nhắn qua Facebook", href: FacebookLink },
  },
  footer: {
    badge: "CỘNG ĐỒNG BOOSTRA",
    tagline:
      "Thức uống thảo mộc kết hợp giữa Trà Dây Huế và Hồng Sâm — năng lượng sạch, dạ dày êm, dành cho người trẻ bận rộn.",
    socials: [
      { icon: "Facebook", href: FacebookLink, label: "Facebook" },
      // { icon: "Instagram", href: "#", label: "Instagram" },
      // { icon: "Music2", href: "#", label: "TikTok" },
    ],
    columns: {
      explore: {
        heading: "KHÁM PHÁ",
        links: [
          { label: "Định vị & Câu chuyện", href: "#gioi-thieu" },
          { label: "Thành phần dược liệu", href: "#thanh-phan" },
          { label: "Lợi ích sức khỏe", href: "#loi-ich" },
          { label: "Cách pha chế", href: "#cach-pha-che" },
          { label: "Sản phẩm & Khuyến mãi", href: "#cua-hang" },
        ],
      },
      contact: {
        heading: "LIÊN HỆ",
        items: [
          { icon: "ShoppingBag", text: CompanyName },
          { icon: "MapPin", text: CompanyAddress },
          { icon: "Mail", text: `<a href="mailto:${CompanyEmail}">${CompanyEmail}</a>` },
          { icon: "ShoppingCart", text: `<a href="${FacebookLink}">Đặt hàng qua Facebook</a>` },
        ],
      },
    },
    copyright: `© 2026 Boostra. Mọi bản quyền thuộc ${CompanyName}.`,
    disclaimer:
      "Các thông tin về công dụng của Trà Dây và Hồng Sâm được tổng hợp tham khảo, không nhằm mục đích thay thế tư vấn hoặc chỉ định y khoa chuyên sâu. Vui lòng tham khảo ý kiến chuyên gia y tế nếu bạn có vấn đề sức khỏe đặc biệt.",
  },
} as const;

export type Landing = typeof landing;
