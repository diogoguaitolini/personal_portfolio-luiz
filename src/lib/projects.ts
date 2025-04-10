import projectsData from "@/data/projects.json"

export type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  category: "engineering" | "digital"
  featured: boolean
  image: string
  technologies: string[]
  content: {
    overview: string
    background: string
    objectives: string[]
    implementation: string
    challenges: string
    results: string
  }
}

export function getAllProjects(): Project[] {
  return projectsData
}

export function getFeaturedProjects(): Project[] {
  return projectsData.filter((project) => project.featured)
}

export function getProjectsByCategory(category: "engineering" | "digital" | "all"): Project[] {
  if (category === "all") {
    return projectsData
  }
  return projectsData.filter((project) => project.category === category)
}

export function getProjectById(id: string): Project | undefined {
  return projectsData.find((project) => project.id === id)
}
