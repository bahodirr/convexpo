import type { RunMutationCtx } from "@convex-dev/better-auth";
import generateResetPasswordEmail from "./emails/resetPassword";
import generateVerifyEmail from "./emails/verifyEmail";
import generateVerifyOTP from "./emails/verifyOTP";
import { sendEmail } from "./sendEmails";

// const logoUrl = "https://apyri.com/logo.png";

export const sendEmailVerification = async (
	ctx: RunMutationCtx,
	{
		to,
		url,
	}: {
		to: string;
		url: string;
	},
) => {
	const { html, text } = generateVerifyEmail({ url });
	await sendEmail(ctx, {
		to,
		subject: "Verify your email address",
		html,
		text,
	});
};

export const sendOTPVerification = async (
	ctx: RunMutationCtx,
	{
		to,
		code,
	}: {
		to: string;
		code: string;
	},
) => {
	const { html, text } = generateVerifyOTP({ code });
	await sendEmail(ctx, {
		to,
		subject: "Your verification code",
		html,
		text,
	});
};

export const sendResetPassword = async (
	ctx: RunMutationCtx,
	{
		to,
		url,
	}: {
		to: string;
		url: string;
	},
) => {
	const { html, text } = generateResetPasswordEmail({ url });
	await sendEmail(ctx, {
		to,
		subject: "Reset your password",
		html,
		text,
	});
};
