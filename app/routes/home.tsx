import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

export function loader() {
  return null;
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Your resume checker online!" },
  ];
}

export default function Home() {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/auth?next=/')
    }
  }, [auth.isAuthenticated])

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />

    <section className="main-section">
      <div className="page-heading py-16">
        <h1 className="page-heading">Track your application & Resume Ratting</h1>
        <h2>Get your resume rated by AI and track your job applications in one place.</h2>
      </div>


      {
        resumes.length > 0 && (
          <div className="resumes-section">
            {
              resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              )

              )
            }
          </div>
        )
      }

    </section>

  </main>;
}
