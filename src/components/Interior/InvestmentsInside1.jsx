import React, { useEffect, useRef, useState } from "react";
import AnimatedBackground from "../Background/AnimatedBackground";
import Header from "../Header";
import Footer from "../Footer";
import { InvestmentCard } from "../helpers/InvestmentCard";
import LeadConnectorWidget from "../../Form/LeadConnectorWidget";

// ✅ Validación + envío + toasts
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import emailjs from "@emailjs/browser"; // npm i @emailjs/browser
import { useTranslation } from "react-i18next";

/* -------------------- DATA -------------------- */
const items_left = [
  {
    title: "Punta Gorda Select",
    asset_type: "Single family home",
    construction_term: "9 meses después de permisos",
    investor_profile: "Inversor doméstico / internacional",
    className: "w-fit -translate-y-[20%]",
  },
  {
    title: "Punta Gorda Premium",
    asset_type: "Single family home",
    construction_term: "9 meses después de permisos",
    investor_profile: "Inversor doméstico / internacional",
    className: "w-fit translate-y-[35%]",
  },
];

const items_right = [
  {
    title: "Miami Premium ",
    asset_type: "Single family home (6000 sqft)",
    construction_term: "12 meses después de permisos",
    investor_profile: "Inversor doméstico / internacional",
    className: "w-fit -translate-y-[20%]",
  },
  {
    title: "Miami Lux",
    asset_type: "Single family home (7000 sqft)",
    construction_term: "12 meses después de permisos",
    investor_profile: "Inversor doméstico / internacional",
    className: "w-fit translate-y-[35%]",
  },
];

