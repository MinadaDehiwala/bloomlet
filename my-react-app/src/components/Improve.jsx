import React, { useRef } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Improve = () => {
  const location = useLocation();
  const { childData, intelligenceScore } = location.state || {};

  const {
    name = "Your Child",
    age,
    weight,
    height,
    avgDailyScreenTime,
    appsUsed = [],
    platformsUsed = []
  } = childData || {};

  const recommendations = [];
  const reportRef = useRef();

  // Health Metrics
  const weightStatus = getWeightStatus(weight, age);
  const heightStatus = getHeightStatus(height, age);

  recommendations.push({
    title: 'Health & Nutrition',
    text: `Your child's weight is considered ${weightStatus}. It's important to monitor their diet and ensure they receive proper nutrition. Your child's height is considered ${heightStatus}. Ensure a balanced diet and regular physical activity to support healthy growth.`,
    icon: 'utensils',
    footer: 'Reviewed 2 days ago'
  });

  // Screen Time
  const recommendedScreenTime = getRecommendedScreenTime(age);
  if (avgDailyScreenTime > recommendedScreenTime) {
    recommendations.push({
      title: 'Screen Time Management',
      text: `The average screen time for a child of ${age} years is ${recommendedScreenTime} hours per day. Currently, your child is spending ${avgDailyScreenTime} hours per day, which is above the recommended amount. Consider reducing screen time and incorporating more physical activities and social interactions.`,
      icon: 'tv',
      footer: 'Reviewed 1 week ago'
    });
  } else {
    recommendations.push({
      title: 'Balanced Screen Time',
      text: `Your child's screen time is within the recommended limit of ${recommendedScreenTime} hours per day. Continue to monitor and ensure that the content they engage with is educational and age-appropriate.`,
      icon: 'clock',
      footer: 'Reviewed 1 week ago'
    });
  }

  // App Usage & Platforms Analysis
  const appsAndPlatformsAnalysis = analyzeAppsAndPlatforms(appsUsed, platformsUsed);
  appsAndPlatformsAnalysis.forEach(analysis => recommendations.push(analysis));

  // Intelligence Score
  const scoreMessage = getIntelligenceScoreMessage(intelligenceScore, age);
  recommendations.push({
    title: 'Cognitive Development',
    text: scoreMessage,
    icon: 'brain',
    footer: 'Reviewed 3 days ago'
  });

  const handleDownloadReport = async () => {
    const canvas = await html2canvas(reportRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save(`${name}_Development_Report.pdf`);
  };

  return (
    <MDBContainer fluid className="bg-light p-5 min-vh-100">
      <MDBRow className="justify-content-center">
        <MDBCol md="8">
          <h1 className="text-center mb-4" style={{ color: '#333', fontWeight: 'bold', fontSize: '3rem' }}>
            Personalized Improvement Plan for {name}
          </h1>
        </MDBCol>
      </MDBRow>
      <MDBRow className="justify-content-center" ref={reportRef}>
        {recommendations.map((rec, index) => (
          <MDBCol md="8" key={index} className="mb-4">
            <MDBCard className="shadow-3 border rounded-3">
              <MDBCardHeader className="bg-primary text-white">
                <MDBIcon fas icon={rec.icon} className="me-3" />
                {rec.title}
              </MDBCardHeader>
              <MDBCardBody>
                <MDBCardTitle className="text-center">{rec.title}</MDBCardTitle>
                <MDBCardText style={{ color: '#555', fontSize: '1.1rem', lineHeight: '1.5' }}>
                  {rec.text}
                </MDBCardText>
              </MDBCardBody>
              <MDBCardFooter className="text-muted">
                {rec.footer}
              </MDBCardFooter>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
      <MDBRow className="justify-content-center mt-4">
        <MDBCol md="8" className="text-center">
          <MDBBtn onClick={handleDownloadReport} color="primary" size="lg" className="shadow-lg">
            <MDBIcon fas icon="download" className="me-2" /> Download Report
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

// Helper functions
const getWeightStatus = (weight, age) => {
  if (age === 5) {
    if (weight < 15) return 'underweight';
    if (weight > 25) return 'overweight';
    return 'within the normal range';
  }
  return 'unknown';
};

const getHeightStatus = (height, age) => {
  if (age === 5) {
    if (height < 100) return 'below average';
    if (height > 120) return 'above average';
    return 'within the normal range';
  }
  return 'unknown';
};

const getRecommendedScreenTime = (age) => {
  if (age === 5) return 1;
  return 0;
};

const analyzeAppsAndPlatforms = (apps, platforms) => {
  const recommendations = [];

  if (apps.includes('YouTube') || apps.includes('TikTok')) {
    recommendations.push({
      title: 'App Usage',
      text: `Your child is using apps like YouTube or TikTok, which may not be fully educational. Encourage more usage of apps like 'Educational Apps' or 'YouTube Kids' to promote learning.`,
      icon: 'mobile-alt',
      footer: 'Reviewed 2 weeks ago'
    });
  } else if (apps.includes('Educational Apps') || apps.includes('YouTube Kids')) {
    recommendations.push({
      title: 'App Usage',
      text: `Your child is using educational apps, which is great! Continue encouraging these, and explore more diverse learning apps to keep your child engaged.`,
      icon: 'graduation-cap',
      footer: 'Reviewed 1 month ago'
    });
  }

  if (platforms.includes('Computer')) {
    recommendations.push({
      title: 'Platform Usage',
      text: `Using a computer is excellent for engaging in complex tasks that require focus and problem-solving. Introduce educational software and coding games to further enhance cognitive development.`,
      icon: 'desktop',
      footer: 'Reviewed 2 weeks ago'
    });
  } else if (platforms.includes('Tablet')) {
    recommendations.push({
      title: 'Platform Usage',
      text: `Tablets are versatile but ensure that they are used for interactive and educational activities rather than passive consumption. Consider introducing computer usage for more structured learning.`,
      icon: 'tablet-alt',
      footer: 'Reviewed 2 weeks ago'
    });
  }

  if (platforms.includes('Mobile')) {
    recommendations.push({
      title: 'Mobile Usage',
      text: `Using mobile devices is common, but try to limit their usage in favor of larger screens like tablets or computers. This encourages longer, more educational sessions.`,
      icon: 'mobile-alt',
      footer: 'Reviewed 1 week ago'
    });
  }

  if (platforms.includes('TV')) {
    recommendations.push({
      title: 'TV Watching',
      text: `Balance TV watching with active, educational activities. Encourage content that involves participation rather than passive viewing.`,
      icon: 'tv',
      footer: 'Reviewed 3 weeks ago'
    });
  }

  return recommendations;
};

const getIntelligenceScoreMessage = (score, age) => {
  if (score > 90) {
    return `Your child's intelligence score is exceptionally high. Encourage continued learning and cognitive challenges to keep them engaged.`;
  } else if (score > 75) {
    return `Your child's intelligence score is above average. Keep up the good work, and introduce more advanced educational materials to stimulate their growth.`;
  } else if (score > 50) {
    return `Your child's intelligence score is average. Regular engagement with educational content, physical activities, and social interactions can help improve this score over time.`;
  } else {
    return `Your child's intelligence score is below average. It may be beneficial to seek guidance from educational professionals and focus on activities that can boost cognitive development.`;
  }
};

export default Improve;
