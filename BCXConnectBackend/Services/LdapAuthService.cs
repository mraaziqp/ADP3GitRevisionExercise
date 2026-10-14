using System.DirectoryServices.Protocols;
using System.Net;

namespace BCXConnectBackend.Services;

public class LdapAuthService
{
    private readonly IConfiguration _configuration;

    public LdapAuthService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public bool ValidateCredentials(string username, string password)
    {
        var ldapUrl = _configuration["Ldap:Url"] ?? string.Empty;
        var domain = _configuration["Ldap:Domain"] ?? string.Empty;

        using var connection = new LdapConnection(ldapUrl)
        {
            AuthType = AuthType.Negotiate
        };

        try
        {
            connection.Bind(new NetworkCredential($"{domain}\\{username}", password));
            return true;
        }
        catch (LdapException)
        {
            return false;
        }
    }
}
