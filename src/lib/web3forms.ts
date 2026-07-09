import { SITE_NAME } from "@/lib/site";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export type LeadFormPayload = {
  name: string;
  phone: string;
  service?: string;
};

type Web3FormsResponse = {
  success: boolean;
  message?: string;
};

export function getWeb3FormsAccessKey(): string {
  return (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined)?.trim() ?? "";
}

export async function submitLeadForm(payload: LeadFormPayload): Promise<void> {
  const accessKey = getWeb3FormsAccessKey();
  if (!accessKey) {
    throw new Error("Brak klucza Web3Forms — ustaw VITE_WEB3FORMS_ACCESS_KEY w .env");
  }

  const messageLines = [
    `Telefon: ${payload.phone}`,
    payload.service ? `Rodzaj usługi: ${payload.service}` : null,
  ].filter(Boolean);

  const body = {
    access_key: accessKey,
    subject: `Zgłoszenie serwisowe — ${SITE_NAME}`,
    from_name: payload.name,
    name: payload.name,
    phone: payload.phone,
    message: messageLines.join("\n"),
  };

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Web3Forms HTTP ${response.status}`);
  }

  const data = (await response.json()) as Web3FormsResponse;
  if (!data.success) {
    throw new Error(data.message ?? "Web3Forms odrzucił zgłoszenie");
  }
}
