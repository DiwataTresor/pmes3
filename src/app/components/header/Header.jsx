"use client";
import React, { useEffect, useState } from "react"
import logo4 from "@/assets/logo4.png";
import Menu from "./Menu";
import Image from "next/image";
import Link from "next/link";
import { inter, michroma, nunito } from "../../style/fonts";
import {
  bgPrimary,
} from "@/app/style/global";
import Sticky from "react-sticky-el";
import { API_URL } from "@/app/fcts/helper"
import { useRouter } from 'next/navigation'
import { getSecteurs, getProvinces } from "@/app/utils/data"
import { postData, getData } from "@/app/fcts/helper"
import "@szhsin/react-menu/dist/index.css";

import { oldUrl, telephone, email } from "@/app/utils/helper";
import {
  Badge,
  Button,
  Select,
  SelectItem,
  Input,
  Divider,
  Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem
} from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem, DropdownSection } from "@nextui-org/react";
import { myContainer, titrePrincipal } from "@/app/style/global";
import { MailIcon } from "@/app/components/icons/MailIcon"
import { LockIcon } from "@/app/components/icons/LockIcon"
import { Modal as ModalAnt, notification, Alert } from "antd"
import moment from "moment"
import Cookies from "js-cookie";

const Header = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [msgNL, setMsgNL] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [api, contextHolder] = notification.useNotification();
  const [feedBack, setFeedBack] = React.useState("");
  const [secteurs, setSecteurs] = React.useState([]);
  const [provinces, setProvinces] = React.useState([]);
  const [profil,setProfil] = useState(Cookies.get("profil") || null);
  const [connected,setConnected]=useState(Cookies.get("connected") || null);
  const [visiteSite,setVisiteSite]=useState("visiteSite","");
  const [store,setStore]=useState({
    connected: connected,
    profil:profil
  });
  const inputStyle =
    "border border-gray-100 rounded-sm h-[35px] py-1 min-w-[280px] px-3";
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setFeedBack("");
    setIsLoading(true);
    let data = Object.fromEntries(new FormData(e.target));

    let form = new FormData();
    form.append("action", "login");
    form.append("data", JSON.stringify(data));
    fetch(API_URL, { method: "POST", body: form }).then(r => r.json())
      .then(r => {
        if (r.success) {
          setFeedBack(<Alert message="Connexion bien établie" type="success" showIcon />)
          api.success({
            message: "Authentification",
            description: "Connexion bien établie"
          });
         
          Cookies.set('connected',"true");
          Cookies.set('profil',JSON.stringify(r.profil));
          router.push('/account/dashboard', { scroll: false });
          window.location.reload();

        } else {
          setFeedBack(<Alert message="utilisateur non reconnu" type="error" showIcon />);
          // api.danger({
          //   message: `Authentification`,
          //   description:"Utilisateur non reconnu",
          //   duration:3
          // });
        }

      }).catch(e => {
        api.warning({
          message: `Authentification`,
          description: "Impossible de se connecter pour le moment",
          duration: 3
        });
      }).finally(() => {
        setIsLoading(false);
      })
  }
  const handleSearch = (e) => {
    e.preventDefault();
    let formulaire = Object.fromEntries(new FormData(e.target));
    window.location.href = `/search?q=${formulaire.terme}&lieu=${formulaire.lieu}&secteur=${formulaire.secteur}`;
  }

  useEffect(() => {
   
    getSecteurs().then(r => { setSecteurs(r.data) });
    getProvinces().then(r => { setProvinces(r.data) });
    
  }, []);

  const getMessage=()=>{

    setTimeout(() =>{
      if (connected === "true") {
        setStore({...store, connected:"true"})
        let _profil = JSON.parse(profil);
        getData("messageUser&id=" + _profil?.id)
          .then(r => {
            setMsgNL(r?.msgRecus?.filter((m) => { return m.statut == 'NL' })?.length)
          }).catch(err => console.log(err));
      }
    },3000)
  }
  useEffect(() => {
    getMessage();
  },[connected])

  // Pour visiteur du site
  useEffect(() => {
    if (visiteSite!=="") {
      if (setVisiteSite("visiteSite") !== moment().format("YYYY-MM-DD")) {
        setVisiteSite(`${moment().format("YYYY-MM-DD")}`);
        postData("visiteSite").then(r => {

        }).catch(r => {

        })
      }
    } else {
      setVisiteSite(`${moment().format("YYYY-MM-DD")}`);
      postData("visiteSite").then(r => {

      }).catch(r => {

      });
    }
  }, [])

  return (
    <div>
      {contextHolder}
      <div
        className=" w-screen  text-white"
        style={{ backgroundColor: bgPrimary }}
      >

        <div className="bg-blue-700 border-b border-gray-100 w-full h-[40px] px-[300px]  flex flex-row justify-between text-sm pt-3">
          <div className="flex gap-3">
            <div className="border-r-0 border-gray-100 pr-4 justify-center flex flex-row gap-2">
              <svg
                width="18px"
                height="18px"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="#fff"
              >
                <path
                  d="M18 2v5M22 2v5M18.118 14.702L14 15.5c-2.782-1.396-4.5-3-5.5-5.5l.77-4.13L7.815 2H4.064c-1.128 0-2.016.932-1.847 2.047.42 2.783 1.66 7.83 5.283 11.453 3.805 3.805 9.286 5.456 12.302 6.113 1.165.253 2.198-.655 2.198-1.848v-3.584l-3.882-1.479z"
                  stroke="#fff"
                  
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <div className="">{telephone}</div>
            </div>
            <div className="border-r-0 border-gray-100 pr-4">
              <div className="">{email}</div>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="border-r-0 border-gray-100 pr-4">
              <svg
                width="20px"
                height="20px"
                strokeWidth="1.3"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="#fff"
              >
                <path
                  d="M17 2h-3a5 5 0 00-5 5v3H6v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <div className="border-r-0 border-gray-100 pr-4">
              <svg
                width="20px"
                height="20px"
                strokeWidth="1.4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="#fff"
              >
                <path
                  d="M14 12l-3.5 2v-4l3.5 2z"
                  fill="#fff"
                  stroke="#fff"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M2 12.707v-1.415c0-2.895 0-4.343.905-5.274.906-.932 2.332-.972 5.183-1.053C9.438 4.927 10.818 4.9 12 4.9c1.181 0 2.561.027 3.912.065 2.851.081 4.277.121 5.182 1.053.906.931.906 2.38.906 5.274v1.415c0 2.896 0 4.343-.905 5.275-.906.931-2.331.972-5.183 1.052-1.35.039-2.73.066-3.912.066-1.181 0-2.561-.027-3.912-.066-2.851-.08-4.277-.12-5.183-1.052C2 17.05 2 15.602 2 12.708z"
                  stroke="#fff"
                  strokeWidth="1.4"
                ></path>
              </svg>
            </div>
            <div className="border-r-0 border-gray-100 pr-4">
              <svg
                width="20px"
                height="20px"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="#fff"
              >
                <path
                  d="M21 8v8a5 5 0 01-5 5H8a5 5 0 01-5-5V8a5 5 0 015-5h8a5 5 0 015 5zM7 17v-7"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M11 17v-3.25M11 10v3.75m0 0c0-3.75 6-3.75 6 0V17M7 7.01l.01-.011"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <div className="border-r-0 border-gray-100 pr-4">
              <svg
                width="20px"
                height="20px"
                strokeWidth="1.4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="#fff"
              >
                <path
                  d="M23 3.01s-2.018 1.192-3.14 1.53a4.48 4.48 0 00-7.86 3v1a10.66 10.66 0 01-9-4.53s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.278-.028-.556-.08-.83C21.94 5.674 23 3.01 23 3.01z"
                  stroke="#fff"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div>
          <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-blue-800">
            <NavbarContent>
              <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
              />
              <NavbarBrand className="h-full rounded-sm">
                <Link href="/home" className="pt-5"><Image src={logo4} width={230} height={90} alt='' /></Link>
                {/* <p className="font-bold text-inherit">ACME</p> */}
              </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4">
              <NavbarItem>
                <Link color="foreground" href="/about">
                  A Propos
                </Link>
              </NavbarItem>
              <NavbarItem isActive>
                <Link href="/secteurbtb" color="foreground">
                  Secteurs B2B
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color="foreground" href="/infoutile">
                  Infos utiles
                </Link>
              </NavbarItem>
              {/* <NavbarItem>
                <Link color="foreground" href="#">
                  Plan
                </Link>
              </NavbarItem> */}
              <NavbarItem>
                <Link color="foreground" href="/evenement">
                  Évènements
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color="foreground" href="/contact">
                  Contact
                </Link>
              </NavbarItem>
            </NavbarContent>
            {
              connected ==="true" ?
                <NavbarContent as="div" className="items-center" justify="end">
                  <NavbarItem className="hidden lg:flex">
                    <Badge content={msgNL} color="danger">
                      <Link href="/account/message">
                        <Button color="primary" size="sm" variant="flat" radius="full" className="text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                          </svg>
                        </Button>
                      </Link>
                    </Badge>
                  </NavbarItem>
                  <NavbarItem>

                    <Dropdown placement="bottom-end">
                      <DropdownTrigger>
                        <svg width="34px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#1c3b7d"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z" fill="#ffffff"></path> </g></svg>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                          <p className="font-semibold">{JSON.parse(profil)?.emailAdresse}</p>

                        </DropdownItem>
                        <DropdownItem key="settings">
                          <Link href="/account/dashboard">Tableau de Bord</Link>
                        </DropdownItem>
                        <DropdownItem key="team_settings">Mon Profil</DropdownItem>
                        {/* <DropdownItem key="analytics">Analytics</DropdownItem>
                      <DropdownItem key="system">System</DropdownItem>
                      <DropdownItem key="configurations">Configurations</DropdownItem> */}
                        <DropdownItem key="help_and_feedback">Aide & Feedback</DropdownItem>

                        <DropdownSection>
                          <DropdownItem key="logout" color="danger">
                            <Button variant="" color="light" onPress={() => {
                              ModalAnt.confirm({
                                title: "Deconnexion",
                                content: "Voulez-vous quitter ?",
                                okText: "Quitter",
                                cancelText: "Annuler",
                                onOk: () => {
                                  Cookies.remove("profil");
                                  Cookies.remove("connected");
                                  // setConnected("false");
                                  //setConnected("{}");
                                  // router.push("/home");
                                  let url = window.location.href;
                                  let root = new URL(url).origin;
                                  window.location.href = root;
                                }
                              })
                            }}>Deconnexion</Button>
                          </DropdownItem>
                        </DropdownSection>
                      </DropdownMenu>
                    </Dropdown>
                  </NavbarItem>
                </NavbarContent>
                :
                <NavbarContent justify="end">
                  <NavbarItem className="hidden lg:flex">
                    <Button onPress={onOpen} as={Link} color="primary" href="#" variant="flat" radius="full" className="text-white">
                      Connexion
                    </Button>
                  </NavbarItem>
                  <NavbarItem>

                    <Button as={Link} color="success" href="/inscription" variant="bordered" radius="full">
                      S'inscrire
                    </Button>

                  </NavbarItem>
                </NavbarContent>
            }
            <NavbarMenu>
              {menuItems.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                  <Link
                    color={
                      index === 2
                        ? "primary"
                        : index === menuItems.length - 1
                          ? "danger"
                          : "foreground"
                    }
                    className="w-full"
                    href="#"
                    size="lg"
                  >
                    {item}
                  </Link>
                </NavbarMenuItem>
              ))}
            </NavbarMenu>
          </Navbar>
        </div>
        <Sticky>
        
          <form onSubmit={handleSearch}>
            <div className="flex flex-row gap-2 bg-blue-800 px-[300px] py-5 items-center justify-center text-gray-400 border-blue-600 z-40 ">
              <Input name="terme" type="search" isRequired size="sm" label="Trouver par nom de l'entreprise" />
              <Select name="lieu" size={"sm"} label="Localisation" className="max-w-xs">
                <SelectItem key="*" value="*">Partout</SelectItem>
                {provinces?.sort((a, b) => { return a.province > b.province })?.map(s => { return (<SelectItem key={s.id} value={s.id}>{s.province}</SelectItem>) })}
              </Select>
              {/* <div className="bg-orange-500 w-[7px] h-[70px]">&nbsp;</div> */}
              <Select name="secteur" label="Secteur d'activité" size="sm">
                <SelectItem key="*" value="*">Tous</SelectItem>
                {secteurs?.sort((a, b) => { return a.secteur > b.secteur })?.map(s => { return (<SelectItem key={s.id} value={s.id}>{s.secteur}</SelectItem>) })}
              </Select>
              <Button type="submit" color="success" size={"lg"} radius="md" className="text-white">
                Trouver
                {/* <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                strokeWidth="1.4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="#fff"
              >
                <path
                  d="M17 17l4 4M3 11a8 8 0 1016 0 8 8 0 00-16 0z"
                  stroke="#fff"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg> */}
              </Button>
            </div>
          </form>
        </Sticky>
        {/* Modal Login */}
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <form onSubmit={handleLogin}>
                <>
                  <ModalHeader className="flex flex-col gap-1">Connexion</ModalHeader>
                  <ModalBody className="">

                    <div className="flex flex-col">
                      <Input

                        endContent={
                          <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        name="login"
                        type="email"
                        label="Votre Login"
                        labelPlacement="outside"

                      />
                      <div className="mt-2">&nbsp;</div>
                      <Input
                        endContent={
                          <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        name="password"
                        key={1}
                        type="password"
                        label="Votre Mot de passe"
                        labelPlacement={"outside"}
                      // description={"Rien"}
                      />
                    </div>
                    <div className="flex py-2 px-1 justify-between">
                      <Checkbox
                        classNames={{
                          label: "text-small",
                        }}
                      >
                        Se souvenir de moi
                      </Checkbox>
                      <Link color="primary" href="#" size="sm">
                        Mot de passe oublié?
                      </Link>
                    </div>
                    <div className="text-center items-center">{feedBack}</div>
                  </ModalBody>
                  <ModalFooter>
                    <Button type="button" color="danger" variant="light" onPress={(e) => { setIsLoading(false); onClose(e) }}>
                      Annuler
                    </Button>
                    <Button type="submit" isLoading={isLoading} color="primary">
                      Se connecter
                    </Button>
                  </ModalFooter>
                </>
              </form>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};
export default Header;
