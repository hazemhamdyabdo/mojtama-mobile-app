import type { CreateRequestFormValues } from "@/features/requests/schemas/createRequestSchema";
import type {
  RequestIssueType,
  RequestPriority,
  RequestType,
  ServiceRequest,
} from "@/features/requests/types";

const dummyAvatar = require("@/features/home/constants/dummy-avatar.jpg");

function formatTodayDate(): string {
  const today = new Date();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
}

type BuildRequestOptions = {
  submittedByName?: string;
  submittedByAvatar?: ServiceRequest["submittedBy"]["avatar"];
};

export function buildServiceRequestFromForm(
  values: CreateRequestFormValues,
  options: BuildRequestOptions = {},
): ServiceRequest {
  const description =
    values.description?.trim() ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  return {
    id: `r-${Date.now()}`,
    date: formatTodayDate(),
    title: values.title,
    description,
    fullDescription: description,
    requestType: values.requestType as RequestType,
    issueType: values.issueType
      ? (values.issueType as RequestIssueType)
      : undefined,
    priority: values.priority as RequestPriority,
    status: "pending",
    location: values.location,
    submittedBy: {
      name: options.submittedByName ?? "Jade Smith",
      unit: values.location,
      avatar: options.submittedByAvatar ?? dummyAvatar,
    },
    activities: [],
  };
}

export function mapRequestToFormValues(
  request: ServiceRequest,
): CreateRequestFormValues {
  return {
    title: request.title,
    description: request.fullDescription,
    location: request.location,
    requestType: request.requestType,
    issueType: request.issueType ?? "",
    priority: request.priority,
  };
}

export function applyFormValuesToRequest(
  request: ServiceRequest,
  values: CreateRequestFormValues,
): ServiceRequest {
  const description =
    values.description?.trim() || request.fullDescription;

  return {
    ...request,
    title: values.title,
    description,
    fullDescription: description,
    location: values.location,
    requestType: values.requestType as RequestType,
    issueType: values.issueType
      ? (values.issueType as RequestIssueType)
      : undefined,
    priority: values.priority as RequestPriority,
  };
}
