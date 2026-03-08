import React from "react";
import {Linkedin, Github,Instagram, LucideGithub, InstagramIcon, LinkedinIcon, LucideLinkedin} from "lucide-react";


export default function Footer() {
  return (
    <div className="font-semibold">
    <footer className="bg-gradient-to-b from-[#0B132B] to-[#0F1C3F] text-gray-300 -mt-48 py-10">
      <div className="px-6 mx-auto max-w-7xl md:px-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">

          {/* Brand Section */}
          <div>
            <h2 classN  ame="text-2xl font-bold text-green-400">
              CodeZen
            </h2>

            <p className="max-w-sm mt-4 text-sm leading-relaxed text-gray-400">
              AI-powered debugging platform designed to help you master
              Data Structures & Algorithms step by step.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="px-2 mb-4 font-semibold text-white border-b border-green-400">
              Quick Links
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="transition duration-300 hover:text-green-400"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition duration-300 hover:text-green-400"
                >
                  Problems
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition duration-300 hover:text-green-400"
                >
                  Debugger
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition duration-300 hover:text-green-400"
                >
                  Profile
                </a>
              </li>
            </ul>
          </div>
        
          {/* Contact Section */}
          <div>
            <h4 className="mb-4 font-semibold text-white border-b border-green-400">
              Connect
            </h4>

            <p className="text-sm text-gray-400">
              support@codezen.ai
            </p>

            <div className="flex space-x-6 text-sm mt-14">
              <a
                href="#"
                className="transition duration-300 hover:text-green-400"
              > <LucideGithub />
                GitHub
              </a>

              <a
                href="#"
                className="transition duration-300 hover:text-blue-400"
              > <LucideLinkedin />
                LinkedIn
              </a>

              <a
                href="#"
                className="transition duration-300 hover:text-pink-500"
              ><InstagramIcon />
                Instagram
              </a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="pt-5 mt-8 text-sm text-center text-gray-500 border-t border-gray-800">
          © {new Date().getFullYear()} CodeZen. All rights reserved.
        </div>

      </div>
    </footer>
    </div>
  );
}
