namespace Trabalho_3_Bruno.Entities
{
    public class User
    {
        public int Id { get; set; } = new Random().Next();
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;

    }
}
