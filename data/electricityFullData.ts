import { electricityMockData } from "./electricityMockData";
// This file contains the full, detailed monthly data for electricity meters,
// which is used to power the interactive analysis and overview tabs.

export interface MonthlyReading {
  month: string; // e.g., 'Apr-24'
  consumption: number; // kWh
}

export interface ElectricityMeterRaw {
  id: number;
  name: string;
  type: string;
  account: string;
  readings: MonthlyReading[];
}

export const monthsOrder: string[] = [
    'Apr-24', 'May-24', 'Jun-24', 'Jul-24', 'Aug-24', 'Sep-24', 'Oct-24', 
    'Nov-24', 'Dec-24', 'Jan-25', 'Feb-25', 'Mar-25', 'Apr-25', 'May-25', 
    'Jun-25', 'Jul-25', 'Aug-25', 'Sep-25', 'Oct-25', 'Nov-25', 'Dec-25'
];

export const electricityFullData: ElectricityMeterRaw[] = [
  {
    id: 1, name: 'Beachwell', type: 'Beach well', account: 'R51903', readings: [
      { month: 'Apr-24', consumption: 16908 }, { month: 'May-24', consumption: 46 }, { month: 'Jun-24', consumption: 19332 },
      { month: 'Jul-24', consumption: 23170 }, { month: 'Aug-24', consumption: 42241 }, { month: 'Sep-24', consumption: 15223 },
      { month: 'Oct-24', consumption: 25370 }, { month: 'Nov-24', consumption: 24383 }, { month: 'Dec-24', consumption: 37236 },
      { month: 'Jan-25', consumption: 38168 }, { month: 'Feb-25', consumption: 18422 }, { month: 'Mar-25', consumption: 40 },
      { month: 'Apr-25', consumption: 27749 }, { month: 'May-25', consumption: 23674 }, { month: 'Jun-25', consumption: 46800 },
      { month: 'Jul-25', consumption: 33727 }, { month: 'Aug-25', consumption: 29775 }, { month: 'Sep-25', consumption: 32040 }
    ]
  },
  {
    id: 2, name: 'Central Park', type: 'Common Building', account: 'R54672', readings: [
      { month: 'Apr-24', consumption: 12208 }, { month: 'May-24', consumption: 21845 }, { month: 'Jun-24', consumption: 29438 },
      { month: 'Jul-24', consumption: 28186 }, { month: 'Aug-24', consumption: 21995 }, { month: 'Sep-24', consumption: 20202 },
      { month: 'Oct-24', consumption: 14900 }, { month: 'Nov-24', consumption: 9604 }, { month: 'Dec-24', consumption: 19032 },
      { month: 'Jan-25', consumption: 22819 }, { month: 'Feb-25', consumption: 19974 }, { month: 'Mar-25', consumption: 14190 },
      { month: 'Apr-25', consumption: 13846 }, { month: 'May-25', consumption: 18783 }, { month: 'Jun-25', consumption: 32135 },
      { month: 'Jul-25', consumption: 24330 }, { month: 'Aug-25', consumption: 20201 }, { month: 'Sep-25', consumption: 19814 }
    ]
  },
  {
    id: 3, name: 'ROP Building', type: 'Common Building', account: 'R53648', readings: [
      { month: 'Apr-24', consumption: 2047 }, { month: 'May-24', consumption: 4442 }, { month: 'Jun-24', consumption: 3057 },
      { month: 'Jul-24', consumption: 4321 }, { month: 'Aug-24', consumption: 4185 }, { month: 'Sep-24', consumption: 3554 },
      { month: 'Oct-24', consumption: 3692 }, { month: 'Nov-24', consumption: 3581 }, { month: 'Dec-24', consumption: 2352 },
      { month: 'Jan-25', consumption: 2090 }, { month: 'Feb-25', consumption: 2246 }, { month: 'Mar-25', consumption: 1939 },
      { month: 'Apr-25', consumption: 3537 }, { month: 'May-25', consumption: 4503 }, { month: 'Jun-25', consumption: 4868 },
      { month: 'Jul-25', consumption: 3099 }, { month: 'Aug-25', consumption: 3724 }, { month: 'Sep-25', consumption: 2701 }
    ]
  },
  {
    id: 4, name: 'Security Building', type: 'Common Building', account: 'R53649', readings: [
      { month: 'Apr-24', consumption: 3529 }, { month: 'May-24', consumption: 3898 }, { month: 'Jun-24', consumption: 4255 },
      { month: 'Jul-24', consumption: 4359 }, { month: 'Aug-24', consumption: 3728 }, { month: 'Sep-24', consumption: 3676 },
      { month: 'Oct-24', consumption: 3140 }, { month: 'Nov-24', consumption: 5702 }, { month: 'Dec-24', consumption: 5131 },
      { month: 'Jan-25', consumption: 5559 }, { month: 'Feb-25', consumption: 5417 }, { month: 'Mar-25', consumption: 4504 },
      { month: 'Apr-25', consumption: 5978 }, { month: 'May-25', consumption: 4964 }, { month: 'Jun-25', consumption: 8519 },
      { month: 'Jul-25', consumption: 6940 }, { month: 'Aug-25', consumption: 7909 }, { month: 'Sep-25', consumption: 4345 }
    ]
  },
  {
    id: 5, name: 'Village Square', type: 'Common Building', account: 'R56628', readings: [
      { month: 'Apr-24', consumption: 2550 }, { month: 'May-24', consumption: 2550 }, { month: 'Jun-24', consumption: 2550 },
      { month: 'Jul-24', consumption: 2550 }, { month: 'Aug-24', consumption: 8117 }, { month: 'Sep-24', consumption: 9087 },
      { month: 'Oct-24', consumption: 4038 }, { month: 'Nov-24', consumption: 6229 }, { month: 'Dec-24', consumption: 3695 },
      { month: 'Jan-25', consumption: 3304 }, { month: 'Feb-25', consumption: 3335 }, { month: 'Mar-25', consumption: 3383 },
      { month: 'Apr-25', consumption: 4415 }, { month: 'May-25', consumption: 5963 }, { month: 'Jun-25', consumption: 9112 },
      { month: 'Jul-25', consumption: 6904 }, { month: 'Aug-25', consumption: 6890 }, { month: 'Sep-25', consumption: 5908 }
    ]
  },
  {
    id: 6, name: 'D Building 44', type: 'D_Building', account: 'R53705', readings: [
      { month: 'Apr-24', consumption: 463 }, { month: 'May-24', consumption: 2416 }, { month: 'Jun-24', consumption: 2036 },
      { month: 'Jul-24', consumption: 2120 }, { month: 'Aug-24', consumption: 1645 }, { month: 'Sep-24', consumption: 1717 },
      { month: 'Oct-24', consumption: 1643 }, { month: 'Nov-24', consumption: 1377 }, { month: 'Dec-24', consumption: 764 },
      { month: 'Jan-25', consumption: 647 }, { month: 'Feb-25', consumption: 657 }, { month: 'Mar-25', consumption: 650 },
      { month: 'Apr-25', consumption: 1306 }, { month: 'May-25', consumption: 2499 }, { month: 'Jun-25', consumption: 3598 },
      { month: 'Jul-25', consumption: 1768 }, { month: 'Aug-25', consumption: 2087 }, { month: 'Sep-25', consumption: 1247 }
    ]
  },
  {
    id: 7, name: 'D Building 45', type: 'D_Building', account: 'R53665', readings: [
      { month: 'Apr-24', consumption: 709 }, { month: 'May-24', consumption: 2944 }, { month: 'Jun-24', consumption: 1267 },
      { month: 'Jul-24', consumption: 262 }, { month: 'Aug-24', consumption: 3212 }, { month: 'Sep-24', consumption: 1330 },
      { month: 'Oct-24', consumption: 1570 }, { month: 'Nov-24', consumption: 1252 }, { month: 'Dec-24', consumption: 841 },
      { month: 'Jan-25', consumption: 670 }, { month: 'Feb-25', consumption: 556 }, { month: 'Mar-25', consumption: 608 },
      { month: 'Apr-25', consumption: 1069 }, { month: 'May-25', consumption: 1974 }, { month: 'Jun-25', consumption: 2840 },
      { month: 'Jul-25', consumption: 957 }, { month: 'Aug-25', consumption: 544 }, { month: 'Sep-25', consumption: 1825 }
    ]
  },
  {
    id: 8, name: 'D Building 46', type: 'D_Building', account: 'R53700', readings: [
      { month: 'Apr-24', consumption: 818 }, { month: 'May-24', consumption: 2392 }, { month: 'Jun-24', consumption: 1620 },
      { month: 'Jul-24', consumption: 2216 }, { month: 'Aug-24', consumption: 1671 }, { month: 'Sep-24', consumption: 1718 },
      { month: 'Oct-24', consumption: 1734 }, { month: 'Nov-24', consumption: 1577 }, { month: 'Dec-24', consumption: 890 },
      { month: 'Jan-25', consumption: 724 }, { month: 'Feb-25', consumption: 690 }, { month: 'Mar-25', consumption: 752 },
      { month: 'Apr-25', consumption: 1292 }, { month: 'May-25', consumption: 1969 }, { month: 'Jun-25', consumption: 2517 },
      { month: 'Jul-25', consumption: 1739 }, { month: 'Aug-25', consumption: 2273 }, { month: 'Sep-25', consumption: 1872 }
    ]
  },
  {
    id: 9, name: 'D Building 47', type: 'D_Building', account: 'R53690', readings: [
      { month: 'Apr-24', consumption: 918 }, { month: 'May-24', consumption: 2678 }, { month: 'Jun-24', consumption: 1446 },
      { month: 'Jul-24', consumption: 2173 }, { month: 'Aug-24', consumption: 2068 }, { month: 'Sep-24', consumption: 2073 },
      { month: 'Oct-24', consumption: 1651 }, { month: 'Nov-24', consumption: 1774 }, { month: 'Dec-24', consumption: 1055 },
      { month: 'Jan-25', consumption: 887 }, { month: 'Feb-25', consumption: 738 }, { month: 'Mar-25', consumption: 792 },
      { month: 'Apr-25', consumption: 1545 }, { month: 'May-25', consumption: 1395 }, { month: 'Jun-25', consumption: 2864 },
      { month: 'Jul-25', consumption: 1814 }, { month: 'Aug-25', consumption: 2491 }, { month: 'Sep-25', consumption: 2633 }
    ]
  },
  {
    id: 10, name: 'D Building 48', type: 'D_Building', account: 'R53666', readings: [
      { month: 'Apr-24', consumption: 725 }, { month: 'May-24', consumption: 1970 }, { month: 'Jun-24', consumption: 1415 },
      { month: 'Jul-24', consumption: 1895 }, { month: 'Aug-24', consumption: 1853 }, { month: 'Sep-24', consumption: 1084 },
      { month: 'Oct-24', consumption: 1127 }, { month: 'Nov-24', consumption: 1046 }, { month: 'Dec-24', consumption: 785 },
      { month: 'Jan-25', consumption: 826 }, { month: 'Feb-25', consumption: 676 }, { month: 'Mar-25', consumption: 683 },
      { month: 'Apr-25', consumption: 1092 }, { month: 'May-25', consumption: 1851 }, { month: 'Jun-25', consumption: 1927 },
      { month: 'Jul-25', consumption: 1175 }, { month: 'Aug-25', consumption: 1974 }, { month: 'Sep-25', consumption: 1772 }
    ]
  },
  {
    id: 11, name: 'D Building 49', type: 'D_Building', account: 'R53715', readings: [
      { month: 'Apr-24', consumption: 947 }, { month: 'May-24', consumption: 2912 }, { month: 'Jun-24', consumption: 780 },
      { month: 'Jul-24', consumption: 1911 }, { month: 'Aug-24', consumption: 1714 }, { month: 'Sep-24', consumption: 1839 },
      { month: 'Oct-24', consumption: 1785 }, { month: 'Nov-24', consumption: 1608 }, { month: 'Dec-24', consumption: 1068 },
      { month: 'Jan-25', consumption: 860 }, { month: 'Feb-25', consumption: 837 }, { month: 'Mar-25', consumption: 818 },
      { month: 'Apr-25', consumption: 984 }, { month: 'May-25', consumption: 1346 }, { month: 'Jun-25', consumption: 2986 },
      { month: 'Jul-25', consumption: 1092 }, { month: 'Aug-25', consumption: 1105 }, { month: 'Sep-25', consumption: 1848 }
    ]
  },
  {
    id: 12, name: 'D Building 50', type: 'D_Building', account: 'R53672', readings: [
      { month: 'Apr-24', consumption: 577 }, { month: 'May-24', consumption: 1253 }, { month: 'Jun-24', consumption: 849 },
      { month: 'Jul-24', consumption: 1097 }, { month: 'Aug-24', consumption: 1059 }, { month: 'Sep-24', consumption: 1091 },
      { month: 'Oct-24', consumption: 1107 }, { month: 'Nov-24', consumption: 1102 }, { month: 'Dec-24', consumption: 789 },
      { month: 'Jan-25', consumption: 765 }, { month: 'Feb-25', consumption: 785 }, { month: 'Mar-25', consumption: 707 },
      { month: 'Apr-25', consumption: 1331 }, { month: 'May-25', consumption: 2376 }, { month: 'Jun-25', consumption: 3556 },
      { month: 'Jul-25', consumption: 1893 }, { month: 'Aug-25', consumption: 2207 }, { month: 'Sep-25', consumption: 1716.9 }
    ]
  },
  {
    id: 13, name: 'D Building 51', type: 'D_Building', account: 'R53657', readings: [
      { month: 'Apr-24', consumption: 735 }, { month: 'May-24', consumption: 3030 }, { month: 'Jun-24', consumption: 1677 },
      { month: 'Jul-24', consumption: 2046 }, { month: 'Aug-24', consumption: 2472 }, { month: 'Sep-24', consumption: 2285 },
      { month: 'Oct-24', consumption: 2165 }, { month: 'Nov-24', consumption: 1855 }, { month: 'Dec-24', consumption: 710 },
      { month: 'Jan-25', consumption: 661 }, { month: 'Feb-25', consumption: 682 }, { month: 'Mar-25', consumption: 642 },
      { month: 'Apr-25', consumption: 904 }, { month: 'May-25', consumption: 2170 }, { month: 'Jun-25', consumption: 2235 },
      { month: 'Jul-25', consumption: 1825 }, { month: 'Aug-25', consumption: 2406 }, { month: 'Sep-25', consumption: 2149 }
    ]
  },
  {
    id: 14, name: 'D Building 52', type: 'D_Building', account: 'R53699', readings: [
      { month: 'Apr-24', consumption: 727 }, { month: 'May-24', consumption: 2882 }, { month: 'Jun-24', consumption: 2087 },
      { month: 'Jul-24', consumption: 2897 }, { month: 'Aug-24', consumption: 2786 }, { month: 'Sep-24', consumption: 2990 },
      { month: 'Oct-24', consumption: 2501 }, { month: 'Nov-24', consumption: 1986 }, { month: 'Dec-24', consumption: 1208 },
      { month: 'Jan-25', consumption: 979 }, { month: 'Feb-25', consumption: 896 }, { month: 'Mar-25', consumption: 952 },
      { month: 'Apr-25', consumption: 1651 }, { month: 'May-25', consumption: 2676 }, { month: 'Jun-25', consumption: 3662 },
      { month: 'Jul-25', consumption: 2099 }, { month: 'Aug-25', consumption: 2691 }, { month: 'Sep-25', consumption: 2018 }
    ]
  },
  {
    id: 15, name: 'D Building 53', type: 'D_Building', account: 'R54782', readings: [
      { month: 'Apr-24', consumption: 714 }, { month: 'May-24', consumption: 2699 }, { month: 'Jun-24', consumption: 1405 },
      { month: 'Jul-24', consumption: 1845 }, { month: 'Aug-24', consumption: 1494 }, { month: 'Sep-24', consumption: 1709 },
      { month: 'Oct-24', consumption: 1525 }, { month: 'Nov-24', consumption: 1764 }, { month: 'Dec-24', consumption: 968 },
      { month: 'Jan-25', consumption: 693 }, { month: 'Feb-25', consumption: 732 }, { month: 'Mar-25', consumption: 760 },
      { month: 'Apr-25', consumption: 1281 }, { month: 'May-25', consumption: 1674 }, { month: 'Jun-25', consumption: 1411 },
      { month: 'Jul-25', consumption: 1180 }, { month: 'Aug-25', consumption: 1306 }, { month: 'Sep-25', consumption: 1279.3 }
    ]
  },
  {
    id: 16, name: 'D Building 54', type: 'D_Building', account: 'R54793', readings: [
      { month: 'Apr-24', consumption: 717 }, { month: 'May-24', consumption: 2904 }, { month: 'Jun-24', consumption: 1961 },
      { month: 'Jul-24', consumption: 2449 }, { month: 'Aug-24', consumption: 3031 }, { month: 'Sep-24', consumption: 1453 },
      { month: 'Oct-24', consumption: 1261 }, { month: 'Nov-24', consumption: 1777 }, { month: 'Dec-24', consumption: 834 },
      { month: 'Jan-25', consumption: 681 }, { month: 'Feb-25', consumption: 559 }, { month: 'Mar-25', consumption: 531 },
      { month: 'Apr-25', consumption: 1042 }, { month: 'May-25', consumption: 1616 }, { month: 'Jun-25', consumption: 2652 },
      { month: 'Jul-25', consumption: 1672 }, { month: 'Aug-25', consumption: 1402 }, { month: 'Sep-25', consumption: 1655 }
    ]
  },
  {
    id: 17, name: 'D Building 55', type: 'D_Building', account: 'R54804', readings: [
      { month: 'Apr-24', consumption: 693 }, { month: 'May-24', consumption: 2550 }, { month: 'Jun-24', consumption: 1735 },
      { month: 'Jul-24', consumption: 2430 }, { month: 'Aug-24', consumption: 2250 }, { month: 'Sep-24', consumption: 2100 },
      { month: 'Oct-24', consumption: 1947 }, { month: 'Nov-24', consumption: 1828 }, { month: 'Dec-24', consumption: 1035 },
      { month: 'Jan-25', consumption: 677 }, { month: 'Feb-25', consumption: 616 }, { month: 'Mar-25', consumption: 719 },
      { month: 'Apr-25', consumption: 1417 }, { month: 'May-25', consumption: 2087 }, { month: 'Jun-25', consumption: 2703 },
      { month: 'Jul-25', consumption: 1385 }, { month: 'Aug-25', consumption: 1245 }, { month: 'Sep-25', consumption: 1554 }
    ]
  },
  {
    id: 18, name: 'D Building 56', type: 'D_Building', account: 'R54815', readings: [
      { month: 'Apr-24', consumption: 938 }, { month: 'May-24', consumption: 3099 }, { month: 'Jun-24', consumption: 1617 },
      { month: 'Jul-24', consumption: 2384 }, { month: 'Aug-24', consumption: 2185 }, { month: 'Sep-24', consumption: 2190 },
      { month: 'Oct-24', consumption: 2055 }, { month: 'Nov-24', consumption: 1805 }, { month: 'Dec-24', consumption: 937 },
      { month: 'Jan-25', consumption: 683 }, { month: 'Feb-25', consumption: 731 }, { month: 'Mar-25', consumption: 765 },
      { month: 'Apr-25', consumption: 1536 }, { month: 'May-25', consumption: 2052 }, { month: 'Jun-25', consumption: 2938 },
      { month: 'Jul-25', consumption: 2391 }, { month: 'Aug-25', consumption: 2330 }, { month: 'Sep-25', consumption: 2724 }
    ]
  },
  {
    id: 19, name: 'D Building 57', type: 'D_Building', account: 'R54826', readings: [
      { month: 'Apr-24', consumption: 574 }, { month: 'May-24', consumption: 2704 }, { month: 'Jun-24', consumption: 1816 },
      { month: 'Jul-24', consumption: 2477 }, { month: 'Aug-24', consumption: 2429 }, { month: 'Sep-24', consumption: 1935 },
      { month: 'Oct-24', consumption: 2260 }, { month: 'Nov-24', consumption: 2262 }, { month: 'Dec-24', consumption: 1332 },
      { month: 'Jan-25', consumption: 990 }, { month: 'Feb-25', consumption: 846 }, { month: 'Mar-25', consumption: 795 },
      { month: 'Apr-25', consumption: 1732 }, { month: 'May-25', consumption: 2996 }, { month: 'Jun-25', consumption: 3064 },
      { month: 'Jul-25', consumption: 1544 }, { month: 'Aug-25', consumption: 2325 }, { month: 'Sep-25', consumption: 2203 }
    ]
  },
  {
    id: 20, name: 'D Building 58', type: 'D_Building', account: 'R54836', readings: [
      { month: 'Apr-24', consumption: 568 }, { month: 'May-24', consumption: 2430 }, { month: 'Jun-24', consumption: 1555 },
      { month: 'Jul-24', consumption: 2233 }, { month: 'Aug-24', consumption: 1860 }, { month: 'Sep-24', consumption: 1688 },
      { month: 'Oct-24', consumption: 1469 }, { month: 'Nov-24', consumption: 1534 }, { month: 'Dec-24', consumption: 778 },
      { month: 'Jan-25', consumption: 593 }, { month: 'Feb-25', consumption: 535 }, { month: 'Mar-25', consumption: 594 },
      { month: 'Apr-25', consumption: 1415 }, { month: 'May-25', consumption: 1613 }, { month: 'Jun-25', consumption: 2307 },
      { month: 'Jul-25', consumption: 532 }, { month: 'Aug-25', consumption: 864 }, { month: 'Sep-25', consumption: 1881 }
    ]
  },
  {
    id: 21, name: 'D Building 59', type: 'D_Building', account: 'R54847', readings: [
      { month: 'Apr-24', consumption: 546 }, { month: 'May-24', consumption: 1847 }, { month: 'Jun-24', consumption: 1514 },
      { month: 'Jul-24', consumption: 2112 }, { month: 'Aug-24', consumption: 1691 }, { month: 'Sep-24', consumption: 1792 },
      { month: 'Oct-24', consumption: 1790 }, { month: 'Nov-24', consumption: 1634 }, { month: 'Dec-24', consumption: 998 },
      { month: 'Jan-25', consumption: 628 }, { month: 'Feb-25', consumption: 582 }, { month: 'Mar-25', consumption: 697 },
      { month: 'Apr-25', consumption: 1138 }, { month: 'May-25', consumption: 1871 }, { month: 'Jun-25', consumption: 2511 },
      { month: 'Jul-25', consumption: 1561 }, { month: 'Aug-25', consumption: 2106 }, { month: 'Sep-25', consumption: 1703 }
    ]
  },
  {
    id: 22, name: 'D Building 60', type: 'D_Building', account: 'R54858', readings: [
      { month: 'Apr-24', consumption: 628 }, { month: 'May-24', consumption: 1935 }, { month: 'Jun-24', consumption: 1327 },
      { month: 'Jul-24', consumption: 1762 }, { month: 'Aug-24', consumption: 1269 }, { month: 'Sep-24', consumption: 1360 },
      { month: 'Oct-24', consumption: 1260 }, { month: 'Nov-24', consumption: 1275 }, { month: 'Dec-24', consumption: 705 },
      { month: 'Jan-25', consumption: 674 }, { month: 'Feb-25', consumption: 612 }, { month: 'Mar-25', consumption: 679 },
      { month: 'Apr-25', consumption: 1069 }, { month: 'May-25', consumption: 1554 }, { month: 'Jun-25', consumption: 2330 },
      { month: 'Jul-25', consumption: 1390 }, { month: 'Aug-25', consumption: 2814 }, { month: 'Sep-25', consumption: 2406 }
    ]
  },
  {
    id: 23, name: 'D Building 61', type: 'D_Building', account: 'R54869', readings: [
      { month: 'Apr-24', consumption: 532 }, { month: 'May-24', consumption: 2022 }, { month: 'Jun-24', consumption: 1662 },
      { month: 'Jul-24', consumption: 2255 }, { month: 'Aug-24', consumption: 1929 }, { month: 'Sep-24', consumption: 1958 },
      { month: 'Oct-24', consumption: 1704 }, { month: 'Nov-24', consumption: 1734 }, { month: 'Dec-24', consumption: 977 },
      { month: 'Jan-25', consumption: 767 }, { month: 'Feb-25', consumption: 800 }, { month: 'Mar-25', consumption: 719 },
      { month: 'Apr-25', consumption: 1394 }, { month: 'May-25', consumption: 2168 }, { month: 'Jun-25', consumption: 2606 },
      { month: 'Jul-25', consumption: 2227 }, { month: 'Aug-25', consumption: 3163 }, { month: 'Sep-25', consumption: 2877 }
    ]
  },
  {
    id: 24, name: 'D Building 62', type: 'D_Building', account: 'R53717', readings: [
      { month: 'Apr-24', consumption: 858 }, { month: 'May-24', consumption: 2297 }, { month: 'Jun-24', consumption: 1744 },
      { month: 'Jul-24', consumption: 2425 }, { month: 'Aug-24', consumption: 2018 }, { month: 'Sep-24', consumption: 1950 },
      { month: 'Oct-24', consumption: 1768 }, { month: 'Nov-24', consumption: 1630 }, { month: 'Dec-24', consumption: 957 },
      { month: 'Jan-25', consumption: 715 }, { month: 'Feb-25', consumption: 677 }, { month: 'Mar-25', consumption: 595 },
      { month: 'Apr-25', consumption: 800 }, { month: 'May-25', consumption: 1788 }, { month: 'Jun-25', consumption: 2886 },
      { month: 'Jul-25', consumption: 2181 }, { month: 'Aug-25', consumption: 1953 }, { month: 'Sep-25', consumption: 1743 }
    ]
  },
  {
    id: 25, name: 'D Building 74', type: 'D_Building', account: 'R53675', readings: [
      { month: 'Apr-24', consumption: 718 }, { month: 'May-24', consumption: 2495 }, { month: 'Jun-24', consumption: 1291 },
      { month: 'Jul-24', consumption: 1895 }, { month: 'Aug-24', consumption: 1339 }, { month: 'Sep-24', consumption: 840 },
      { month: 'Oct-24', consumption: 1147 }, { month: 'Nov-24', consumption: 1303 }, { month: 'Dec-24', consumption: 766 },
      { month: 'Jan-25', consumption: 639 }, { month: 'Feb-25', consumption: 566 }, { month: 'Mar-25', consumption: 463 },
      { month: 'Apr-25', consumption: 1079 }, { month: 'May-25', consumption: 2338 }, { month: 'Jun-25', consumption: 3153 },
      { month: 'Jul-25', consumption: 1320 }, { month: 'Aug-25', consumption: 1648 }, { month: 'Sep-25', consumption: 1044 }
    ]
  },
  {
    id: 26, name: 'D Building 75', type: 'D_Building', account: 'R53668', readings: [
      { month: 'Apr-24', consumption: 795 }, { month: 'May-24', consumption: 6744 }, { month: 'Jun-24', consumption: 983 },
      { month: 'Jul-24', consumption: 1438 }, { month: 'Aug-24', consumption: 1268 }, { month: 'Sep-24', consumption: 1225 },
      { month: 'Oct-24', consumption: 1125 }, { month: 'Nov-24', consumption: 1169 }, { month: 'Dec-24', consumption: 702 },
      { month: 'Jan-25', consumption: 475 }, { month: 'Feb-25', consumption: 508 }, { month: 'Mar-25', consumption: 554 },
      { month: 'Apr-25', consumption: 912 }, { month: 'May-25', consumption: 1510 }, { month: 'Jun-25', consumption: 2005 },
      { month: 'Jul-25', consumption: 1851 }, { month: 'Aug-25', consumption: 2072 }, { month: 'Sep-25', consumption: 2262 }
    ]
  },
  {
    id: 27, name: 'Actuator DB 01 (Z8)', type: 'DB', account: 'R53196', readings: [
      { month: 'Apr-24', consumption: 39 }, { month: 'May-24', consumption: 49 }, { month: 'Jun-24', consumption: 43 },
      { month: 'Jul-24', consumption: 43 }, { month: 'Aug-24', consumption: 45 }, { month: 'Sep-24', consumption: 43 },
      { month: 'Oct-24', consumption: 36 }, { month: 'Nov-24', consumption: 34 }, { month: 'Dec-24', consumption: 29 },
      { month: 'Jan-25', consumption: 7 }, { month: 'Feb-25', consumption: 28 }, { month: 'Mar-25', consumption: 24 },
      { month: 'Apr-25', consumption: 27.1 }, { month: 'May-25', consumption: 22.5 }, { month: 'Jun-25', consumption: 31 },
      { month: 'Jul-25', consumption: 23 }, { month: 'Aug-25', consumption: 427 }, { month: 'Sep-25', consumption: 7 }
    ]
  },
  {
    id: 28, name: 'Actuator DB 02', type: 'DB', account: 'R51900', readings: [
      { month: 'Apr-24', consumption: 285 }, { month: 'May-24', consumption: 335 }, { month: 'Jun-24', consumption: 275 },
      { month: 'Jul-24', consumption: 220 }, { month: 'Aug-24', consumption: 210 }, { month: 'Sep-24', consumption: 219 },
      { month: 'Oct-24', consumption: 165 }, { month: 'Nov-24', consumption: 232 }, { month: 'Dec-24', consumption: 161 },
      { month: 'Jan-25', consumption: 33 }, { month: 'Feb-25', consumption: 134 }, { month: 'Mar-25', consumption: 139 },
      { month: 'Apr-25', consumption: 211 }, { month: 'May-25', consumption: 234.5 }, { month: 'Jun-25', consumption: 363 },
      { month: 'Jul-25', consumption: 145 }, { month: 'Aug-25', consumption: 157 }, { month: 'Sep-25', consumption: 215 }
    ]
  },
  {
    id: 29, name: 'Actuator DB 03', type: 'DB', account: 'R51904', readings: [
      { month: 'Apr-24', consumption: 188 }, { month: 'May-24', consumption: 226 }, { month: 'Jun-24', consumption: 197 },
      { month: 'Jul-24', consumption: 203 }, { month: 'Aug-24', consumption: 212 }, { month: 'Sep-24', consumption: 203 },
      { month: 'Oct-24', consumption: 196 }, { month: 'Nov-24', consumption: 220 }, { month: 'Dec-24', consumption: 199 },
      { month: 'Jan-25', consumption: 56 }, { month: 'Feb-25', consumption: 203 }, { month: 'Mar-25', consumption: 196 },
      { month: 'Apr-25', consumption: 211.6 }, { month: 'May-25', consumption: 188.4 }, { month: 'Jun-25', consumption: 217 },
      { month: 'Jul-25', consumption: 133 }, { month: 'Aug-25', consumption: 124 }, { month: 'Sep-25', consumption: 130 }
    ]
  },
  {
    id: 30, name: 'Actuator DB 04', type: 'DB', account: 'R51901', readings: [
      { month: 'Apr-24', consumption: 159 }, { month: 'May-24', consumption: 275 }, { month: 'Jun-24', consumption: 258 },
      { month: 'Jul-24', consumption: 210 }, { month: 'Aug-24', consumption: 184 }, { month: 'Sep-24', consumption: 201 },
      { month: 'Oct-24', consumption: 144 }, { month: 'Nov-24', consumption: 172 }, { month: 'Dec-24', consumption: 173 },
      { month: 'Jan-25', consumption: 186 }, { month: 'Feb-25', consumption: 161 }, { month: 'Mar-25', consumption: 227 },
      { month: 'Apr-25', consumption: 253 }, { month: 'May-25', consumption: 163 }, { month: 'Jun-25', consumption: 255 },
      { month: 'Jul-25', consumption: 211 }, { month: 'Aug-25', consumption: 196 }, { month: 'Sep-25', consumption: 228 }
    ]
  },
  {
    id: 31, name: 'Actuator DB 05', type: 'DB', account: 'R51907', readings: [
      { month: 'Apr-24', consumption: 15 }, { month: 'May-24', consumption: 18 }, { month: 'Jun-24', consumption: 15 },
      { month: 'Jul-24', consumption: 16 }, { month: 'Aug-24', consumption: 16 }, { month: 'Sep-24', consumption: 16 },
      { month: 'Oct-24', consumption: 15 }, { month: 'Nov-24', consumption: 18 }, { month: 'Dec-24', consumption: 16 },
      { month: 'Jan-25', consumption: 4 }, { month: 'Feb-25', consumption: 18 }, { month: 'Mar-25', consumption: 14 },
      { month: 'Apr-25', consumption: 17.7 }, { month: 'May-25', consumption: 15.3 }, { month: 'Jun-25', consumption: 21 },
      { month: 'Jul-25', consumption: 17 }, { month: 'Aug-25', consumption: 18 }, { month: 'Sep-25', consumption: 16 }
    ]
  },
  {
    id: 32, name: 'Actuator DB 06', type: 'DB', account: 'R51909', readings: [
      { month: 'Apr-24', consumption: 39 }, { month: 'May-24', consumption: 50 }, { month: 'Jun-24', consumption: 42 },
      { month: 'Jul-24', consumption: 48 }, { month: 'Aug-24', consumption: 46 }, { month: 'Sep-24', consumption: 129 },
      { month: 'Oct-24', consumption: 43 }, { month: 'Nov-24', consumption: 49 }, { month: 'Dec-24', consumption: 44 },
      { month: 'Jan-25', consumption: 47 }, { month: 'Feb-25', consumption: 45 }, { month: 'Mar-25', consumption: 38 },
      { month: 'Apr-25', consumption: 46.9 }, { month: 'May-25', consumption: 44.1 }, { month: 'Jun-25', consumption: 56 },
      { month: 'Jul-25', consumption: 42 }, { month: 'Aug-25', consumption: 50 }, { month: 'Sep-25', consumption: 45 }
    ]
  },
  {
    id: 33, name: 'Guard House', type: 'DB', account: 'R53651', readings: [
      { month: 'Apr-24', consumption: 823 }, { month: 'May-24', consumption: 1489 }, { month: 'Jun-24', consumption: 1574 },
      { month: 'Jul-24', consumption: 1586 }, { month: 'Aug-24', consumption: 1325 }, { month: 'Sep-24', consumption: 1391 },
      { month: 'Oct-24', consumption: 1205 }, { month: 'Nov-24', consumption: 1225 }, { month: 'Dec-24', consumption: 814 },
      { month: 'Jan-25', consumption: 798 }, { month: 'Feb-25', consumption: 936 }, { month: 'Mar-25', consumption: 879 },
      { month: 'Apr-25', consumption: 1467 }, { month: 'May-25', consumption: 1764 }, { month: 'Jun-25', consumption: 2249 },
      { month: 'Jul-25', consumption: 1481 }, { month: 'Aug-25', consumption: 1657 }, { month: 'Sep-25', consumption: 1404 }
    ]
  },
  {
    id: 34, name: 'Helipad', type: 'DB', account: 'R52334', readings: [
      { month: 'Apr-24', consumption: 0 }, { month: 'May-24', consumption: 0 }, { month: 'Jun-24', consumption: 0 },
      { month: 'Jul-24', consumption: 0 }, { month: 'Aug-24', consumption: 0 }, { month: 'Sep-24', consumption: 0 },
      { month: 'Oct-24', consumption: 0 }, { month: 'Nov-24', consumption: 0 }, { month: 'Dec-24', consumption: 0 },
      { month: 'Jan-25', consumption: 0 }, { month: 'Feb-25', consumption: 0 }, { month: 'Mar-25', consumption: 0 },
      { month: 'Apr-25', consumption: 0 }, { month: 'May-25', consumption: 0 }, { month: 'Jun-25', consumption: 0 },
      { month: 'Jul-25', consumption: 0 }, { month: 'Aug-25', consumption: 0 }, { month: 'Sep-25', consumption: 0 }
    ]
  },
  {
    id: 35, name: 'Zone-3 landscape light 17', type: 'FP-Landscape Lights Z3', account: 'R54872', readings: [
      { month: 'Apr-24', consumption: 0 }, { month: 'May-24', consumption: 0 }, { month: 'Jun-24', consumption: 0 },
      { month: 'Jul-24', consumption: 0 }, { month: 'Aug-24', consumption: 0 }, { month: 'Sep-24', consumption: 0 },
      { month: 'Oct-24', consumption: 0 }, { month: 'Nov-24', consumption: 0 }, { month: 'Dec-24', consumption: 0 },
      { month: 'Jan-25', consumption: 0 }, { month: 'Feb-25', consumption: 0 }, { month: 'Mar-25', consumption: 0 },
      { month: 'Apr-25', consumption: 0 }, { month: 'May-25', consumption: 0 }, { month: 'Jun-25', consumption: 0 },
      { month: 'Jul-25', consumption: 0 }, { month: 'Aug-25', consumption: 0 }, { month: 'Sep-25', consumption: 0 }
    ]
  },
  {
    id: 36, name: 'Zone-3 landscape light 21', type: 'FP-Landscape Lights Z3', account: 'R54873', readings: [
      { month: 'Apr-24', consumption: 42 }, { month: 'May-24', consumption: 67 }, { month: 'Jun-24', consumption: 37 },
      { month: 'Jul-24', consumption: 42 }, { month: 'Aug-24', consumption: 40 }, { month: 'Sep-24', consumption: 33 },
      { month: 'Oct-24', consumption: 28 }, { month: 'Nov-24', consumption: 40 }, { month: 'Dec-24', consumption: 48 },
      { month: 'Jan-25', consumption: 13 }, { month: 'Feb-25', consumption: 57 }, { month: 'Mar-25', consumption: 47 },
      { month: 'Apr-25', consumption: 55 }, { month: 'May-25', consumption: 41 }, { month: 'Jun-25', consumption: 74 },
      { month: 'Jul-25', consumption: 59 }, { month: 'Aug-25', consumption: 53 }, { month: 'Sep-25', consumption: 55 }
    ]
  },
  {
    id: 37, name: 'Zone-3 landscape light 22', type: 'FP-Landscape Lights Z3', account: 'R54874', readings: [
      { month: 'Apr-24', consumption: 5 }, { month: 'May-24', consumption: 10 }, { month: 'Jun-24', consumption: 3 },
      { month: 'Jul-24', consumption: 5 }, { month: 'Aug-24', consumption: 4 }, { month: 'Sep-24', consumption: 5 },
      { month: 'Oct-24', consumption: 12 }, { month: 'Nov-24', consumption: 6 }, { month: 'Dec-24', consumption: 8 },
      { month: 'Jan-25', consumption: 0 }, { month: 'Feb-25', consumption: 0 }, { month: 'Mar-25', consumption: 0 },
      { month: 'Apr-25', consumption: 0 }, { month: 'May-25', consumption: 0 }, { month: 'Jun-25', consumption: 0 },
      { month: 'Jul-25', consumption: 0 }, { month: 'Aug-25', consumption: 0 }, { month: 'Sep-25', consumption: 0 }
    ]
  },
  {
    id: 38, name: 'Irrigation Tank 01', type: 'IRR', account: 'R52324 (R52326)', readings: [
      { month: 'Apr-24', consumption: 1543 }, { month: 'May-24', consumption: 2673 }, { month: 'Jun-24', consumption: 2763 },
      { month: 'Jul-24', consumption: 2623 }, { month: 'Aug-24', consumption: 1467 }, { month: 'Sep-24', consumption: 1290 },
      { month: 'Oct-24', consumption: 1244 }, { month: 'Nov-24', consumption: 1432 }, { month: 'Dec-24', consumption: 1268 },
      { month: 'Jan-25', consumption: 1689 }, { month: 'Feb-25', consumption: 2214 }, { month: 'Mar-25', consumption: 1718 },
      { month: 'Apr-25', consumption: 1663 }, { month: 'May-25', consumption: 1980 }, { month: 'Jun-25', consumption: 2380 },
      { month: 'Jul-25', consumption: 3457 }, { month: 'Aug-25', consumption: 4004 }, { month: 'Sep-25', consumption: 3800 }
    ]
  },
  {
    id: 39, name: 'Irrigation Tank 02', type: 'IRR', account: 'R52331', readings: [
      { month: 'Apr-24', consumption: 1272 }, { month: 'May-24', consumption: 2839 }, { month: 'Jun-24', consumption: 3118 },
      { month: 'Jul-24', consumption: 2330 }, { month: 'Aug-24', consumption: 2458 }, { month: 'Sep-24', consumption: 1875 },
      { month: 'Oct-24', consumption: 893 }, { month: 'Nov-24', consumption: 974 }, { month: 'Dec-24', consumption: 1026 },
      { month: 'Jan-25', consumption: 983 }, { month: 'Feb-25', consumption: 1124 }, { month: 'Mar-25', consumption: 1110 },
      { month: 'Apr-25', consumption: 1830 }, { month: 'May-25', consumption: 2282 }, { month: 'Jun-25', consumption: 3260 },
      { month: 'Jul-25', consumption: 2681 }, { month: 'Aug-25', consumption: 2100 }, { month: 'Sep-25', consumption: 1260 }
    ]
  },
  {
    id: 40, name: 'Irrigation Tank 03', type: 'IRR', account: 'R52323', readings: [
      { month: 'Apr-24', consumption: 894 }, { month: 'May-24', consumption: 866 }, { month: 'Jun-24', consumption: 1869 },
      { month: 'Jul-24', consumption: 1543 }, { month: 'Aug-24', consumption: 1793 }, { month: 'Sep-24', consumption: 524 },
      { month: 'Oct-24', consumption: 266 }, { month: 'Nov-24', consumption: 269 }, { month: 'Dec-24', consumption: 417 },
      { month: 'Jan-25', consumption: 840 }, { month: 'Feb-25', consumption: 1009 }, { month: 'Mar-25', consumption: 845 },
      { month: 'Apr-25', consumption: 1205 }, { month: 'May-25', consumption: 1305 }, { month: 'Jun-25', consumption: 2266 },
      { month: 'Jul-25', consumption: 1479 }, { month: 'Aug-25', consumption: 1979 }, { month: 'Sep-25', consumption: 1891 }
    ]
  },
  {
    id: 41, name: 'Irrigation Tank 04', type: 'IRR', account: 'R53195', readings: [
      { month: 'Apr-24', consumption: 880 }, { month: 'May-24', consumption: 827 }, { month: 'Jun-24', consumption: 555 },
      { month: 'Jul-24', consumption: 443 }, { month: 'Aug-24', consumption: 336 }, { month: 'Sep-24', consumption: 195 },
      { month: 'Oct-24', consumption: 183 }, { month: 'Nov-24', consumption: 212 }, { month: 'Dec-24', consumption: 213 },
      { month: 'Jan-25', consumption: 40 }, { month: 'Feb-25', consumption: 233 }, { month: 'Mar-25', consumption: 235 },
      { month: 'Apr-25', consumption: 447.2 }, { month: 'May-25', consumption: 1648 }, { month: 'Jun-25', consumption: 1394 },
      { month: 'Jul-25', consumption: 884 }, { month: 'Aug-25', consumption: 545 }, { month: 'Sep-25', consumption: 1525 }
    ]
  },
  {
    id: 42, name: 'Lifting Station 02', type: 'LS', account: 'R52328', readings: [
      { month: 'Apr-24', consumption: 44 }, { month: 'May-24', consumption: 0 }, { month: 'Jun-24', consumption: 0 },
      { month: 'Jul-24', consumption: 0 }, { month: 'Aug-24', consumption: 153 }, { month: 'Sep-24', consumption: 125 },
      { month: 'Oct-24', consumption: 0 }, { month: 'Nov-24', consumption: 0 }, { month: 'Dec-24', consumption: 0 },
      { month: 'Jan-25', consumption: 0 }, { month: 'Feb-25', consumption: 0 }, { month: 'Mar-25', consumption: 0 },
      { month: 'Apr-25', consumption: 0 }, { month: 'May-25', consumption: 0 }, { month: 'Jun-25', consumption: 0 },
      { month: 'Jul-25', consumption: 0 }, { month: 'Aug-25', consumption: 0 }, { month: 'Sep-25', consumption: 0 }
    ]
  },
  {
    id: 43, name: 'Lifting Station 03', type: 'LS', account: 'R52333', readings: [
      { month: 'Apr-24', consumption: 198 }, { month: 'May-24', consumption: 269 }, { month: 'Jun-24', consumption: 122 },
      { month: 'Jul-24', consumption: 203 }, { month: 'Aug-24', consumption: 208 }, { month: 'Sep-24', consumption: 257 },
      { month: 'Oct-24', consumption: 196 }, { month: 'Nov-24', consumption: 91 }, { month: 'Dec-24', consumption: 185 },
      { month: 'Jan-25', consumption: 28 }, { month: 'Feb-25', consumption: 40 }, { month: 'Mar-25', consumption: 58 },
      { month: 'Apr-25', consumption: 83 }, { month: 'May-25', consumption: 70 }, { month: 'Jun-25', consumption: 85 },
      { month: 'Jul-25', consumption: 66 }, { month: 'Aug-25', consumption: 68 }, { month: 'Sep-25', consumption: 63.65 }
    ]
  },
  {
    id: 44, name: 'Lifting Station 04', type: 'LS', account: 'R52324', readings: [
      { month: 'Apr-24', consumption: 644 }, { month: 'May-24', consumption: 865 }, { month: 'Jun-24', consumption: 791 },
      { month: 'Jul-24', consumption: 768 }, { month: 'Aug-24', consumption: 747 }, { month: 'Sep-24', consumption: 723 },
      { month: 'Oct-24', consumption: 628 }, { month: 'Nov-24', consumption: 686 }, { month: 'Dec-24', consumption: 631 },
      { month: 'Jan-25', consumption: 701 }, { month: 'Feb-25', consumption: 638 }, { month: 'Mar-25', consumption: 572 },
      { month: 'Apr-25', consumption: 750.22 }, { month: 'May-25', consumption: 659.78 }, { month: 'Jun-25', consumption: 698 },
      { month: 'Jul-25', consumption: 623 }, { month: 'Aug-25', consumption: 636 }, { month: 'Sep-25', consumption: 781 }
    ]
  },
  {
    id: 45, name: 'Lifting Station 05', type: 'LS', account: 'R52332', readings: [
      { month: 'Apr-24', consumption: 2056 }, { month: 'May-24', consumption: 2577 }, { month: 'Jun-24', consumption: 2361 },
      { month: 'Jul-24', consumption: 3016 }, { month: 'Aug-24', consumption: 3684 }, { month: 'Sep-24', consumption: 5866 },
      { month: 'Oct-24', consumption: 1715 }, { month: 'Nov-24', consumption: 2413 }, { month: 'Dec-24', consumption: 2643 },
      { month: 'Jan-25', consumption: 2873 }, { month: 'Feb-25', consumption: 3665 }, { month: 'Mar-25', consumption: 3069 },
      { month: 'Apr-25', consumption: 4201.4 }, { month: 'May-25', consumption: 5868.6 }, { month: 'Jun-25', consumption: 8461 },
      { month: 'Jul-25', consumption: 6572 }, { month: 'Aug-25', consumption: 6180 }, { month: 'Sep-25', consumption: 3158 }
    ]
  },
  {
    id: 46, name: 'Pumping Station 01', type: 'PS', account: 'R52330', readings: [
      { month: 'Apr-24', consumption: 1608 }, { month: 'May-24', consumption: 1940 }, { month: 'Jun-24', consumption: 1783 },
      { month: 'Jul-24', consumption: 1874 }, { month: 'Aug-24', consumption: 1662 }, { month: 'Sep-24', consumption: 3822 },
      { month: 'Oct-24', consumption: 6876 }, { month: 'Nov-24', consumption: 1629 }, { month: 'Dec-24', consumption: 1640 },
      { month: 'Jan-25', consumption: 1903 }, { month: 'Feb-25', consumption: 2095 }, { month: 'Mar-25', consumption: 3032 },
      { month: 'Apr-25', consumption: 3940 }, { month: 'May-25', consumption: 2982 }, { month: 'Jun-25', consumption: 3420 },
      { month: 'Jul-25', consumption: 2284 }, { month: 'Aug-25', consumption: 2332 }, { month: 'Sep-25', consumption: 2314 }
    ]
  },
  {
    id: 47, name: 'Pumping Station 03', type: 'PS', account: 'R52329', readings: [
      { month: 'Apr-24', consumption: 31 }, { month: 'May-24', consumption: 47 }, { month: 'Jun-24', consumption: 25 },
      { month: 'Jul-24', consumption: 3 }, { month: 'Aug-24', consumption: 0 }, { month: 'Sep-24', consumption: 0 },
      { month: 'Oct-24', consumption: 33 }, { month: 'Nov-24', consumption: 0 }, { month: 'Dec-24', consumption: 179 },
      { month: 'Jan-25', consumption: 33 }, { month: 'Feb-25', consumption: 137 }, { month: 'Mar-25', consumption: 131 },
      { month: 'Apr-25', consumption: 276.6 }, { month: 'May-25', consumption: 397 }, { month: 'Jun-25', consumption: 278 },
      { month: 'Jul-25', consumption: 60 }, { month: 'Aug-25', consumption: 63 }, { month: 'Sep-25', consumption: 66.7 }
    ]
  },
  {
    id: 48, name: 'Pumping Station 04', type: 'PS', account: 'R52327', readings: [
      { month: 'Apr-24', consumption: 830 }, { month: 'May-24', consumption: 818 }, { month: 'Jun-24', consumption: 720 },
      { month: 'Jul-24', consumption: 731 }, { month: 'Aug-24', consumption: 857 }, { month: 'Sep-24', consumption: 1176 },
      { month: 'Oct-24', consumption: 445 }, { month: 'Nov-24', consumption: 919 }, { month: 'Dec-24', consumption: 921 },
      { month: 'Jan-25', consumption: 245 }, { month: 'Feb-25', consumption: 870 }, { month: 'Mar-25', consumption: 646 },
      { month: 'Apr-25', consumption: 984.9 }, { month: 'May-25', consumption: 880.6 }, { month: 'Jun-25', consumption: 1049.7 },
      { month: 'Jul-25', consumption: 999.1 }, { month: 'Aug-25', consumption: 975 }, { month: 'Sep-25', consumption: 1014.3 }
    ]
  },
  {
    id: 49, name: 'Pumping Station 05', type: 'PS', account: 'R52325', readings: [
      { month: 'Apr-24', consumption: 1774 }, { month: 'May-24', consumption: 2216 }, { month: 'Jun-24', consumption: 2011 },
      { month: 'Jul-24', consumption: 2059 }, { month: 'Aug-24', consumption: 2229 }, { month: 'Sep-24', consumption: 5217 },
      { month: 'Oct-24', consumption: 2483 }, { month: 'Nov-24', consumption: 2599 }, { month: 'Dec-24', consumption: 1952 },
      { month: 'Jan-25', consumption: 2069 }, { month: 'Feb-25', consumption: 2521 }, { month: 'Mar-25', consumption: 2601 },
      { month: 'Apr-25', consumption: 3317 }, { month: 'May-25', consumption: 3582 }, { month: 'Jun-25', consumption: 3254 },
      { month: 'Jul-25', consumption: 2354 }, { month: 'Aug-25', consumption: 2702 }, { month: 'Sep-25', consumption: 2737 }
    ]
  },
  {
    id: 50, name: 'Bank muscat', type: 'Retail', account: '', readings: [
      { month: 'Apr-24', consumption: 0 }, { month: 'May-24', consumption: 0 }, { month: 'Jun-24', consumption: 0 },
      { month: 'Jul-24', consumption: 3 }, { month: 'Aug-24', consumption: 71 }, { month: 'Sep-24', consumption: -2 },
      { month: 'Oct-24', consumption: 1407 }, { month: 'Nov-24', consumption: 148 }, { month: 'Dec-24', consumption: 72 },
      { month: 'Jan-25', consumption: 59 }, { month: 'Feb-25', consumption: 98 }, { month: 'Mar-25', consumption: 88 },
      { month: 'Apr-25', consumption: 163 }, { month: 'May-25', consumption: 175 }, { month: 'Jun-25', consumption: 222 },
      { month: 'Jul-25', consumption: 191 }, { month: 'Aug-25', consumption: 154 }, { month: 'Sep-25', consumption: 93 }
    ]
  },
  {
    id: 51, name: 'CIF kitchen', type: 'Retail', account: '', readings: [
      { month: 'Apr-24', consumption: 0 }, { month: 'May-24', consumption: 0 }, { month: 'Jun-24', consumption: 0 },
      { month: 'Jul-24', consumption: 17895 }, { month: 'Aug-24', consumption: 16532 }, { month: 'Sep-24', consumption: 18955 },
      { month: 'Oct-24', consumption: 15071 }, { month: 'Nov-24', consumption: 16742 }, { month: 'Dec-24', consumption: 15554 },
      { month: 'Jan-25', consumption: 16788 }, { month: 'Feb-25', consumption: 16154 }, { month: 'Mar-25', consumption: 14971 },
      { month: 'Apr-25', consumption: 18446 }, { month: 'May-25', consumption: 17185 }, { month: 'Jun-25', consumption: 23503 },
      { month: 'Jul-25', consumption: 20608 }, { month: 'Aug-25', consumption: 20471 }, { month: 'Sep-25', consumption: 17902 }
    ]
  },
  {
    id: 52, name: 'OUA Store (BTU Meter)', type: 'Retail', account: '', readings: [
      { month: 'Apr-24', consumption: 0 }, { month: 'May-24', consumption: 0 }, { month: 'Jun-24', consumption: 0 },
      { month: 'Jul-24', consumption: 0 }, { month: 'Aug-24', consumption: 0 }, { month: 'Sep-24', consumption: 0 },
      { month: 'Oct-24', consumption: 0 }, { month: 'Nov-24', consumption: 0 }, { month: 'Dec-24', consumption: 0 },
      { month: 'Jan-25', consumption: 0 }, { month: 'Feb-25', consumption: 0 }, { month: 'Mar-25', consumption: 0 },
      { month: 'Apr-25', consumption: 0 }, { month: 'May-25', consumption: 0 }, { month: 'Jun-25', consumption: 0 }
    ]
  },
  {
    id: 53, name: 'Street Light FP 01 (Z8)', type: 'Street Light', account: 'R53197', readings: [
      { month: 'Apr-24', consumption: 2773 }, { month: 'May-24', consumption: 3276 }, { month: 'Jun-24', consumption: 3268 },
      { month: 'Jul-24', consumption: 3040 }, { month: 'Aug-24', consumption: 3203 }, { month: 'Sep-24', consumption: 3225 },
      { month: 'Oct-24', consumption: 3064 }, { month: 'Nov-24', consumption: 3593 }, { month: 'Dec-24', consumption: 3147 },
      { month: 'Jan-25', consumption: 787 }, { month: 'Feb-25', consumption: 3228 }, { month: 'Mar-25', consumption: 2663 },
      { month: 'Apr-25', consumption: 3230 }, { month: 'May-25', consumption: 3089 }, { month: 'Jun-25', consumption: 3804 },
      { month: 'Jul-25', consumption: 2834 }, { month: 'Aug-25', consumption: 3342 }, { month: 'Sep-25', consumption: 3413 }
    ]
  },
  {
    id: 54, name: 'Street Light FP 02', type: 'Street Light', account: 'R51906', readings: [
      { month: 'Apr-24', consumption: 1705 }, { month: 'May-24', consumption: 2076 }, { month: 'Jun-24', consumption: 1758 },
      { month: 'Jul-24', consumption: 1738 }, { month: 'Aug-24', consumption: 1940 }, { month: 'Sep-24', consumption: 2006 },
      { month: 'Oct-24', consumption: 1944 }, { month: 'Nov-24', consumption: 2361 }, { month: 'Dec-24', consumption: 2258 },
      { month: 'Jan-25', consumption: 633 }, { month: 'Feb-25', consumption: 2298 }, { month: 'Mar-25', consumption: 1812 },
      { month: 'Apr-25', consumption: 2153 }, { month: 'May-25', consumption: 1900 }, { month: 'Jun-25', consumption: 2435 },
      { month: 'Jul-25', consumption: 1838 }, { month: 'Aug-25', consumption: 2146 }, { month: 'Sep-25', consumption: 2172 }
    ]
  },
  {
    id: 55, name: 'Street Light FP 03', type: 'Street Light', account: 'R51905', readings: [
      { month: 'Apr-24', consumption: 1399 }, { month: 'May-24', consumption: 1608 }, { month: 'Jun-24', consumption: 1365 },
      { month: 'Jul-24', consumption: 1380 }, { month: 'Aug-24', consumption: 1457 }, { month: 'Sep-24', consumption: 1499 },
      { month: 'Oct-24', consumption: 1561 }, { month: 'Nov-24', consumption: 2060 }, { month: 'Dec-24', consumption: 1966 },
      { month: 'Jan-25', consumption: 1868 }, { month: 'Feb-25', consumption: 1974 }, { month: 'Mar-25', consumption: 1562 },
      { month: 'Apr-25', consumption: 1847 }, { month: 'May-25', consumption: 1637 }, { month: 'Jun-25', consumption: 1984 },
      { month: 'Jul-25', consumption: 1571 }, { month: 'Aug-25', consumption: 1735 }, { month: 'Sep-25', consumption: 1783 }
    ]
  },
  {
    id: 56, name: 'Street Light FP 04', type: 'Street Light', account: 'R51908', readings: [
      { month: 'Apr-24', consumption: 861 }, { month: 'May-24', consumption: 1045 }, { month: 'Jun-24', consumption: 1051 },
      { month: 'Jul-24', consumption: 2268 }, { month: 'Aug-24', consumption: 2478 }, { month: 'Sep-24', consumption: 2513 },
      { month: 'Oct-24', consumption: 2341 }, { month: 'Nov-24', consumption: 2299 }, { month: 'Dec-24', consumption: 1389 },
      { month: 'Jan-25', consumption: 325 }, { month: 'Feb-25', consumption: 1406 }, { month: 'Mar-25', consumption: 1401 },
      { month: 'Apr-25', consumption: 2412.9 }, { month: 'May-25', consumption: 3047.1 }, { month: 'Jun-25', consumption: 4099 },
      { month: 'Jul-25', consumption: 3072 }, { month: 'Aug-25', consumption: 3180 }, { month: 'Sep-25', consumption: 2847 }
    ]
  },
  {
    id: 57, name: 'Street Light FP 05', type: 'Street Light', account: 'R51902', readings: [
      { month: 'Apr-24', consumption: 532 }, { month: 'May-24', consumption: 587 }, { month: 'Jun-24', consumption: 575 },
      { month: 'Jul-24', consumption: 770 }, { month: 'Aug-24', consumption: 1341 }, { month: 'Sep-24', consumption: 1895 },
      { month: 'Oct-24', consumption: 1844 }, { month: 'Nov-24', consumption: 1477 }, { month: 'Dec-24', consumption: 1121 },
      { month: 'Jan-25', consumption: 449 }, { month: 'Feb-25', consumption: 2070 }, { month: 'Mar-25', consumption: 1870 },
      { month: 'Apr-25', consumption: 3233 }, { month: 'May-25', consumption: 4796 }, { month: 'Jun-25', consumption: 5406 },
      { month: 'Jul-25', consumption: 3769 }, { month: 'Aug-25', consumption: 3953 }, { month: 'Sep-25', consumption: 3402 }
    ]
  }
];
