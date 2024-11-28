import React, { useState, useEffect } from 'react';
import '../styles/MenopauseTips.css'; 

const tips = [
    "Stay hydrated to help with hot flashes.",
    "Practice mindfulness and meditation.",
    "Eat a balanced diet rich in fruits and vegetables.",
    "Regular exercise can help manage symptoms.",
    "Consider yoga or tai chi for stress relief.",
    "Stay connected with friends and family for support.",
    "Get enough sleep to help manage mood swings.",
    "Consult with a healthcare provider about hormone therapy options.",
    "Limit caffeine and alcohol intake to reduce symptoms.",
    "Use a cool gel pad or fan to alleviate hot flashes.",
    "Experiment with different relaxation techniques to find what works best for you.",
    "Wear layered clothing to manage temperature fluctuations.",
    "Seek out menopause support groups or online communities.",
    "Talk openly with your partner about changes you're experiencing.",
    "Learn about the stages of menopause to better understand what to expect.",
    "Educate yourself about hormone replacement therapy and its risks and benefits.",
    "Explore alternative therapies like aromatherapy or herbal teas.",
    "Prioritize self-care activities that bring you joy and relaxation.",
    "Practice deep breathing exercises to reduce anxiety and stress.",
    "Engage in regular strength training exercises to maintain bone health.",
    "Keep a healthy weight to reduce the risk of certain menopause-related health issues.",
    "Avoid spicy foods if you experience frequent hot flashes.",
    "Use water-based lubricants to relieve vaginal dryness.",
    "Stay informed about menopause research and new treatment options.",
    "Discuss any concerns or questions about menopause with your healthcare provider.",
    "Consider mindfulness-based stress reduction programs for symptom relief.",
    "Explore hobbies and activities that bring you fulfillment and relaxation.",
    "Practice good sleep hygiene habits to improve sleep quality.",
    "Seek out peer support from other women going through menopause.",
    "Stay physically active to boost mood and energy levels.",
    "Limit processed foods and focus on whole, nutrient-rich foods.",
    "Use relaxation techniques like progressive muscle relaxation to ease tension.",
    "Consider hormone therapy alternatives like bioidentical hormones.",
    "Maintain regular check-ups with your healthcare provider for overall health monitoring.",
    "Stay positive and focus on the opportunities and growth that come with this life stage.",
    "Experiment with different coping strategies to find what works best for you.",
    "Educate yourself about the role of hormones in menopause and their impact on your body.",
];

const MenopauseTips = () => {
    const [currentTip, setCurrentTip] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTip((prevTip) => (prevTip + 1) % tips.length);
        }, 20000); // changes the tip every 20 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="menopause-tips">
            <h3>{tips[currentTip]}</h3>
        </div>
    );
};

export default MenopauseTips;
