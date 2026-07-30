import { useState, useEffect, useRef } from "react";
import { useResponsive } from "../../hooks/useResponsive";

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export default function ContactForm() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const responsive = useResponsive();
  const [error, setError] = useState(null);
  const errorTimerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const showError = (msg) => {
    clearTimeout(errorTimerRef.current);
    setError(msg);
    errorTimerRef.current = setTimeout(() => setError(null), 2000);
  };

  useEffect(() => () => clearTimeout(errorTimerRef.current), []);

  const validate = () => {
    const { name, email, phone, message } = formData;
    if (!name.trim()) return "Prašome įvesti vardą.";
    if (!email.trim()) return "Prašome įvesti el. paštą.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Neteisingas el. pašto formatas.";
    if (!phone.trim()) return "Prašome įvesti telefono numerį.";
    if (!/^(\+370|0)\d{8}$/.test(phone.trim()))
      return "Neteisingas telefono numerio formatas.";
    if (!message.trim()) return "Prašome parašyti žinutę.";
    return null;
  };

  const handleSend = async () => {
    if (cooldown) return;
    const validationError = validate();
    if (validationError) {
      showError(validationError);
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          botcheck: "",
          ratelimit: 1,
        }),
      });

      const result = await response.json();

      console.log(result);

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Klaida siunčiant žinutę.");
      }

      setIsFlipped(true);
      setCooldown(true);
      setTimeout(() => {
        setIsFlipped(false);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setCooldown(false);
      }, 60000);
    } catch (err) {
      showError(err.message || "Klaida siunčiant žinutę. Bandykite dar kartą.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      className="relative w-full lg:w-3/4 h-full"
      style={{ perspective: "1000px" }}
    >
      <div
        className="h-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front Side - Form */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="relative flex flex-col gap-2 lg:gap-4 w-full">
            <h2 className="text-md lg:text-2xl font-thin tracking-[0.3em] text-center mb-0 lg:mb-2 text-header">
              Parašyk man
            </h2>

            <div className="input-container">
              <input
                className="p-1 md:pt-2 border-b border-white/10 text-muted text-[14px] lg:text-[20px]"
                id="input"
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              <label
                htmlFor="input"
                className="label text-[12px] lg:text-[18px]"
              >
                Vardas
              </label>
              <div className="underline"></div>
            </div>

            <div className="input-container mb-1">
              <input
                className="p-1 md:pt-2 border-b border-white/10 text-muted text-[14px] lg:text-[20px]"
                id="input"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              <label
                htmlFor="input"
                className="label text-[12px] lg:text-[18px]"
              >
                El.paštas
              </label>
              <div className="underline"></div>
            </div>

            <div className="input-container mb-1">
              <input
                className="p-1 md:pt-2 border-b border-white/10 text-muted text-[14px] lg:text-[20px]"
                id="input"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
              <label
                htmlFor="input"
                className="label text-[12px] lg:text-[18px]"
              >
                Telefonas
              </label>
              <div className="underline"></div>
            </div>

            <div className="textarea-container mt-3">
              <textarea
                className="p-1 md:pt-2 border-b border-white/10 text-muted text-[14px] lg:text-[20px] resize-none"
                id="textarea-message"
                type="text"
                required
                rows={responsive.isShortScreen ? "1" : "2"}
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
              />
              <label
                htmlFor="textarea-message"
                className="label text-[12px] lg:text-[18px]"
              >
                Tavo Žinutė
              </label>
              <div className="underline"></div>
            </div>

            {error && (
              <p className="absolute bottom-12 left-0 right-0 text-red-400 text-sm text-center tracking-wide">
                {error}
              </p>
            )}

            <button
              className="cta-btn mt-2 lg:mt-4 border border-border text-text font-bold flex items-center justify-center py-2 md:py-4 hover:text-accent transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed mix-blend-difference"
              type="button"
              onClick={handleSend}
              disabled={isLoading || cooldown}
            >
              {isLoading
                ? "Siunčiama..."
                : cooldown
                  ? "Palaukite prieš siunčiant vėl."
                  : "Siusk žinutę"}
            </button>
          </div>
        </div>

        {/* Back Side - Success Message */}
        <div
          className="absolute inset-0 text-text flex flex-col items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <h2 className="text-md lg:text-2xl font-thin tracking-[0.3em] text-center lg:mb-2 text-header">
            Pranešimas išsiųstas
          </h2>
          <p className="text-md sm:text-xl opacity-60 font-thin tracking-[0.3em]">
            Ačiū! Netrukus susisieksime.
          </p>
        </div>
      </div>
    </div>
  );
}
