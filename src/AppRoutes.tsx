import Navbar from "components/Navbar";
import RedirectAuth from "components/RedirectAuth";
import RequireAuth from "components/RequireAuth";
import RequireBeta from "components/RequireBeta";
import Error404 from "pages/404";
import CardDetail from "pages/CardDetail";
import CardGeneration from "pages/CardGeneration";
import ContentDetail from "pages/ContentDetail";
import DeckDetail from "pages/DeckDetail/DeckDetail";
import EditDeck from "pages/EditDeck";
import GPT3Explanation from "pages/GP3Explanation";
import Home from "pages/Home";
import Imprint from "pages/Imprint";
import Learning from "pages/Learning";
import Login from "pages/Login";
import Logout from "pages/Logout";
import NewCard from "pages/NewCard";
import NewDeck from "pages/NewDeck";
import Privacy from "pages/Privacy";
import Settings from "pages/Settings";
import SignUp from "pages/SignUp";
import TOS from "pages/TOS";
import VerifyEmail from "pages/VerifyEmail";
import VerifyingEmail from "pages/VerifyingEmail";
import { Outlet, Route, Routes } from "react-router-dom";

const Layout = () => {
	return (
		<div className="layout">
			<Navbar />
			<Outlet />
		</div>
	);
};

const AppRoutes = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<RequireAuth>
						<Home />
					</RequireAuth>
				}
			/>
			<Route
				path="/ai"
				element={
					<RequireAuth>
						<GPT3Explanation />
					</RequireAuth>
				}
			/>
			<Route
				path="/decks/:deckID"
				element={
					<RequireAuth>
						<DeckDetail />
					</RequireAuth>
				}
			/>
			<Route
				path="/cards/generate"
				element={
					<RequireAuth>
						<RequireBeta>
							<CardGeneration />
						</RequireBeta>
					</RequireAuth>
				}
			/>
			<Route
				path="/deck/new"
				element={
					<RequireAuth>
						<NewDeck />
					</RequireAuth>
				}
			/>
			<Route
				path="/decks/:deckID/edit"
				element={
					<RequireAuth>
						<EditDeck />
					</RequireAuth>
				}
			/>
			<Route
				path="/decks/:deckID/card/new"
				element={
					<RequireAuth>
						<NewCard />
					</RequireAuth>
				}
			/>
			<Route
				path="/decks/:deckID/cards/:cardID"
				element={
					<RequireAuth>
						<CardDetail />
					</RequireAuth>
				}
			/>
			<Route
				path="/learn/:deckID"
				element={
					<RequireAuth>
						<Learning />
					</RequireAuth>
				}
			/>
			<Route
				path="/content/:contentID"
				element={
					<RequireAuth>
						<ContentDetail />
					</RequireAuth>
				}
			></Route>
			<Route
				path="verify-email"
				element={
					<RequireAuth needsEmailVerification={false}>
						<VerifyEmail />
					</RequireAuth>
				}
			/>
			<Route
				path="verifying"
				element={
					<RequireAuth needsEmailVerification={false}>
						<VerifyingEmail />
					</RequireAuth>
				}
			/>
			<Route
				path="settings"
				element={
					<RequireAuth needsEmailVerification={false}>
						<Settings />
					</RequireAuth>
				}
			/>

			<Route path="/" element={<Layout />}>
				<Route
					path="/logout"
					element={
						<RequireAuth needsEmailVerification={false}>
							<Logout />
						</RequireAuth>
					}
				/>
				<Route
					path="login"
					element={
						<RedirectAuth>
							<Login />
						</RedirectAuth>
					}
				/>
				<Route
					path="signup"
					element={
						<RedirectAuth>
							<SignUp />
						</RedirectAuth>
					}
				/>
				<Route path="imprint" element={<Imprint />} />
				<Route path="tos" element={<TOS />} />
				<Route path="privacy" element={<Privacy />} />
			</Route>
			<Route path="*" element={<Error404 />} />
		</Routes>
	);
};

export default AppRoutes;
