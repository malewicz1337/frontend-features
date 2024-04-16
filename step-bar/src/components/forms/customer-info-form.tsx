import styles from "./Forms.module.css";

export interface FormData {
  name?: string;
  email?: string;
}

export interface CustomerInfoProps {
  formData: FormData;
  updateFormData: (newData: Partial<FormData>) => void;
}

const CustomerInfo = ({ updateFormData, formData }: CustomerInfoProps) => (
  <section className={styles.container}>
    <h2 className={styles.h2}>Customer Info</h2>
    <form>
      <label className={styles.formLabel}>
        Name:
        <input
          className={styles.input}
          type="text"
          value={formData.name || ""}
          onChange={(e) => updateFormData({ name: e.target.value })}
        />
      </label>
      <label className={styles.formLabel}>
        Email:
        <input
          className={styles.input}
          type="email"
          value={formData.email || ""}
          onChange={(e) => updateFormData({ email: e.target.value })}
        />
      </label>
    </form>
  </section>
);

export default CustomerInfo;
