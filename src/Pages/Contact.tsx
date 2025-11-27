import React, { useState } from "react";
import "./Contact.css";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});

  const validateForm = () => {
    const newErrors: Partial<ContactForm> = {};

    if (!form.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!form.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email inválido";
    }
    if (!form.subject.trim()) newErrors.subject = "Assunto é obrigatório";
    if (!form.message.trim()) newErrors.message = "Mensagem é obrigatória";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setShowSuccess(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    setIsSubmitting(false);

    setTimeout(() => setShowSuccess(false), 5000);
  };

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return (
    <div className="contact-page">
      <div className="main-container">
        <div className="contact-container">
          <div className="contact-header">
            <h1>Entre em Contato</h1>
            <p className="contact-subtitle">
              Tem alguma dúvida, sugestão ou quer compartilhar sua receita?
              Adoraríamos ouvir de você! Nossa equipe responde em até 24 horas.
            </p>
          </div>

          <div className="contact-content">
            <div className="contact-form-section">
              {showSuccess && (
                <div className="success-message">
                  <div className="success-icon">✅</div>
                  <div className="success-content">
                    <h3>Mensagem enviada com sucesso!</h3>
                    <p>Obrigado pelo seu contato. Responderemos em breve!</p>
                  </div>
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">
                      <span className="label-icon">👤</span>
                      Nome Completo
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Seu nome completo"
                      disabled={isSubmitting}
                      className={errors.name ? "error" : ""}
                    />
                    {errors.name && (
                      <span className="error-text">{errors.name}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      <span className="label-icon">📧</span>
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="seu@email.com"
                      disabled={isSubmitting}
                      className={errors.email ? "error" : ""}
                    />
                    {errors.email && (
                      <span className="error-text">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">
                    <span className="label-icon">🏷️</span>
                    Assunto
                  </label>
                  <select
                    id="subject"
                    value={form.subject}
                    onChange={(e) =>
                      handleInputChange("subject", e.target.value)
                    }
                    disabled={isSubmitting}
                    className={errors.subject ? "error" : ""}
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="duvida">Dúvida Geral</option>
                    <option value="receita">Compartilhar Receita</option>
                    <option value="sugestao">Sugestão</option>
                    <option value="problema">Reportar Problema</option>
                    <option value="parceria">Parceria</option>
                    <option value="outro">Outro</option>
                  </select>
                  {errors.subject && (
                    <span className="error-text">{errors.subject}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    <span className="label-icon">💬</span>
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    placeholder="Escreva sua mensagem aqui... (mínimo 10 caracteres)"
                    disabled={isSubmitting}
                    maxLength={1000}
                    rows={6}
                    className={errors.message ? "error" : ""}
                  />
                  <div className="textarea-footer">
                    {errors.message && (
                      <span className="error-text">{errors.message}</span>
                    )}
                    <span className="char-count">
                      {form.message.length}/1000
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading-spinner"></span>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <span className="button-icon">📤</span>
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="contact-info-section">
              <h2>Outras Formas de Contato</h2>

              <div className="contact-cards">
                <div className="contact-card">
                  <div className="card-icon">📍</div>
                  <h3>Localização</h3>
                  <p>
                    Teresina, PI
                    <br />
                    Brasil
                  </p>
                  <span className="card-detail">
                    Atendimento presencial com agendamento
                  </span>
                </div>

                <div className="contact-card">
                  <div className="card-icon">📞</div>
                  <h3>Telefone</h3>
                  <p>(11) 99999-9999</p>
                  <span className="card-detail">
                    Segunda a Sexta, 9h às 18h
                  </span>
                </div>

                <div className="contact-card">
                  <div className="card-icon">💬</div>
                  <h3>WhatsApp</h3>
                  <p>(11) 88888-8888</p>
                  <span className="card-detail">
                    Resposta rápida em horário comercial
                  </span>
                </div>

                <div className="contact-card">
                  <div className="card-icon">📧</div>
                  <h3>Email Direto</h3>
                  <p>contato@receitas.com</p>
                  <span className="card-detail">Resposta em até 24 horas</span>
                </div>
              </div>

              <div className="social-section">
                <h3>Siga-nos nas Redes Sociais</h3>
                <div className="social-links">
                  <a href="#" className="social-link instagram">
                    <span className="social-icon">📷</span>
                    Instagram
                  </a>
                  <a href="#" className="social-link facebook">
                    <span className="social-icon">👥</span>
                    Facebook
                  </a>
                  <a href="#" className="social-link youtube">
                    <span className="social-icon">📺</span>
                    YouTube
                  </a>
                  <a href="#" className="social-link twitter">
                    <span className="social-icon">🐦</span>
                    Twitter
                  </a>
                </div>
              </div>

              <div className="faq-section">
                <h3>Perguntas Frequentes</h3>
                <div className="faq-item">
                  <h4>Como posso compartilhar minha receita?</h4>
                  <p>
                    Use o formulário acima selecionando "Compartilhar Receita"
                    ou acesse diretamente a seção de receitas.
                  </p>
                </div>
                <div className="faq-item">
                  <h4>Vocês respondem todos os contatos?</h4>
                  <p>
                    Sim! Respondemos 100% dos contatos em até 24 horas úteis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
