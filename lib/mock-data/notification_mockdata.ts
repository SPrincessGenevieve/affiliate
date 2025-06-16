import {
  AlarmClock,
  Banknote,
  ClipboardList,
  FileWarning,
  MessageSquareMore,
  OctagonAlert,
  SquareKanban,
} from "lucide-react";

export const NotificationMockdata = [
  {
    icon: MessageSquareMore,
    read: false,
    title: "Investor Inquiry",
    description:
      "A new inquiry has been submitted by John Smith regarding Investment #WINE78901. Message: 'What is the projected ROI for Château Margaux 2015?' Please respond promptly.",
  },
  {
    icon: SquareKanban,
    read: true,
    title: "Investor Inquiry",
    description:
      "A new inquiry has been submitted by John Smith regarding Investment #WINE78901. Message: 'What is the projected ROI for Château Margaux 2015?' Please respond promptly.",
  },
  {
    icon: ClipboardList,
    read: false,
    title: "New Wine Investment Listed",
    description:
      "A new wine investment has been added to the platform: Château Lafite Rothschild 2018. Investment ID: #WINE12345. Expected ROI: 12% over 5 years.",
  },
  {
    icon: AlarmClock,
    read: false,
    title: "Upcoming Dividend Payout",
    description:
      "Reminder: The dividend payout for Investment #WINE56789 is scheduled in 3 days. Estimated return: $150. Review your portfolio for details.",
  },
  {
    icon: Banknote,
    read: false,
    title: "Investment Return Received",
    description:
      "You’ve received a return of $100.00 for Wine Investment #WINE12345. Funds have been added to your wallet.",
  },
  // {
  //   icon: OctagonAlert,
  //   read: true,
  //   title: "Platform Maintenance Notice",
  //   description:
  //     "Scheduled Maintenance: The wine investment portal will be offline on March 30th from 2:00 AM to 4:00 AM. Please complete transactions beforehand.",
  // },
  // {
  //   icon: FileWarning,
  //   read: true,
  //   title: "Pending Investment Reviews",
  //   description:
  //     "You have 5 wine investments pending performance review. Please review Investment IDs: #WINE12345, #WINE67890, #WINE45678, #WINE56789, and #WINE67801.",
  // },
];
