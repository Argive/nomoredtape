# caution! this config file contains private API keys.
# ensure it remains in .gitignore regardless of file path
require_relative 'config'
require_relative 'Rule'

def proposed_rules_parser(file)

  # The numbers of lines a file should read after keywords
  # before throwing an error and prompting manual review.
  error_buffer = 4

  lines = File.open(file).to_a
  file_name = File.basename(file, ".txt")

  lines.each_with_index do |line, idx|
    if line.include?("PROPOSED AMENDMENT") || line.include?("PROPOSED RECISSION")
      begin
        jdx = idx
        key_line = lines[jdx]

        until key_line.include?(". ")
          jdx += 1
          key_line = key_line.gsub("\n", " ") + lines[jdx]
          raise "!-- MANUAL REVIEW REQUIRED --!" if jdx - idx >= error_buffer
        end

        action = line.include?("AMENDMENT") ? "Amend" : "Rescind"

        rule_citation, rule_description = key_line.match(/^.*(?<CODE>\d+\s+CSR\s+[-.\d]+)\s*(?<DESCRIPTION>.*?)(?=\. .+$)/).captures
        add_to_airtable(Rule.new(rule_citation, rule_description, action, "Proposed (Formal)", file_name))

      rescue => error
        puts error
        puts "An error has occured on line #{idx} in file #{file_name}."
        puts "Key line: #{key_line}"
        puts "Rule citation: #{rule_citation}"
        puts "Rule description: #{rule_description}"
        puts "Continuing ..."
        next
      end
    end
  end

  puts "Proposed rules uploaded to Airtable."
end

def add_to_airtable(rule)
  airtableRule = AllSoSData.new(
    "Rule Citation" => rule.rule_citation,
    "Rule Description" => rule.rule_description,
    "Proposed Action" => rule.proposed_action,
    "Stage" => rule.stage,
    "Source" => rule.source,
    "date_added" => Time.now
  )

  airtableRule.create
end

# proposed_rules_parser('../../data/15-jun-18_proposed-TEST.txt')
proposed_rules_parser('../../data/error-testing.txt')

# required manual edge case override on pg 1277
# 34(33?) rules recorded on 21-jun-18 test
