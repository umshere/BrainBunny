import React from 'react';

export const ReferralCard = () => (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 rounded-2xl shadow-lg text-white">
        <h3 className="text-xl font-bold mb-2">Refer a Friend, Get Credits!</h3>
        <p className="opacity-90 mb-4">Share BrainyBunny with your friends and you'll both receive 50 free generation credits when they sign up.</p>
        <button className="bg-white text-indigo-600 font-bold py-2 px-4 rounded-lg transition-transform hover:scale-105">
            Get Your Referral Link
        </button>
    </div>
);
