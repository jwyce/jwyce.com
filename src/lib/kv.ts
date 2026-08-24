import { Redis } from "@upstash/redis";

let client: Redis | null = null;

export function getKv(): Redis | null {
	if (client) return client;

	const url =
		process.env.JWYCE_KV_REST_API_URL ??
		process.env.KV_REST_API_URL ??
		process.env.UPSTASH_REDIS_REST_URL;
	const token =
		process.env.JWYCE_KV_REST_API_TOKEN ??
		process.env.KV_REST_API_TOKEN ??
		process.env.UPSTASH_REDIS_REST_TOKEN;
	if (!url || !token) return null;

	client = new Redis({ url, token });
	return client;
}

export async function getCache<T>(key: string): Promise<T | null> {
	const kv = getKv();
	if (!kv) return null;
	try {
		return await kv.get<T>(key);
	} catch (error) {
		console.warn(`KV cache read failed for ${key}:`, error);
		return null;
	}
}

export async function setCache(key: string, value: unknown): Promise<void> {
	const kv = getKv();
	if (!kv) return;
	try {
		await kv.set(key, value);
	} catch (error) {
		console.warn(`KV cache write failed for ${key}:`, error);
	}
}
