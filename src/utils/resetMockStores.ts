import { resetPostsState } from "@/features/home/store/postState";
import { resetNotificationsState } from "@/features/notifications/store/notificationState";
import { resetPaymentState } from "@/features/payments/store/paymentState";
import { resetRequestsState } from "@/features/requests/store/requestState";
import { resetResidentsState } from "@/features/residents/store/residentState";
import { resetUserState } from "@/features/settings/store/userState";
import { resetDocumentsState } from "@/features/documents/store/documentState";
import { resetVisitorsState } from "@/features/visitors/store/visitorState";
import { resetMockIdCounter } from "@/utils/mockApi";

export function resetAllMockStores(): void {
  resetPostsState();
  resetRequestsState();
  resetVisitorsState();
  resetPaymentState();
  resetUserState();
  resetDocumentsState();
  resetResidentsState();
  resetNotificationsState();
  resetMockIdCounter();
}
