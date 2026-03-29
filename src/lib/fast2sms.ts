const API_KEY = process.env.FAST2SMS_API_KEY!;
const BASE_URL = 'https://www.fast2sms.com/dev/bulkV2';

async function sendSMS(numbers: string, message: string): Promise<boolean> {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        authorization: API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        language: 'english',
        route: 'q',
        numbers,
        flash: 0,
      }),
    });
    const data = await res.json() as { return: boolean };
    return data.return === true;
  } catch (err) {
    console.error('Fast2SMS error:', err);
    return false;
  }
}

export async function sendOTPSMS(phone: string, otp: string): Promise<boolean> {
  return sendSMS(
    phone,
    `Your Infysmart login OTP is ${otp}. Valid for 10 minutes. Do not share this code.`
  );
}

export async function sendOrderConfirmationSMS(
  phone: string,
  orderNumber: string,
  totalAmount: number,
  paymentMethod: 'razorpay' | 'cod'
): Promise<boolean> {
  const amountStr = `Rs.${Math.round(totalAmount).toLocaleString('en-IN')}`;
  const paymentStr = paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid Online';
  return sendSMS(
    phone,
    `Order confirmed! ${orderNumber} | ${amountStr} | ${paymentStr}. Our team will contact you shortly. - Infysmart`
  );
}
