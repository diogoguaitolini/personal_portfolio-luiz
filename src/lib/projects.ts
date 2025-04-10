import projectsData from "@/data/projects.json"

export type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  category: string
  featured: boolean
  image: string
  technologies: string[]
  content: {
    overview: string
    background: string
    objectives: string[]
    implementation: string
    challenges?: string
    results: string
  }
}

export function getAllProjects(): Project[] {
  return projectsData as Project[]
}

export function getFeaturedProjects(): Project[] {
  return (projectsData as Project[]).filter((project) => project.featured)
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === "all") {
    return projectsData as Project[]
  }
  return (projectsData as Project[]).filter((project) => project.category.toLowerCase().includes(category.toLowerCase()))
}

export function getProjectById(id: string): Project | undefined {
  return (projectsData as Project[]).find((project) => project.id === id)
}
