export type Product = {
  id: string;
  category: string;
  name: string;
  size: string;
  price: string;
  image: string;
  description: string;
};

export const products: Product[] = [
  {
    id: "oily-skin-bha",
    category: "Sérum",
    name: "Oily skin Ácido salicílico BHA 7%",
    size: "30ml",
    price: "S/ 33.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuChA_dO0pbFZDlUTs315RnqYC-W7v-LtvPmsGiGei_4Xs9ZMiwn70buO1M1jfYghCRaD98j8DaJVS1JcqMPZ0SbzuIkjwXeO6AYSxDkHLScipUCUCZ8MDrKsYsMSKlyPrl9DtdsYXY_7xIItkFkO11Fxc3krCh-c8KsVqioavicqOOv629hV6E_dX5X7Fnba0CK9tC9zSKy1av8SqESrZBmr5Lb9azBEcRVSMtgVkSob24cd7_znAxy36XfNnEtYtUHKriw8Fsvwg",
    description:
      "Tratamiento ligero para piel grasa con acabado fresco y rutina nocturna.",
  },
  {
    id: "jabon-nacar",
    category: "Jabones naturales",
    name: "Jabón de concha de nácar",
    size: "95g",
    price: "S/ 8.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAbDp8-o9Ow0nVh-Flo5n9-hkDp3rhqFxK3lC3vIHQEoqFUPBoKr4Qajas188IXxofGVADYl9bVdaj33I1R9zZh4h3KLBld7vDl_ah1anYEtltequRySoP4dgvJ7oMP89Lc6TlCnMUEbH5tTd1D247tNJhrZs8okMwm8-k7aH3iQL5kt626znv78VdAZcDaORvuWsvPy_F87YoZEjLa4wY4ABtS6KOdJqnbMFyBODeQ3Aa4nE_gAIGx25Qb-Z4ULXkr4H0JHJvNyg",
    description: "Barra artesanal para una limpieza suave y luminosa.",
  },
  {
    id: "aceite-ylang",
    category: "Aceites naturales",
    name: "Aceite de Ylang ylang",
    size: "15ml",
    price: "S/25.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDBRmDwsdRjvlA9AsF8DQ-8WBeDvjcXZn9ONc4khWkaMAG8v9jLd43te4vLJRzbcALwyfbEJ84ueiyMfO0d2s7NzoYxXLVRo57PFreUhJaRvXZZ-vVJ9xgh9hHvi2YjVrwK98sT0wwmwIKNTz8L1DhIszCSJf6AvSDjShdqAaz8aw1iObWqVMcjT7FZmZ6EatUikBlzykXrsR4O3uvt6slJGqEGi0W0B7-R-EbXLPv6oiKDiyMPPpThp9_vZJUdhkNkxPFHK5mc_Q",
    description: "Aceite aromático para rituales de cuidado y calma.",
  },
  {
    id: "mascarilla-nacar",
    category: "Skincare",
    name: "Mascarilla con concha de nácar, arroz y vitamina C",
    size: "20g",
    price: "S/ 15.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDmmyDikNpxYshBj0xtalw-zVcXWAcn5OFs8WaBmtuMkvxrgFg2XYOorsg0BiqqwE1wKN0St4F61w9KT6ez57UhE_zgm_nqt_WLzyfvDVDpShmNSBZF5hd451XAyxjK3gVZT9E__EYVXomSqrezKDRYpkwXR33343cS-0ruE4G0luL06LVt2y279twb7I3gnfQjjZn_HzgO_ed4VVmTZwJBINKqIuscDhoGxcAKM2bkTS98Pv44MIJxUt_g_6k1T37SO8EBsMkGBw",
    description: "Mascarilla iluminadora con textura fina y acabado suave.",
  },
  {
    id: "anti-age-hialuronico",
    category: "Sérum",
    name: "Anti age Ácido hialurónico l. 5%",
    size: "30ml",
    price: "S/ 38.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB0w06EQsJWCnb-VkDDjK5UkZoUvLRd1m5CI_m390a4Xlv028qZ1afTgmSsqsK0_-DOyjW7VMqA4md4MxlpeT7MWZBprasg6ybV8s-hYhbORRq6_gSHtmGXBIeaYufhKum6NTSTOC1w_dQeQTcRMhThHUB04NNfwJhsiuNfSk4sgZXyC9GIpKE017BrhBZb6sE3tnsKzfGv14-EBW_DBdLXyu0_NK_QV4GSqaJK1pB_bCMRHlz7KDr92kF6OeFkoN8CYo5TWgmm-A",
    description: "Sérum hidratante para una rutina de noche más flexible.",
  },
  {
    id: "jabon-curcuma",
    category: "Jabones naturales",
    name: "Jabón de Cúrcuma",
    size: "95g",
    price: "S/ 8.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDaEQfOuqg_IFd4BEoAg7wgLZRIkLLLFgsR6qzQssxhEGN5dAPBwyhoFvzlRZIQEScZbZa0pX7llVcJ5LmPmg15u_FW4LadlYLvcqA5wwYhTIHgVsqVeTljfUDKJKeIaSRV8hSPSuh013nXQLZRWCTgY2a7-2XD-tJRHcdmVk8ZiGEUB1Bnrd5me2kN8cOq_ID12I3DB7lw7JqH4SkGdK-USoSA1xiBjeOy3mA_bfUbuOK9xhHzlQKDr7vWdJW-FRdR66Yk1eLkLQ",
    description: "Jabón botánico con carácter cálido y artesanal.",
  },
  {
    id: "mascarilla-avena",
    category: "Skincare",
    name: "Mascarilla con avena, leche, aceite de almendras dulce",
    size: "20g",
    price: "S/ 15.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCuf5BKwhXog_i3YF6VADFJyO6gyfN-cVptoQuWfp0chc6uFnE9SaiqN2BGUTRpWFQ_UvQ_3E2jWwp6toCt9ouiEPpAUCFWsSJ5vhg8cTI8_E0B7fTAjLrDXFt-20D8K4U_Wsp9IxUJHk1BQKcr9sSn4eTalFzvR72hcbjvc_UmzI__l_eVG57vGy5yIdkrm1HWRVBkSgtPgOlLoGa7fUYLvbs48iO8h9dmWRrdCDH9NiKxROhH0uNsAxhwOs2yUEo1vd0ehZpkUQ",
    description: "Fórmula cremosa para una sensación de piel descansada.",
  },
  {
    id: "aceite-jojoba",
    category: "Aceites naturales",
    name: "Aceite de Jojoba",
    size: "30ml",
    price: "S/ 30.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCupJPLinEW5V54dZUFOrABGtYpiukGO-9xJhdVnSqrjX_NOkNpock_KXy0pNbZqYodoAoBjQcyOb2Cz-HchfQm6w5w4ab1dI8a7H8l4FJ1Z2cTzhy8PFkJ2AKpy5oYotQ2fa8eJPsgRhvm6rU63mlioDEfeUcIX3vSNqAcgU7y7akJiDcWO8Sm1QxjrONvU0rZW3Oz0Vt4tCbag5R8fdmejKBiGUyty7ErnuO8trDFUz3ZJC6i3RAcQ4eXX56HCKMDNlBDXDcTHQ",
    description: "Aceite versátil para rostro, puntas y masaje facial.",
  },
  {
    id: "niacinamida",
    category: "Sérum",
    name: "Niacinamida o vitamina B3 8%",
    size: "30ml",
    price: "S/ 35.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAzkcFHPldG9QnfLmvg2-FEo9DP69qrpM4wnvxD2tt9rOPgV8THiRGPXpsM8qyX1FnT68Z08dZgzpADIq5-ce0eIm8q1MnU7YOhp6a7m21kldg9zvhu85KmUxo87YExwMa03DgHYS2spkzxRxIf5Lq83HZNxb5PThjniXVOiw5VsT-OceQ86uw2n7E9gMpSQ1mBBavMcxMrLbFOT2C9es1bswIQRLSvbSsHLc1ym__jNX4-Rz-kB6oC2t2p5LH1XfXL4KhOzWVAZA",
    description: "Activo funcional para textura visible y rutina constante.",
  },
];

export const checkoutProducts = products.slice(0, 4);
