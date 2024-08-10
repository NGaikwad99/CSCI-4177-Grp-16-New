import React from 'react';
import './Settings.css';

function Settings() {
  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <h2>Legal Policies</h2>
      <p>Welcome to Safe Space! These legal policies are intended to help you understand our practices and your rights when using our application. By using Safe Space, you agree to the following policies:</p>

      <h3>1. Privacy Policy</h3>
      <p>
        Your privacy is important to us. We are committed to protecting your personal information and ensuring that your experience with Safe Space is safe and secure. Our Privacy Policy outlines how we collect, use, and protect your data.
      </p>
      <ul>
        <li>We only collect information that is necessary to provide our services.</li>
        <li>Your data is stored securely and is only accessible by authorized personnel.</li>
        <li>We do not share your personal information with third parties without your consent, except as required by law.</li>
      </ul>

      <h3>2. Terms of Service</h3>
      <p>
        By using Safe Space, you agree to comply with our Terms of Service. These terms outline your responsibilities and the rules you must follow when using our application.
      </p>
      <ul>
        <li>You must provide accurate information when registering and using our services.</li>
        <li>You are responsible for maintaining the confidentiality of your account information.</li>
        <li>You agree not to use Safe Space for any unlawful or prohibited activities.</li>
      </ul>

      <h3>3. User Content</h3>
      <p>
        You retain ownership of the content you create and share on Safe Space. However, by posting content on our platform, you grant us a license to use, display, and distribute your content as necessary to provide our services.
      </p>
      <ul>
        <li>We reserve the right to remove any content that violates our policies or is deemed inappropriate.</li>
        <li>You are responsible for the content you post and must ensure that it does not infringe on the rights of others.</li>
      </ul>

      <h3>4. Security</h3>
      <p>
        We take security seriously and have implemented measures to protect your data. However, no system is completely secure, and we cannot guarantee the absolute security of your information.
      </p>
      <ul>
        <li>Your passwords are stored securely using hashing and salting techniques.</li>
        <li>We regularly review and update our security practices to ensure the safety of your information.</li>
      </ul>

      <h3>5. Changes to Policies</h3>
      <p>
        We may update these policies from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes and provide you with an updated version of our policies.
      </p>

      <h3>6. Contact Us</h3>
      <p>
        If you have any questions or concerns about these policies or your rights under them, please visit our <a href="/ContactUs">Contact Us</a> page.
      </p>
    </div>
  );
}

export default Settings;