export interface BriefPayload {
  readonly name: string;
  readonly company: string;
  readonly email: string;
  readonly project: string;
  readonly budget: string;
  readonly timing: string;
  readonly message: string;
  readonly favorites: readonly string[];
}

/** Optional API adapter. Returns false on network/API errors so mailto remains the fallback. */
export const submitBriefToEndpoint = async (endpoint: string, payload: BriefPayload): Promise<boolean> => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    });
    return response.ok;
  } catch {
    return false;
  }
};
