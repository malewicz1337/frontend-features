import { useEffect, useRef, useState, FunctionComponent } from "react";
import postData from "../api/postData";
import styles from "./StepBar.module.css";

interface FormData {
  [key: string]: unknown;
}

interface StepConfig {
  name: string;
  Component: FunctionComponent<{ updateFormData: (newData: Partial<FormData>) => void; formData: FormData }>;
}

interface CheckoutStepBarProps {
  stepsConfig: StepConfig[];
}

const CheckoutStepper = ({ stepsConfig = [] }: CheckoutStepBarProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [formData, setFormData] = useState({});
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (stepRef.current[0] && stepRef.current[stepsConfig.length - 1]) {
      const newMargins = {
        marginLeft: stepRef.current[0].offsetWidth / 2,
        marginRight: stepRef.current[stepsConfig.length - 1].offsetWidth / 2,
      };
      // console.log("New Margins:", newMargins);
      setMargins(newMargins);
    }
  }, [stepRef, stepsConfig.length]);

  if (!stepsConfig.length) {
    return <></>;
  }

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      const nextStep = prevStep + 1;
      if (nextStep > stepsConfig.length) {
        setIsComplete(true);
        postData(formData);
      }
      return nextStep;
    });
  };

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData({ ...formData, ...newData });
  };

  const calculateProgressBarWidth = () => {
    const width = ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
    // console.log("ProgressBar Width:", width);
    return width;
  };

  const ActiveComponent = stepsConfig[currentStep - 1]?.Component || (() => <div>No component available</div>);

  return (
    <article className={styles.container}>
      <div className={styles.stepBar}>
        {stepsConfig.map((step, index) => {
          return (
            <div
              key={step.name}
              ref={(el: HTMLDivElement) => (stepRef.current[index] = el)}
              className={`step ${currentStep > index + 1 || isComplete ? styles.complete : ""} ${
                currentStep === index + 1 ? styles.active : ""
              }`}
            >
              <div className={styles.stepNumber}>
                {currentStep > index + 1 || isComplete ? <span>&#10003;</span> : index + 1}
              </div>
              <div className={styles.stepName}>{step.name}</div>
            </div>
          );
        })}

        <div
          className={styles.progressBar}
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div className={styles.progress} style={{ width: `${calculateProgressBarWidth()}%` }}></div>
        </div>
      </div>

      <section className={styles.formsContainer}>
        {stepsConfig[currentStep - 1] && <ActiveComponent updateFormData={updateFormData} formData={formData} />}
        {!isComplete && (
          <button className={styles.btn} onClick={handleNext}>
            {currentStep === stepsConfig.length ? "Finish" : "Next"}
          </button>
        )}
      </section>
    </article>
  );
};

export default CheckoutStepper;
