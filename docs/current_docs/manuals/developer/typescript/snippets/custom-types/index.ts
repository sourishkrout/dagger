import { dag, object, func, GitRepository, field } from "@dagger.io/dagger"

@object()
class Account {
  @field()
  username: string

  @field()
  email: string

  @field()
  url: string

  constructor(username: string, email: string) {
    this.username = username
    this.email = email
    this.url = `https://github.com/${username}`
  }
}

@object()
class Organization {
  @field()
  url: string

  @field()
  repository: GitRepository[]

  @field()
  members: Account[]
}

@object()
class Github {
  @func()
  daggerOrganization(): Organization {
    const organization = new Organization()

    organization.url = "https://github.com/dagger"
    organization.repository = [dag.git(`${organization.url}/dagger`)]
    organization.members = [
      new Account("jane", "jane@example.com"),
      new Account("john", "john@example.com"),
    ]

    return organization
  }
}
