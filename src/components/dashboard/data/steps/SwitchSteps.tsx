import React from 'react';

import ExportStepOne from './ExportStepOne';
import ExportStepTwo from './ExportStepTwo';
import ExportStepThree from './ExportStepThree';
import ExportStepFour from './ExportStepFour';

interface SwitchStepsProps {
  currentStep: number;
}
export default function SwitchSteps({ currentStep }: SwitchStepsProps) {
  switch (currentStep) {
    case 0:
      return <ExportStepOne />;
    case 1:
      return <ExportStepTwo />;
    case 2:
      return <ExportStepThree />;
    case 3:
      return <ExportStepFour />;
  }
}
