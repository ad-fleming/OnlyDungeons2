import "./App.css";
import { useState, useEffect, useContext } from "react";
import UserContext from "./context/UserContext";
import Navbar from "./components/Navbar/Navbar";
import SigninPage from "./containers/SigninPage/SigninPage";
import NewUser1 from "./containers/NewUser1/NewUser1";
import Team from "./containers/Team/Team";
import DmDirectory from "./containers/DmDirectory/DmDirectory";
import DmOne from "./containers/DmOne/DmOne";
import UpdateForm from "./containers/UpdateForm/UpdateForm";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import "materialize-css";
import { setAxiosDefaults } from "./utils/axiosDefaults";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SpellContext from "./context/Spellcontext";
import MonsterContext from "./context/MonsterContext";
import ClassTypeContext from "./context/ClassTypeContext";
import WpnContext from "./context/WpnContext";
import ArmorContext from "./context/ArmorContext";
import RaceContext from "./context/RaceContext";
import API from "./utils/API";
import Spells from "./components/Spellbook/Spells/Spells";
import MonsterBook from "./components/Spellbook/Monsters/Monsters";
import RaceBook from "./components/Spellbook/Race/Race";
import ClassesBook from "./components/Spellbook/ClassType/ClassType";
import WpnBook from "./components/Spellbook/Weapon/Weapons";
import ArmorBook from "./components/Spellbook/Armor/Armor";
import MainBook from "./containers/BookPage/BookPage";

function App() {
  const [jwt, setJwt] = useState();
  const [userId, setUserId] = useState("");

  const [spells, setSpells] = useState();
  const [monsters, setMonsters] = useState();
  const [ClassTypeState, setClassTypeState] = useState();
  const [wpnState, setwpnState] = useState([]);
  const [armorState, setArmorState] = useState();
  const [races, setRaces] = useState();

  useEffect(() => {
    const localJwt = localStorage.getItem("jwt");
    if (localJwt) {
      setJwt(localJwt);
    }
  }, []);

  useEffect(() => {
    // API call to get spells
    API.getSpells().then((res) => {
      // console.log(res.data)
      let spellArray = res.data;
      setSpells(spellArray);
    });
    // API call to get monsters
    API.getMonsters().then((res) => {
      // console.log(res.data.data.results)
      let monsterArray = res.data.data.results;
      setMonsters(monsterArray);
    });
    //API call to get Classes
    API.getClass().then((res) => {
      let classArray = res.data.data.results;
      setClassTypeState(classArray);
    });
    // API call to get Weapons
    API.getWpn().then((res) => {
      let wpnArray = res.data.data.results;
      setwpnState(wpnArray);
    });

    API.getArmor().then((res) => {
      let armorArray = res.data.data.results;
      setArmorState(armorArray);
    });

    API.getRace().then((res) => {
      let raceArray = res.data.data.results;
      setRaces(raceArray);
    });
  }, []);

  useEffect(() => {
    if (jwt) {
      setAxiosDefaults(jwt);
      localStorage.setItem("jwt", jwt);
    }
  }, [jwt]);

  return (
    <div className="App">
      <UserContext.Provider value={{ userId, setUserId }}>
        <Router>
          <AuthContext.Provider value={{ jwt, setJwt }}>
            <SpellContext.Provider value={{ spells, setSpells }}>
              <MonsterContext.Provider value={{ monsters, setMonsters }}>
                <ClassTypeContext.Provider
                  value={{ ClassTypeState, setClassTypeState }}
                >
                  <WpnContext.Provider value={{ wpnState, setwpnState }}>
                    <ArmorContext.Provider
                      value={{ armorState, setArmorState }}
                    >
                      <RaceContext.Provider value={{ races, setRaces }}>
                        <Navbar />
                        <Switch>
                          {/* <Route
                exact
                path="/"
                render={() => <SigninPage user={user} setUser={setUser} />}
              /> */}
                          <Route exact path="/NewUser" component={NewUser1} />
                          {/*<Route
                exact
                path="/DmDirectory"
                render={() => <DmDirectory user={user} />}
              /> */}
                          <Route
                            exact
                            path="/DmDirectory"
                            component={DmDirectory}
                          />

                          <Route exact path="/DmOne/:id" component={DmOne} />
                          <ProtectedRoute
                            exact
                            path="/UpdateForm/:id"
                            component={UpdateForm}
                          />
                          <Route exact path="/Team" component={Team} />
                          <Route exact path="/spellpage" component={Spells} />
                          <Route
                            exact
                            path="/monsterpage"
                            component={MonsterBook}
                          />
                          <Route exact path="/racepage" component={RaceBook} />
                          <Route
                            exact
                            path="/classespage"
                            component={ClassesBook}
                          />
                          <Route exact path="/wpnpage" component={WpnBook} />
                          <Route
                            exact
                            path="/armorpage"
                            component={ArmorBook}
                          />
                          <Route exact path="/Book" component={MainBook} />
                          <Route path="/" component={SigninPage} />
                        </Switch>
                      </RaceContext.Provider>
                    </ArmorContext.Provider>
                  </WpnContext.Provider>
                </ClassTypeContext.Provider>
              </MonsterContext.Provider>
            </SpellContext.Provider>
          </AuthContext.Provider>
          <Footer />
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;

