import { clsx, type ClassValue } from "clsx";
import { signInWithEmailAndPassword } from "firebase/auth";

import { getCalendar, getClients } from "./server-functions";

import { auth } from "@/config/firebase";
import { setProfile } from "@/redux/profile/profileReducer";
import { setLoadingFalse, setLoadingTrue } from "@/redux/loadingReducer";
import { setCalendar } from "@/redux/calendar/calendarReducer";
import { setClients } from "@/redux/clients/clientReducer";
import { AppDispatch } from "@/redux/store";
import { setToken } from "@/redux/token/tokenReducer";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
export function NameAbreviation(lastName: string, firstName: string) {
  const lastNameList = lastName.split(" ");
  const firstNameList = firstName.split(" ");
  const rsltLN = lastNameList
    .reduce((acc, current) => acc + current[0], "")
    .toUpperCase();
  const rsltFN = firstNameList
    .reduce((acc, current) => acc + current[0], "")
    .toUpperCase();
  const result = rsltLN + rsltFN;

  return result;
}

export const signIn = async (
  data: any,
  dispatch: AppDispatch,
  router: any
) => {
  dispatch(setLoadingTrue());

  try {
    const { email, password } = data;
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user: any = userCredential.user;
    dispatch(setToken({ token: user.accessToken }));
    dispatch(setProfile({ uid: user.uid }));
    const events = await getCalendar();
    const users = await getClients();
    dispatch(setCalendar(events));
    dispatch(setClients(users));
    router.replace("/calendar/week-view");
  } catch (error: any) {
    console.error("Firebase sign-in failed:", error);
    // DO NOT crash render
    alert(error?.message ?? "Login failed");
  } finally {
    dispatch(setLoadingFalse());
  }
};


