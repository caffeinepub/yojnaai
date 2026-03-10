import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface Scheme {
    id: string;
    documents: string;
    applyLink: string;
    name: string;
    tags: Array<string>;
    description: string;
    eligibility: string;
    state: string;
    category: string;
    benefit: string;
    benefitAmountNumeric: bigint;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface backendInterface {
    addScheme(scheme: Scheme, password: string): Promise<void>;
    deleteScheme(id: string, password: string): Promise<void>;
    getAISuggestion(prompt: string): Promise<string>;
    getAllSchemes(): Promise<Array<Scheme>>;
    getSchemeById(id: string): Promise<Scheme>;
    getSchemesByCategory(category: string): Promise<Array<Scheme>>;
    getSchemesByState(state: string): Promise<Array<Scheme>>;
    getSchemesByTag(tag: string): Promise<Array<Scheme>>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateScheme(scheme: Scheme, password: string): Promise<void>;
}
