import { httpRouter } from "convex/server";
import { authComponent, createAuth } from "./lib/betterAuth";

const http = httpRouter();

/**
 * AUTH
 * Client side frameworks need CORS enabled to work properly.
 */
authComponent.registerRoutes(http, createAuth, { cors: false });

/**
 * RESEND
 * Route for handling resend webhook events.
 * ONLY USED IN PRODUCTION
 *
 * http.route({
 * path: "/resend-webhook",
 * method: "POST",
 * handler: httpAction(async (ctx, req) => {
 * return await resendHandler.handleResendEventWebhook(ctx, req);
 * })
 * });
 */

export default http;