function InvestmentDialog({ open, onClose, investmentTitle }) {
  const panelRef = useRef(null);
  const { t } = useTranslation();

  /* -------------------- Dialog con Zod + RHF + EmailJS -------------------- */
  const dialogSchema = z.object({
    name: z
      .string()
      .min(2, t("investments_inside.form.validation.name"))
      .max(80, "Nombre demasiado largo"),
    email: z
      .string()
      .email(t("investments_inside.form.validation.email.invalid"))
      .min(3, t("investments_inside.form.validation.email.required")),
    phone: z
      .string()
      .regex(
        /^[0-9+()\-\s]{7,20}$/,
        t("investments_inside.form.validation.phone")
      ),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(dialogSchema),
    defaultValues: { name: "", email: "", phone: "" },
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  const onSubmit = async (data) => {
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_INVESTMENTS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("Faltan variables de entorno de EmailJS");
      }

      const templateParams = {
        from_name: data.name,
        reply_to: data.email,
        phone: data.phone,
        investment_title: investmentTitle,
        source: "investments_inside1_dialog",
      };

      const res = await emailjs.send(serviceId, templateId, templateParams, {
        publicKey,
      });

      if (res?.status === 200) {
        toast.success("Enviado", {
          description: "Gracias, te contactaremos pronto.",
        });
        onClose?.();
        reset();
      } else {
        throw new Error("Respuesta no OK de EmailJS");
      }
    } catch (err) {
      toast.error("No se pudo enviar", {
        description: "Revisa la conexión o configuración e inténtalo de nuevo.",
      });
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] grid place-items-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="investment-dialog-title"
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-[92vw] max-w-[520px] bg-primary text-secondary p-6 sm:p-8 shadow-2xl rounded-none"
      >
        {/* Cerrar */}
        <button
          aria-label="Cerrar"
          onClick={onClose}
          className="absolute top-3 right-3 h-8 w-8 grid place-items-center text-secondary/80 hover:text-secondary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-secondary"
            aria-hidden="true"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <h3
          id="investment-dialog-title"
          className="text-2xl font-semibold tracking-tight"
        >
          {t("investments_inside.form.title")}
        </h3>
        <p className="mt-1 text-sm opacity-80">
          {t("investments_inside.form.subtitle")}
          <span className="font-medium">{investmentTitle}</span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          {/* Nombre */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-xs uppercase tracking-wide opacity-80"
            >
              {t("investments_inside.form.name")}
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="w-full bg-transparent text-secondary p-3 border border-secondary/40 focus:border-secondary outline-none rounded-none"
              placeholder={t("investments_inside.form.name_placeholder")}
              autoFocus
            />
            {errors.name && (
              <span className="text-rose-400 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-xs uppercase tracking-wide opacity-80"
            >
              {t("investments_inside.form.mail")}
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="w-full bg-transparent text-secondary p-3 border border-secondary/40 focus:border-secondary outline-none rounded-none"
              placeholder={t("investments_inside.form.mail_placeholder")}
            />
            {errors.email && (
              <span className="text-rose-400 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="phone"
              className="text-xs uppercase tracking-wide opacity-80"
            >
              {t("investments_inside.form.phone")}
            </label>
            <input
              id="phone"
              type="tel"
              {...register("phone")}
              className="w-full bg-transparent text-secondary p-3 border border-secondary/40 focus:border-secondary outline-none rounded-none"
              placeholder={t("investments_inside.form.phone_placeholder")}
            />
            {errors.phone && (
              <span className="text-rose-400 text-xs">
                {errors.phone.message}
              </span>
            )}
          </div>

          {/* Botón */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-3 bg-[#1E1F20] rounded-full text-primary ring-1 ring-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] hover:bg-secondary/20 hover:text-secondary transition-colors duration-200 disabled:opacity-60"
            >
              {isSubmitting
                ? t("investments_inside.form.button_sending")
                : t("investments_inside.form.button")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* -------------------- Principal -------------------- */
const InvestmentsInside1 = () => {
  const [open, setOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const { t } = useTranslation();
  const handleOpen = (title) => {
    setSelectedTitle(title);
    setOpen(true);
  };

  return (
    <section className="min-h-screen h-auto w-full relative z-20 pt-32 bg-primary ">
      <div className="absolute inset-0 -z-10 bg-black/80" />
      <AnimatedBackground />
      <Header className={"is-clear"} />

      <div className="flex gap-2 lg:scale-75 xl:scale-100 justify-center items-center h-[80vh]">
        <div className="flex flex-col ">
          {items_left.map((card, i) => {
            return (
              <InvestmentCard
                key={`left-${i}`}
                title={card.title}
                className={card.className}
                asset_type={t(
                  `investments_inside.card.content.${i + 1}.active`
                )}
                construction_term={t(
                  `investments_inside.card.content.${i + 1}.time`
                )}
                investor_profile={t(
                  `investments_inside.card.content.${i + 1}.profile`
                )}
                onAction={() => handleOpen(card.title)}
              />
            );
          })}
        </div>

        <img
          className="h-full object-contain"
          src="/assets/investments/investment_map1.png"
          alt="investment map"
        />

        <div className="flex flex-col ">
          {items_right.map((card, i) => {
            return (
              <InvestmentCard
                key={`right-${i}`}
                title={card.title}
                className={card.className}
                asset_type={t(
                  `investments_inside.card.content.${i + 3}.active`
                )}
                construction_term={t(
                  `investments_inside.card.content.${i + 3}.time`
                )}
                investor_profile={t(
                  `investments_inside.card.content.${i + 3}.profile`
                )}
                onAction={() => handleOpen(card.title)}
              />
            );
          })}
        </div>
      </div>

      <LeadConnectorWidget className="scale-90 pt-16 " />

      {/* Footer + gradiente inferior */}
      <div className="absolute lg:sticky bottom-0 left-0 w-full">
        <Footer className="text-primary px-8" />
        <div className="bottom-0 left-0 w-full h-[10vh] lg:h-[15vh] pointer-events-none bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Dialog */}
      <InvestmentDialog
        open={open}
        onClose={() => setOpen(false)}
        investmentTitle={selectedTitle}
      />
    </section>
  );
};

export default InvestmentsInside1;
