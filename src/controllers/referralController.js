import { PrismaClient } from '@prisma/client';
import { sendReferralEmail } from '../config/email.js';

const prisma = new PrismaClient();

export const createReferral = async (req, res) => {
  try {
    const {
      referrerName,
      referrerEmail,
      refereeName,
      refereeEmail,
      courseId
    } = req.body;

    // Create referral in database
    const referral = await prisma.referral.create({
      data: {
        referrerName,
        referrerEmail,
        refereeName,
        refereeEmail,
        courseId,
        status: 'PENDING'
      }
    });

    // Try to send email, but don't fail if it doesn't work
    try {
      await sendReferralEmail({
        to: refereeEmail,
        referrerName,
        refereeName,
        courseId
      });
    } catch (emailError) {
      console.error('Warning: Failed to send email:', emailError);
      // Continue execution even if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Referral created successfully',
      data: referral
    });
  } catch (error) {
    console.error('Error creating referral:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create referral',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
