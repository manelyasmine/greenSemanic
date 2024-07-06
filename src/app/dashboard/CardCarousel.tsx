import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { CarbonPerMonth } from '@/components/dashboard/overview/CarbonPerMonth';
import { TotalEmissions } from '@/components/dashboard/overview/TotalEmissions';
import { Reduction } from '@/components/dashboard/overview/Reduction';
import { FirstTarget } from '@/components/dashboard/overview/FirstTarget';

function CardCarousel({ CarbonPerMonthCard, emissionPerMonthCard, reduction, firstTarget }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const displayedCards = cards.slice(currentIndex, currentIndex + 3);

  return (
    <div>
      <Grid container spacing={2}>
        {displayedCards.map((card, index) => (
          <Grid key={index} item lg={4} sm={6} xs={12}>
            {card}
          </Grid>
        ))}
      </Grid>
      <button disabled={currentIndex === 0} onClick={handlePrevious}>
        Previous
      </button>
      <button disabled={currentIndex === cards.length - 3} onClick={handleNext}>
        Next
      </button>
    </div>
  );
}

export default CardCarousel;