export const getTemplateMail = ({ data }: any) => {
  return `
    <!DOCTYPE html>
      <html lang="fr">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title> ${data.edit ? `Rendez-vous Reporté` : `Confirmation de Rendez-vous`} </title>
          <style>
              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
              }
              
              body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  background-color: #f4f4f4;
                  padding: 20px;
              }
              
              .email-container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  border-radius: 10px;
                  overflow: hidden;
                  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
              }
              
              .header {
                  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                  padding: 30px;
                  text-align: center;
                  color: white;
              }
              
              .header h1 {
                  font-size: 24px;
                  margin-bottom: 10px;
              }
              
              .profile-section {
                  background-color: #f8f9fa;
                  padding: 30px;
                  text-align: center;
                  border-bottom: 3px solid #1e3c72;
              }
              
              .profile-image {
                  width: 150px;
                  height: 150px;
                  border-radius: 50%;
                  border: 5px solid #ffffff;
                  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                  margin-bottom: 20px;
              }
              
              .profile-name {
                  font-size: 22px;
                  font-weight: bold;
                  color: #1e3c72;
                  margin-bottom: 5px;
              }
              
              .profile-title {
                  font-size: 16px;
                  color: #666;
              }
              
              .content {
                  padding: 40px 30px;
              }
              
              .greeting {
                  font-size: 18px;
                  margin-bottom: 20px;
                  color: #333;
              }
              
              .appointment-box {
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  border-radius: 8px;
                  padding: 25px;
                  margin: 25px 0;
                  color: white;
              }
              
              .appointment-box h2 {
                  font-size: 20px;
                  margin-bottom: 20px;
                  text-align: center;
                  border-bottom: 2px solid rgba(255,255,255,0.3);
                  padding-bottom: 15px;
              }
              
              .detail-row {
                  display: flex;
                  align-items: center;
                  margin-bottom: 15px;
                  padding: 10px;
                  background-color: rgba(255,255,255,0.1);
                  border-radius: 5px;
              }
              
              .detail-row:last-child {
                  margin-bottom: 0;
              }
              
              .icon {
                  width: 24px;
                  height: 24px;
                  margin-right: 15px;
                  font-size: 20px;
              }
              
              .detail-label {
                  font-weight: bold;
                  margin-right: 10px;
                  min-width: 80px;
              }
              
              .detail-value {
                  flex: 1;
              }
              
              .message {
                  line-height: 1.8;
                  color: #555;
                  margin: 20px 0;
              }
              
              .qr-section {
                  text-align: center;
                  padding: 30px;
                  background-color: #f8f9fa;
                  margin-top: 30px;
                  border-radius: 8px;
              }
              
              .qr-section h3 {
                  color: #1e3c72;
                  margin-bottom: 15px;
                  font-size: 18px;
              }
              
              .qr-code {
                  width: 180px;
                  height: 180px;
                  margin: 15px auto;
                  padding: 15px;
                  background-color: white;
                  border-radius: 10px;
                  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              }
              
              .footer {
                  background-color: #1e3c72;
                  color: white;
                  text-align: center;
                  padding: 25px;
                  font-size: 14px;
              }
              
              .footer p {
                  margin: 5px 0;
              }
              
              .cta-button {
                  display: inline-block;
                  background-color: #28a745;
                  color: white;
                  padding: 12px 30px;
                  text-decoration: none;
                  border-radius: 5px;
                  margin: 20px 0;
                  font-weight: bold;
                  transition: background-color 0.3s;
              }
              
              .cta-button:hover {
                  background-color: #218838;
              }
              
              .divider {
                  height: 2px;
                  background: linear-gradient(to right, transparent, #1e3c72, transparent);
                  margin: 30px 0;
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              <!-- Header -->
              <div class="header">
                  <h1>📅 ${data.edit ? `Rendez-vous Reporté` : `Confirmation de Rendez-vous`}</h1>
                  <p>${data.edit ? `Votre consultation est reporté` : `Votre consultation est confirmée`}</p>
              </div>
              
              <!-- Profile Section -->
              <div class="profile-section">
                  <img src="https://res.cloudinary.com/dfukepvh3/image/upload/v1768218378/amine2_g9tuai.png" alt="Photo professionnelle" class="profile-image">
                  <div class="profile-name">Mohamed Amine LAZREG</div>
                  <div class="profile-title">Ingénieur Informatique / Développeur FullStack JS - Orienté FrontEnd</div>
              </div>
              
              <!-- Main Content -->
              <div class="content">
                  <div class="greeting">
                      Bonjour <strong>Mr/Mme ${data.client}</strong>,
                  </div>
                  
                  <p class="message">
                    ${data.edit ? `Nous vous informons que votre rendez-vous du [${data.ancienne_date}] a été reporté.` : `Nous avons le plaisir de confirmer votre rendez-vous. Nous nous réjouissons de vous rencontrer et de répondre à vos besoins.`}
                  </p>
                  
                  <!-- Appointment Details Box -->
                  <div class="appointment-box">
                      <h2>📋 Détails du Rendez-vous</h2>
                      
                      <div class="detail-row">
                          <span class="icon">📅</span>
                          <span class="detail-label">Date :</span>
                          <span class="detail-value">${data?.date}</span>
                      </div>
                      
                      <div class="detail-row">
                          <span class="icon">🕐</span>
                          <span class="detail-label">Heure de début:</span>
                          <span class="detail-value">${data?.startDate}</span>
                      </div>
                      
                      <div class="detail-row">
                          <span class="icon">⏱️</span>
                          <span class="detail-label">Durée :</span>
                          <span class="detail-value">1 heure</span>
                      </div>
                      
                      <div class="detail-row">
                          <span class="icon">📍</span>
                          <span class="detail-label">Lieu :</span>
                          <span class="detail-value">En ligne</span>
                      </div>
                      
                      <div class="detail-row">
                          <span class="icon">💼</span>
                          <span class="detail-label">Objet :</span>
                          <span class="detail-value">${data?.object}</span>
                      </div>
                  </div>
                  
                  <div class="divider"></div>
                  
                  <p class="message">
                      <strong>Informations importantes :</strong><br>
                      • Merci d'arriver 5 minutes avant l'heure prévue<br>
                      • N'oubliez pas d'apporter les documents nécessaires<br>
                      • En cas d'empêchement, merci de nous prévenir au moins 24h à l'avance
                  </p>
                  
                  <div style="text-align: center;">
                      <a href="${data.lienMeet}" class="cta-button">Accéder au lien Meet</a>
                  </div>
                  
                  <!-- QR Code Section -->
                  <div class="qr-section">
                      <h3>🔗 Découvrez mon Portfolio</h3>
                      <p style="color: #666; margin-bottom: 15px;">Scannez le QR code pour accéder à mes réalisations</p>
                      <div class="qr-code">
                          <img src="https://res.cloudinary.com/dfukepvh3/image/upload/v1768218356/MohamedAminePortfolio_li5bvp.png" alt="QR Code Portfolio" style="width: 100%; height: 100%;">
                      </div>
                      <p style="color: #888; font-size: 12px; margin-top: 10px;">
                          Ou Via ce lien : <a href="https://portfolio-rho-brown-aosm4qjgn0.vercel.app/" style="color: #1e3c72;">Portfolio Mohamed Amine LAZREG</a>
                      </p>
                  </div>
              </div>
              
              <!-- Footer -->
              <div class="footer">
                  <p><strong>Coordonnées de Contact</strong></p>
                  <p>📧 Email : amine.lazreg.dev@gmail.com</p>
                  <p>📱 Téléphone : +216 53 73 94 84</p>
                  <p style="margin-top: 15px; font-size: 12px; opacity: 0.8;">
                      © ${new Date().getFullYear()} - Tous droits réservés
                  </p>
              </div>
          </div>
      </body>
      </html>
  `;
};
