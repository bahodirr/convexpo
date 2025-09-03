import type { RunMutationCtx } from "@convex-dev/better-auth";
import { Resend } from "@convex-dev/resend";
import { components } from "../../_generated/api";

export const resendHandler = new Resend(components.resend, {
	/**
	 * NOTE:
	 * if wanting to use test addresses,
	 * isDevelopment()
	 * you cant use your own email in test mode
	 */
	testMode: false,
});

export const sendEmail = async (
	ctx: RunMutationCtx,
	{
		to,
		subject,
		html,
		text,
	}: {
		to: string;
		subject: string;
		html: string;
		text?: string;
	},
) => {
	await resendHandler.sendEmail(ctx, {
		from: "Brian <myname@project.com>",
		to,
		subject,
		html,
		text,
	});
};
