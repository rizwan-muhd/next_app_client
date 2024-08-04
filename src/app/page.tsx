import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
         <div>
      <h1>Login</h1>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
       
    </main>
  );
}
